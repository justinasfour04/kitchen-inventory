import { JSX } from "preact";
import { useState } from "preact/hooks";
import { Hamburger } from "@/components/ui/Hamburger.tsx";
import { Title } from "@/components/ui/Title.tsx";

export interface NavItem {
  /** The text to display for the navigation item */
  label: string;
  /** The URL to navigate to */
  href: string;
  /** Optional icon component to display before the label */
  icon?: JSX.Element;
  /** Optional callback function when the item is clicked */
  onClick?: () => void;
}

interface HamburgerMenuProps {
  /** Array of navigation items to display in the menu */
  items: NavItem[];
  /** Optional className for the container */
  className?: string;
  /** Optional color for the hamburger icon */
  color?: string;
  /** Optional size for the hamburger icon */
  size?: `${number}rem`;
}

export function HamburgerMenu({
  items,
  className = "",
  color,
  size,
}: HamburgerMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Hamburger
        isOpen={false}
        onClick={() => setIsOpen(true)}
        color={color}
        size={size}
      />

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex h-16 items-center justify-between p-2 border-b">
            <Title title="" />
            <Hamburger
              isOpen
              onClick={() => setIsOpen(false)}
              color={color}
              size={size}
            />
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-1">
              {items.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-150 ${
                      item.icon ? "gap-2" : ""
                    }`}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                      setIsOpen(false);
                    }}
                  >
                    {item.icon && (
                      <span className="flex-shrink-0">{item.icon}</span>
                    )}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
