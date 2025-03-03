import Layout from "../components/Layout.tsx";

export default function Home() {
  return (
    <Layout title="Kitchen Inventory - Home">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900">Kitchen Inventory</h1>
        <p class="mt-2 text-lg text-gray-600">
          Manage your kitchen items across different shelves
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div class="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold mb-3">Closet Management</h2>
          <p class="text-gray-600 mb-4">
            Organize your kitchen items by shelves in your closet
          </p>
          <a
            href="/closet"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Closet
          </a>
        </div>
        <div class="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 class="text-xl font-semibold mb-3">Inventory Overview</h2>
          <p class="text-gray-600 mb-4">
            View and manage all your kitchen inventory items
          </p>
          <a
            href="/inventory"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            View Inventory
          </a>
        </div>
      </div>
    </Layout>
  );
}
