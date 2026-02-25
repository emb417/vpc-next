"use client";

import { useState, useCallback } from "react";
import { Tooltip } from "antd";
import { MdContentCopy, MdCheck } from "react-icons/md";

export default function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    },
    [text],
  );

  return (
    <Tooltip
      title={copied ? "Copied!" : `Copy ${label}`}
      color="rgba(41, 37, 36, 0.9)"
    >
      <button
        onClick={handleCopy}
        className={`
          inline-flex items-center justify-center shrink-0
          p-0.5 rounded border transition-all duration-150
          ${
            copied
              ? "border-green-600 text-green-400 bg-green-950/40"
              : "border-stone-600 text-stone-400 hover:border-orange-700 hover:text-orange-400"
          }
        `}
      >
        {copied ? (
          <MdCheck className="text-xs" />
        ) : (
          <MdContentCopy className="text-xs" />
        )}
      </button>
    </Tooltip>
  );
}
