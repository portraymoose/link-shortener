import axios from "axios";

export async function getRegionByIP(ip: string): Promise<string> {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    if (response.data?.country_name) {
      return response.data.country_name;
    }
    return "Unknown";
  } catch (error) {
    console.warn("Region lookup failed:", error);
    return "Unknown";
  }
}
