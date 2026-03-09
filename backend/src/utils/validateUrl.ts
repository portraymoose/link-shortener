export const validateUrl = (urlString: string): string | null => {
  try {
    const url = new URL(urlString);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
};
