// https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root

import React from 'react';
import Gleap from "gleap"; // See https://gleap.io/docs/javascript/ and https://app.gleap.io/projects/62697858a4f6850036ae2e6a/widget

const GLEAP_API_KEY = 'ulOj3NHARNK1BoiS8fnxtg6qqBAVb7hA';

// Default implementation, that you can customize
export default function Root({ children }) {
    Gleap.initialize(GLEAP_API_KEY);
    return <>{children}</>;
}