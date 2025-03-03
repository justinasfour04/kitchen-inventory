import { Handlers } from "$fresh/server.ts";
import Closet, { handler as closetHandler } from "@/components/Closet.tsx";
import { ShelfWithItems } from "@/controllers/shelves.controller.ts";
import Layout from "@/components/Layout.tsx";

// Re-export the handler from the Closet component
export const handler: Handlers<ShelfWithItems[]> = closetHandler;

// The route component renders the Closet component within our Layout
export default function ClosetRoute(props: { data: ShelfWithItems[] }) {
  return (
    <Layout title="Kitchen Inventory - Closet">
      <Closet data={props.data} />
    </Layout>
  );
}
