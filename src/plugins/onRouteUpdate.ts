import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import type { ClientModule } from '@docusaurus/types';
import { ROUTE_UPDATED_EVENT } from '../config/routeUpdate';

export type RouteUpdateEvent = CustomEvent<string>;

const module: ClientModule = {
  onRouteUpdate({ location }) {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    const routeUpdatedEvent = new CustomEvent(ROUTE_UPDATED_EVENT, {
      detail: location.pathname,
    });

    document.dispatchEvent(routeUpdatedEvent);
  },
};

export default module;
