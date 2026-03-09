import { ClickRepository } from "../repositories/click.repository";
import { Click } from "../types";

interface SaveClickParams {
  link_id: string;
  ip: string;
  region: string;
  browser: string;
  browser_version: string;
  os: string;
}

export async function saveClick(data: SaveClickParams): Promise<void> {
  await ClickRepository.create(data);
}

export async function getClicksForLink(linkId: string): Promise<Click[]> {
  return ClickRepository.findByLinkId(linkId);
}
