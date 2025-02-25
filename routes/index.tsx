import { Head } from "$fresh/runtime.ts";
import Closet from "../components/Closet.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kitchen Inventory</title>
      </Head>
      <div class="min-h-screen bg-gray-100 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray-900">Kitchen Inventory</h1>
            <p class="mt-2 text-lg text-gray-600">
              Manage your kitchen items across different shelves
            </p>
          </div>
          <Closet />
        </div>
      </div>
    </>
  );
}
