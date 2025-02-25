import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

export default function Layout(
  { children, title = "Kitchen Inventory" }: LayoutProps,
) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div class="min-h-screen bg-gray-100 flex flex-col">
        {/* Navigation */}
        <nav class="bg-white shadow-md">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex">
                <div class="flex-shrink-0 flex items-center">
                  <span class="text-xl font-bold text-blue-600">
                    Kitchen Inventory
                  </span>
                </div>
                <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a
                    href="/"
                    class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Home
                  </a>
                  <a
                    href="/closet"
                    class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Closet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main class="flex-grow py-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer class="bg-white shadow-inner py-4">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Kitchen Inventory App
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
