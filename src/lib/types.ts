export type ContactForm = {
  email: string;
  name: string;
  text: string;
  // honeypot: hidden from users, filled only by bots
  website?: string;
};

export type ContactErrorCode = 'validation' | 'rate_limit' | 'server';

export type ActionResult = { success: true } | { success: false; error: ContactErrorCode };
