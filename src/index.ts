import { getSelectedText, open, showHUD } from "@raycast/api";
import isUrl from "is-url-superb";

export default async function main() {
  try {
    const selectedText = await getSelectedText();
    if (isUrl(selectedText)) {
      await open(selectedText);
    } else {
      throw new Error("The selected text is not a valid URL.");
    }
  } catch (error) {
    await showHUD(String(error));
  }
}
