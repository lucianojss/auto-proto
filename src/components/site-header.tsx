import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { APP_ROUTES } from "@/lib/routes";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href={"/"} className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">AutoSearch</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href={APP_ROUTES.CARS}
            className="transition-colors hover:text-foreground/80"
          >
            All Used Cars
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
