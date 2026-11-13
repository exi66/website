import { ContactForm } from "./types";

export const CONTACT_MAX_LENGTH = {
  email: 320,
  name: 100,
  text: 500,
} as const;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Shared by the form and the server action, the server must not trust the client
export function isValidContactForm(data: unknown): data is ContactForm {
  if (typeof data !== "object" || data === null) return false;
  const { email, name, text } = data as Record<string, unknown>;
  if (
    typeof email !== "string" ||
    typeof name !== "string" ||
    typeof text !== "string"
  ) {
    return false;
  }
  return (
    EMAIL_PATTERN.test(email) &&
    email.length <= CONTACT_MAX_LENGTH.email &&
    name.trim().length > 0 &&
    name.length <= CONTACT_MAX_LENGTH.name &&
    text.trim().length > 0 &&
    text.length <= CONTACT_MAX_LENGTH.text
  );
}
