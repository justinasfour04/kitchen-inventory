#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
import autoprefixer from "autoprefixer";

import "@std/dotenv/load";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const css = Deno.readTextFileSync("./static/app.css");
const out = await postcss([tailwindcss, autoprefixer]).process(css, {
  from: "./static/app.css",
});
Deno.writeTextFileSync("./static/styles.css", out.css);

await dev(import.meta.url, "./main.ts", config);
