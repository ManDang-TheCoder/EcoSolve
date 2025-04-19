"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MapPin, Award, Users, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const mainNavItems = [
  { label: "Map", href: "/map", icon: MapPin },
  { label: "Experts", href: "/experts", icon: Award },
  { label: "Community", href: "/community", icon: Users },
  { label: "Events", href: "/events", icon: CalendarDays },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center">
            <div className="relative">
              <Image
                src="/images/watercolor-eco-logo.png"
                alt="Local Eco Solve"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>
            <span className="ml-3 font-semibold text-xl hidden sm:inline-block text-green-700">
              Local Eco Solve
            </span>
          </Link>

          <nav className="hidden md:flex gap-6">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-foreground/60"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link href="/report-issue">
              <Button size="sm">Report Issue</Button>
            </Link>
          </div>

          <button
            className="flex items-center justify-center rounded-md p-2.5 text-muted-foreground md:hidden"
            onClick={toggleMenu}
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
            <nav className="fixed inset-x-0 top-16 z-50 mt-px h-[calc(100vh-4rem)] overflow-y-auto bg-background px-6 pb-36 pt-8 shadow-lg animate-in slide-in-from-bottom-80">
              <div className="space-y-4">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex w-full items-center rounded-md p-3 text-sm font-medium hover:bg-accent ${
                        isActive(item.href) ? "bg-accent" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}

                <div className="mt-6 space-y-3">
                  <Link href="/auth/signin" className="block">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/report-issue" className="block">
                    <Button className="w-full">Report Issue</Button>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 