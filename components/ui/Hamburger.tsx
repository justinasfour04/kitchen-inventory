import { JSX } from "preact";

interface HamburgerProps {
  /** Whether the hamburger menu is open */
  isOpen: boolean;
  /** Callback function when the hamburger is clicked */
  onClick: () => void;
  /** Optional className for additional styling */
  className?: string;
  /** Optional color for the hamburger lines */
  color?: string;
  /** Optional size for the hamburger (default: 24) */
  size?: `${number}rem`;
}

export function Hamburger({
  isOpen,
  onClick,
  className = "",
  color = "currentColor",
  size = "2rem",
}: HamburgerProps): JSX.Element {
  return (
    <button
      type="button"
      className={`relative focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${className}`}
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <div
        className="relative flex items-center"
        style={{ width: size, height: size }}
      >
        <span
          className={`absolute block h-0.5 w-full ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
          }`}
          style={{ backgroundColor: color }}
        />
        <span
          className={`absolute block h-0.5 w-full translate-y-0 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundColor: color }}
        />
        <span
          className={`absolute block h-0.5 w-full ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
          }`}
          style={{ backgroundColor: color }}
        />
      </div>
    </button>
  );
}
