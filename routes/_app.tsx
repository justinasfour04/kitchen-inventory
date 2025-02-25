import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kitchen Inventory</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Track and manage your kitchen inventory"
        />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <script src="/sw-register.js" defer />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
