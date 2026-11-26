'use server';

import { headers } from 'next/headers';
import { isValidContactForm } from '@/lib/contact';
import { ActionResult } from '@/lib/types';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const DISCORD_TIMEOUT_MS = 10 * 1000;

// In-memory, so it resets on restart and is per process; enough for a single instance
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, times] of submissions) {
    if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
      submissions.delete(key);
    }
  }
  const recent = (submissions.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) return true;
  submissions.set(ip, [...recent, now]);
  return false;
}

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  return headerList.get('x-forwarded-for')?.split(',')[0].trim() || headerList.get('x-real-ip') || 'unknown';
}

export async function sendToDiscordHook(formBody: unknown): Promise<ActionResult> {
  if (!isValidContactForm(formBody)) {
    return { success: false, error: 'validation' };
  }
  // Pretend success so bots don't learn about the honeypot
  if (formBody.website) return { success: true };

  if (isRateLimited(await getClientIp())) {
    return { success: false, error: 'rate_limit' };
  }

  const hookUrl = process.env.DISCORD_HOOK;
  if (!hookUrl) {
    console.error('DISCORD_HOOK environment variable is not set');
    return { success: false, error: 'server' };
  }

  try {
    const response = await fetch(hookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `Name: ${formBody.name}\nEmail: ${formBody.email}\nMessage: ${formBody.text}`,
        // Prevent @everyone, @here, user and role pings from the message text
        allowed_mentions: { parse: [] },
      }),
      signal: AbortSignal.timeout(DISCORD_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`Discord webhook failed with status: ${response.status}`);
      return { success: false, error: 'server' };
    }
    return { success: true };
  } catch (error) {
    console.error('Discord webhook request failed', error);
    return { success: false, error: 'server' };
  }
}
