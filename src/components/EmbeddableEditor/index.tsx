import { useIsDarkMode } from '@site/src/hooks/useIsDarkMode';
import sdk, { EmbedOptions, VM } from '@stackblitz/sdk';
import React, { FC, useEffect, useRef, useState } from 'react';

interface Props extends Pick<EmbedOptions, 'openFile' | 'view' | 'height'> {
  repoSlug: string;
}

/**
 * An embeddable editor to use for embedding interactive code samples.
 */
const EmbeddableEditor: FC<Props> = ({
  children: _,
  repoSlug,
  ...props
}): JSX.Element => {
  const editorElement = useRef<HTMLDivElement>();
  const [vm, setVM] = useState<VM>();
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? 'dark' : 'light';

  // Initialize the editor when the required div element is rendered
  useEffect(() => {
    editorElement.current &&
      sdk
        .embedGithubProject(editorElement.current, repoSlug, {
          hideNavigation: true,
          hideExplorer: true,
          hideDevTools: true,
          showSidebar: false,
          theme,
          ...props,
        })
        .then(setVM);
  }, [editorElement]);

  // Change theme of editor when theme of website changes
  useEffect(() => {
    vm && vm.editor && vm.editor.setTheme(theme);
  }, [isDarkMode, vm]);

  return <div ref={editorElement} />;
};

export default EmbeddableEditor;
