const UAParser = require("ua-parser-js");

export function parseUserAgent(userAgent?: string) {
  const parser = new UAParser(userAgent);
  const ua = parser.getResult();
  return {
    browser: ua.browser.name || "Unknown",
    browser_version: ua.browser.version || "Unknown",
    os: ua.os.name || "Unknown",
  };
}
