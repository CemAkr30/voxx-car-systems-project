import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout_authenticated/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout_authenticated/"!</div>
}
