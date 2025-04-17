// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_categories from "./routes/api/categories.ts";
import * as $api_inventory from "./routes/api/inventory.ts";
import * as $closet from "./routes/closet.tsx";
import * as $index from "./routes/index.tsx";
import * as $inventory from "./routes/inventory.tsx";
import * as $BarcodeScanner from "./islands/BarcodeScanner.tsx";
import * as $CategoryForm from "./islands/CategoryForm.tsx";
import * as $ClosetShelf from "./islands/ClosetShelf.tsx";
import * as $DeleteCategoryButton from "./islands/DeleteCategoryButton.tsx";
import * as $HamburgerMenu from "./islands/HamburgerMenu.tsx";
import * as $Inventory from "./islands/Inventory.tsx";
import * as $InventoryModal from "./islands/InventoryModal.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/categories.ts": $api_categories,
    "./routes/api/inventory.ts": $api_inventory,
    "./routes/closet.tsx": $closet,
    "./routes/index.tsx": $index,
    "./routes/inventory.tsx": $inventory,
  },
  islands: {
    "./islands/BarcodeScanner.tsx": $BarcodeScanner,
    "./islands/CategoryForm.tsx": $CategoryForm,
    "./islands/ClosetShelf.tsx": $ClosetShelf,
    "./islands/DeleteCategoryButton.tsx": $DeleteCategoryButton,
    "./islands/HamburgerMenu.tsx": $HamburgerMenu,
    "./islands/Inventory.tsx": $Inventory,
    "./islands/InventoryModal.tsx": $InventoryModal,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
