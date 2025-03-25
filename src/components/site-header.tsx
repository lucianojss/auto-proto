import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href={"/"} className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">AutoSearch</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm">
            Sign in !TODO!
          </Button>
        </div>
      </div>
    </header>
  );
}
