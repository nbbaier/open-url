import { getSelectedText, open, showHUD } from "@raycast/api";
import isUrl from "is-url-superb";

const extractMarkdownLinks = (text: string) => {
  const regex = /\[.*?\]\((.*?)\)/;
  const linkMatch = text.match(regex);
  return linkMatch ? linkMatch[1] : text;
};

function extractValidUrls(text: string) {
  const words = text
    .split(" ")
    .map((word) => word.split("\n"))
    .flat();

  console.log(words);

  return words.map((word) => extractMarkdownLinks(word)).filter((word) => isUrl(word));
}

export default async function main() {
  try {
    const selectedText = await getSelectedText();
    // const lines = selectedText.split("\n");

    const urls = extractValidUrls(selectedText);
    console.log(urls);
    if (urls.length > 0) {
      for (const url of urls) {
        await open(url.trim());
      }
    } else {
      await showHUD("No valid URLs found in the selected text");
    }
  } catch (error) {
    await showHUD(String(error));
  }
}
