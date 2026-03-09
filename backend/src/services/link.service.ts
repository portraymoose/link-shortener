import { LinkRepository } from "../repositories/link.repository";
import { generateCode } from "../utils/generateCode";

const DEFAULT_LENGTH = 6;
const MAX_RETRIES = 5;
const FALLBACK_LENGTH = 8;

async function generateUniqueShortCode(): Promise<string> {
  let length = DEFAULT_LENGTH;
  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    const code = generateCode(length);
    const existing = await LinkRepository.findByCode(code);
    if (!existing) {
      return code;
    }
    attempts++;
  }
  const fallbackCode = generateCode(FALLBACK_LENGTH);
  const existingFallback = await LinkRepository.findByCode(fallbackCode);
  if (!existingFallback) {
    return fallbackCode;
  }
  throw new Error(
    "Unable to generate unique short code after multiple attempts.",
  );
}

export async function createShortLink(originalUrl: string): Promise<string> {
  const existing = await LinkRepository.findByOriginalUrl(originalUrl);
  if (existing) {
    return existing.short_code;
  }
  const shortCode = await generateUniqueShortCode();
  const newLink = await LinkRepository.create(originalUrl, shortCode);
  return newLink.short_code;
}

export async function getLinkByCode(code: string) {
  return LinkRepository.findByCode(code);
}
