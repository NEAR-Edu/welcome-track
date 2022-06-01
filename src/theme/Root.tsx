// https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root

import useIsBrowser from '@docusaurus/useIsBrowser'; // https://docusaurus.io/docs/advanced/ssg#useisbrowser
import Gleap from 'gleap'; // See https://gleap.io/docs/javascript/ and https://app.gleap.io/projects/62697858a4f6850036ae2e6a/widget
import React from 'react';

const GLEAP_API_KEY = process.env.GLEAP_API_KEY;
const WEGLOT_API_KEY = process.env.WEGLOT_API_KEY;

type WindowWithGleap = Window &
  typeof globalThis & {
    Weglot: { initialize({ api_key: string }): void };
  };

// Default implementation, that you can customize
export default function Root({ children }) {
  const isBrowser = useIsBrowser();
  if (isBrowser) {
    Gleap.initialize(GLEAP_API_KEY);
    (window as WindowWithGleap).Weglot.initialize({
      api_key: WEGLOT_API_KEY,
    });
  }
  return <>{children}</>;
}
