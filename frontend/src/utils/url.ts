export const extractCodeFromShortLink = (shortLink: string): string => {
  try {
    const url = new URL(shortLink);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    return pathSegments[pathSegments.length - 1] || "";
  } catch {
    const parts = shortLink.split("/");
    return parts[parts.length - 1] || "";
  }
};
