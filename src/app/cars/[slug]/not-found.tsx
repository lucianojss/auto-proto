import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="rounded-full bg-muted p-6">
          <Car className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">Car Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t find the car you&apos;re looking for. It may have been sold or removed.
          </p>
        </div>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Car Search
          </Link>
        </Button>
      </div>
    </div>
  );
}