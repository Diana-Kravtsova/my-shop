"use client";

import { useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ClientProductActionsProps {
  productId: number;
}

export default function ClientProductActions({ productId }: ClientProductActionsProps) {
  const { toggleFavorite, isFavorite } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isFav = isMounted ? isFavorite(productId) : false;

  const handleToggleFavorite = async () => {
    setIsPending(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    toggleFavorite(productId);
    setIsPending(false);
  };

  if (!isMounted) {
    return (
      <Button disabled className="w-full md:w-auto gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col sm:flex-row gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleToggleFavorite}
              variant={isFav ? "destructive" : "default"}
              size="lg"
              className="w-full sm:w-auto gap-2 transition-all duration-200 hover:scale-105"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isFav ? (
                <HeartOff className="h-5 w-5" />
              ) : (
                <Heart className="h-5 w-5" />
              )}
              <span>
                {isPending
                  ? "Processing..."
                  : isFav
                    ? "Remove from Favorites"
                    : "Add to Favorites"
                }
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isFav ? "Click to remove from your favorites" : "Click to add to your favorites"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
