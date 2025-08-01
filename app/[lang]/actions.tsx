"use server";

import { Inputs } from "./contacts/page";

export type Response = {
  success: boolean;
  error: string;
};

export async function sendToDiscordHook(formBody: Inputs): Promise<Response> {
  try {
    if (!formBody.name || !formBody.email || !formBody.text) {
      return {
        success: false,
        error: "NAME, EMAIL and MESSAGE are required fields!",
      };
    }

    const response = await fetch(`${process.env.DISCORD_HOOK}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `Name: ${formBody.name}\nEmail: ${formBody.email}\nMessage: ${formBody.text}`,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `API call failed with status: ${response.status}`,
      };
    }
    return { success: true, error: "" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
