/**
 * Browser compatibility polyfills
 * This file provides fallbacks for modern browser APIs that may not be
 * available in all browsers or browser versions.
 */

/**
 * Polyfill for navigator.clipboard
 * Falls back to document.execCommand for older browsers
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy with Clipboard API:', err);
    }
  }

  // Fallback for browsers without clipboard API
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback: Failed to copy text: ', err);
    return false;
  }
};

/**
 * Safe window check to prevent SSR issues
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Browser detection helper
 */
export const getBrowser = (): { name: string; version: string } => {
  if (!isBrowser) return { name: 'ssr', version: '0' };
  
  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = '0';
  
  // Chrome
  if (ua.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
    const match = ua.match(/Chrome\/(\d+)/);
    if (match && match[1]) browserVersion = match[1];
  } 
  // Firefox
  else if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    const match = ua.match(/Firefox\/(\d+)/);
    if (match && match[1]) browserVersion = match[1];
  }
  // Safari
  else if (ua.indexOf('Safari') > -1) {
    browserName = 'Safari';
    const match = ua.match(/Version\/(\d+)/);
    if (match && match[1]) browserVersion = match[1];
  }
  // Edge
  else if (ua.indexOf('Edg') > -1) {
    browserName = 'Edge';
    const match = ua.match(/Edg\/(\d+)/);
    if (match && match[1]) browserVersion = match[1];
  }
  
  return { name: browserName, version: browserVersion };
};

/**
 * Check if current browser is supported
 */
export const isBrowserSupported = (): boolean => {
  const { name, version } = getBrowser();
  
  // Define minimum supported versions
  const minVersions: Record<string, number> = {
    Chrome: 60,
    Firefox: 60,
    Safari: 12,
    Edge: 79,
  };
  
  if (name in minVersions) {
    return parseInt(version) >= minVersions[name];
  }
  
  return false;
};

/**
 * Load polyfills dynamically based on current browser
 */
export const loadPolyfills = async (): Promise<void> => {
  if (!isBrowser) return;
  
  const polyfillsNeeded = [];
  
  // Check for IntersectionObserver support
  if (!('IntersectionObserver' in window)) {
    polyfillsNeeded.push(
      import('intersection-observer').then(() => {
        console.log('IntersectionObserver polyfill loaded');
      })
    );
  }
  
  // Check for smoothscroll support
  if (!('scrollBehavior' in document.documentElement.style)) {
    polyfillsNeeded.push(
      import('smoothscroll-polyfill').then((module) => {
        module.default.polyfill();
        console.log('Smooth Scroll polyfill loaded');
      })
    );
  }
  
  // Check for fetch support
  if (!('fetch' in window)) {
    polyfillsNeeded.push(
      import('whatwg-fetch').then(() => {
        console.log('Fetch polyfill loaded');
      })
    );
  }
  
  // Add more polyfill checks as needed
  
  // Wait for all polyfills to load
  try {
    await Promise.all(polyfillsNeeded);
    console.log('All necessary polyfills loaded successfully');
  } catch (error) {
    console.error('Error loading polyfills:', error);
  }
}; 