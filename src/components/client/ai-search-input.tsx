"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AISearchInputProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export function AISearchInput({ onSearch, className }: AISearchInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative w-full max-w-2xl mx-auto", className)}
    >
      <div className="relative group">
        {/* Animated gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/60 via-purple-500/60 to-blue-500/60 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>

        <div className="relative flex items-center">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your perfect car in natural language..."
            className="flex-1 pl-12 pr-20 py-6 h-14 bg-background border-primary/20 rounded-lg focus-visible:ring-primary/50 focus-visible:ring-offset-0 text-base"
          />
          <Sparkles className="absolute left-4 h-5 w-5 text-primary animate-pulse" />
          <Button type="submit" size="sm" className="absolute right-2">
            Search
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-6 text-center">
        Try "A family SUV with good fuel economy under £20,000" or "A sporty
        convertible with leather seats"
      </p>
    </form>
  );
}
