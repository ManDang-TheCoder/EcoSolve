"use client";

import { useEffect, useState } from "react";
import { getBrowser, isBrowserSupported } from "@/lib/polyfills";

export function BrowserInfo() {
  const [browserInfo, setBrowserInfo] = useState<{name: string; version: string} | null>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // Get browser info on client-side only
    const browser = getBrowser();
    setBrowserInfo(browser);
    setIsSupported(isBrowserSupported());
  }, []);

  if (!browserInfo) return null;

  return (
    <div className="fixed bottom-2 right-2 text-xs bg-background/80 backdrop-blur-sm p-2 rounded shadow-sm border border-muted z-10">
      <p>
        Browser: {browserInfo.name} {browserInfo.version}
        {isSupported !== null && (
          <span className={isSupported ? "text-green-500" : "text-amber-500"}>
            {" "}{isSupported ? "✓" : "⚠️"}
          </span>
        )}
      </p>
    </div>
  );
} 