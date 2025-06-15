import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import type { QueryClient } from "@tanstack/react-query";
import NotFound from "@/components/web/not-found.tsx";
import ErrorPage from "@/components/web/error.tsx";
import { authUserQueryOptions } from "@/hooks/use-auth-hooks.ts";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      await queryClient.prefetchQuery(authUserQueryOptions);
      const user = queryClient.getQueryData(["authUser"]);
      return { user };
    } catch (error) {
      console.log(error);
      throw redirect({ to: "/login" });
    }
  },
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
