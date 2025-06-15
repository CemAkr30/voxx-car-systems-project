import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import type { QueryClient } from "@tanstack/react-query";
import NotFound from "@/components/web/not-found.tsx";
import ErrorPage from "@/components/web/error.tsx";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context: {} }) => {},
  component: RouteComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />

      <TanStackQueryLayout />
    </>
  );
}
