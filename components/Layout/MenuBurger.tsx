"use client";
import { useState } from "react";

interface MenuBurgerProps {
  children: React.ReactNode;
}

export default function MenuBurger({ children }: MenuBurgerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
        aria-label="Menu"
      >
        <span
          className={`block w-6 h-0.5 bg-current transform transition-transform ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-current transition-opacity ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-current transform transition-transform ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 bg-[var(--second-bg)] rounded-lg shadow-lg py-2 z-10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
