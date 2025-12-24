"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

const NavigationLink = ({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) => (
  <Link
    href={href}
    className={`
      relative px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out
      ${isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}
      hover:bg-gray-100 rounded-md
      active:bg-gray-200
    `}
  >
    {children}
    {isActive && (
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-blue-600 rounded-full" />
    )}
  </Link>
);

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <Container>
        <div className="flex flex-row justify-between items-center max-w-screen-lg w-full py-3">
          <div className="flex flex-row items-center gap-1">
            <NavigationLink href="/" isActive={pathname === "/"}>
              Inicio
            </NavigationLink>
            <NavigationLink href="/results" isActive={pathname === "/results"}>
              Resultados
            </NavigationLink>
            <NavigationLink
              href="/resources"
              isActive={pathname === "/resources"}
            >
              Recursos
            </NavigationLink>
            <NavigationLink
              href="/problems"
              isActive={
                pathname === "/problems" || pathname?.startsWith("/problems/")
              }
            >
              Problemas
            </NavigationLink>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
