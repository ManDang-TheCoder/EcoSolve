/**
 * Comprehensive polyfills for modern browser compatibility
 * Focuses on Chrome compatibility but also supports other browsers
 */
(function() {
  // Skip execution if not in browser
  if (typeof window === 'undefined') return;
  
  // Feature detection and polyfill loading
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  // Array of polyfills to conditionally load
  const polyfills = [];
  
  // IntersectionObserver polyfill
  if (!('IntersectionObserver' in window)) {
    polyfills.push(import('intersection-observer'));
  }
  
  // Fetch API polyfill
  if (!window.fetch) {
    polyfills.push(import('whatwg-fetch'));
  }
  
  // Smooth Scroll polyfill
  if (typeof window !== 'undefined' && !('scrollBehavior' in document.documentElement.style)) {
    polyfills.push(import('smoothscroll-polyfill').then(module => {
      if (module && module.polyfill) module.polyfill();
    }));
  }
  
  // Clipboard API polyfill
  if (!navigator.clipboard) {
    navigator.clipboard = {
      writeText: function(text) {
        return new Promise(function(resolve, reject) {
          try {
            var textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            var successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            successful ? resolve() : reject(new Error('Copy failed'));
          } catch (err) {
            reject(err);
          }
        });
      },
      readText: function() {
        return Promise.reject(new Error('Clipboard reading not supported'));
      }
    };
  }

  // ResizeObserver polyfill
  if (!('ResizeObserver' in window)) {
    window.ResizeObserver = function(callback) {
      this.observe = function() {};
      this.unobserve = function() {};
      this.disconnect = function() {};
    };
  }

  // Promise.allSettled polyfill
  if (!Promise.allSettled) {
    Promise.allSettled = function(promises) {
      return Promise.all(
        promises.map(p => 
          Promise.resolve(p)
            .then(value => ({ status: 'fulfilled', value }))
            .catch(reason => ({ status: 'rejected', reason }))
        )
      );
    };
  }

  // Load all necessary polyfills in parallel
  Promise.all(polyfills)
    .then(() => console.log('All polyfills loaded successfully'))
    .catch(error => console.warn('Error loading polyfills:', error));
})(); 