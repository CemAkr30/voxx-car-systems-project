import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  return (
    <React.Fragment>
      <div>Hello "/_layout_authenticated/dashboard"!</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </React.Fragment>
  );
}
