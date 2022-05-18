import { useEffect, useState } from 'react';

/**
 * Get the current dark mode state
 */
export function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Create a mutation observer to set the dark mode state when the 'data-theme' attribute
  // changes
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-theme'
      ) {
        setIsDarkMode(
          (mutation.target as Element).getAttribute('data-theme') === 'dark',
        );
      }
    }
  });

  // Start observing the 'data-theme' attribute on the root html element
  // Stop the observer when the component using the hook unmounts
  useEffect(() => {
    observer.observe(document.querySelector('html'), { attributes: true });

    return () => {
      observer.disconnect();
    };
  });

  return isDarkMode;
}
