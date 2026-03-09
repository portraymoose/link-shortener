import { useState, useEffect, useRef } from "react";

interface CopyButtonProps {
  text: string;
  type: "short" | "stats";
}

export function CopyButton({ text, type }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        timerRef.current = window.setTimeout(() => setCopied(false), 1500);
      },
      () => alert("Failed to copy"),
    );
  };
  return (
    <button
      className="copy-btn"
      onClick={handleCopy}
      title={`Copy ${type === "short" ? "short URL" : "stats URL"}`}
    >
      {copied ? "✓" : "Copy"}
    </button>
  );
}
