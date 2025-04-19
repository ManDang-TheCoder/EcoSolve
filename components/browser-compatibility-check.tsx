"use client";

import { useEffect, useState } from "react";
import { isBrowser, isBrowserSupported, getBrowser } from "@/lib/polyfills";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function BrowserCompatibilityCheck() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (isBrowser && !isBrowserSupported()) {
      setShowWarning(true);
    }
  }, []);

  if (!showWarning) return null;

  const { name, version } = getBrowser();

  return (
    <Alert variant="destructive" className="fixed top-4 right-4 z-50 max-w-md shadow-lg">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Browser Compatibility Warning</AlertTitle>
      <AlertDescription>
        You're using {name} version {version} which may not be fully supported.
        For the best experience, please use the latest version of Google Chrome, Firefox, or Edge.
      </AlertDescription>
    </Alert>
  );
} 