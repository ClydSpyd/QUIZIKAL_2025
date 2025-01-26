import { useState } from "react";

export default function useClipboard({ timeout = 2000 }: { timeout?: number } = {}): {
  copied: boolean;
  handleCopy: (value: string) => void;
} {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, timeout);
      console.log("Text copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return {
    copied,
    handleCopy,
  };
}
