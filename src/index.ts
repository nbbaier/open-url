import { getSelectedText, open, showHUD } from "@raycast/api";
import isUrl from "is-url-superb";

function extractValidUrls(text: string) {
  const words = text
    .split(" ")
    .map((word) => word.split("\n"))
    .flat();

  return words.filter((word) => isUrl(word));
}

export default async function main() {
  try {
    const selectedText = await getSelectedText();
    const urls = extractValidUrls(selectedText);
    console.log("urls:", urls.length);
    console.log(urls);
    if (urls.length > 0) {
      for (const url of urls) {
        console.log(`opening url: ${url}`);

        await open(url, "company.thebrowser.Browser");
      }
    } else {
      await showHUD("No valid URLs found in the selected text");
    }
  } catch (error) {
    await showHUD(String(error));
  }
}
