import React from 'react';
import MultiColumn from '@theme-original/Footer/Links/MultiColumn';
import { ROUTE_UPDATED_EVENT } from '@site/src/config/routeUpdate';
import { Column, FOOTER_LINKS } from '@site/src/config/footerLinks';
import type { RouteUpdateEvent } from '@site/src/plugins/onRouteUpdate';

interface FooterProps {
  columns: Column[];
}

function updateLinks(pathname: string): FooterProps {
  const [persona] = pathname.split('/').filter(Boolean);

  if (!persona) {
    return { columns: FOOTER_LINKS['developers'] };
  }

  return { columns: FOOTER_LINKS[persona] };
}

export default function MultiColumnWrapper(props: FooterProps) {
  const [newProps, setNewProps] = React.useState<FooterProps>(props);

  React.useEffect(() => {
    setNewProps(updateLinks(window.location.pathname));

    function handleRouteUpdate({ detail }: RouteUpdateEvent) {
      setNewProps(updateLinks(detail));
    }

    document.addEventListener(ROUTE_UPDATED_EVENT, handleRouteUpdate);

    return () => {
      document.removeEventListener(ROUTE_UPDATED_EVENT, handleRouteUpdate);
    };
  }, []);

  return <MultiColumn {...newProps} />;
}
