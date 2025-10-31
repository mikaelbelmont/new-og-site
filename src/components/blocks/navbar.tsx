"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const menuItems = [
  { label: "Funcionalidades", href: "/#resource-allocation" },
  { label: "FineAI", href: "/#fine-ai" },
  { label: "ChatBI", href: "/#chat-bi" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contactos", href: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Turn translucent as soon as the user starts scrolling
      setIsScrolled(scrollPosition > 0);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`fixed top-0 left-0 right-0 z-50 py-4 navbar-transition ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden lg:grid lg:grid-cols-3 lg:items-center">
          {/* Logo on the left */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-display"
            style={{ fontWeight: 800 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Verixian
            </span>
          </Link>

          {/* Navigation items in the middle */}
          <div className="flex justify-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium text-muted-foreground transition-opacity hover:opacity-75 hover:text-foreground whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button on the right */}
          <div className="flex justify-end">
            <Button
              asChild
              style={{
                background: 'linear-gradient(to right, #1447E6, #4A7FDE, rgba(111, 149, 189, 0.85))',
              }}
            >
              <Link href="/#agendar">
                Agendar demonstração
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-display"
              style={{ fontWeight: 800 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Verixian
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-xl font-display"
                      style={{ fontWeight: 800 }}
                    >
                      <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        Verixian
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-md font-semibold"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button
                    asChild
                    className="mt-4"
                    style={{
                      background: 'linear-gradient(to right, #1447E6, #4A7FDE, rgba(111, 149, 189, 0.85))',
                    }}
                  >
                    <Link href="/#agendar">
                      Agendar demonstração
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};
