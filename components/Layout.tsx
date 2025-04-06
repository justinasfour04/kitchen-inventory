import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";
import { HamburgerMenu } from "../islands/HamburgerMenu.tsx";
import { Title } from "@/components/ui/Title.tsx";
interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Inventory",
    href: "/inventory",
  },
  {
    label: "Closet",
    href: "/closet",
  },
];
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
            <div class="w-full h-16">
              <div class="w-full h-full flex items-center justify-between">
                <a href="/">
                  <Title
                    title="Kitchen Inventory"
                    className="h-full flex items-center"
                  />
                </a>
                <HamburgerMenu
                  items={navItems}
                  color="#000000"
                  className="h-full flex items-center"
                />
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
