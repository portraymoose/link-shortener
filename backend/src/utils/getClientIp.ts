import { Request } from "express";

export function getClientIp(req: Request<any>): string {
  let ip = "Unknown";
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    ip = forwarded.split(",")[0].trim();
  } else if (Array.isArray(forwarded)) {
    ip = forwarded[0];
  } else if (req.socket.remoteAddress) {
    ip = req.socket.remoteAddress;
  }
  if (ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }
  return ip;
}
