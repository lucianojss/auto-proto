"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ShareButtonProps {
  url: string;
}

export function ShareButton({ url }: ShareButtonProps) {
  const [copying, setCopying] = useState(false);

  const handleShare = async () => {
    setCopying(true);

    try {
      // Fallback to clipboard copy
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Failed to share");
    } finally {
      setCopying(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full justify-start"
      onClick={handleShare}
      disabled={copying}
    >
      <Share2 className="mr-2 h-4 w-4" />
      {copying ? "Sharing..." : "Share"}
    </Button>
  );
}
