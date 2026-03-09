"use client";

import { useAppStore } from "@/lib/store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ClientProductActionsProps {
  productId: number;
}

export default function ClientProductActions({ productId }: ClientProductActionsProps) {
  const { toggleFavorite, isFavorite } = useAppStore();
  const [isPending, setIsPending] = useState(false);

  const isFav = isFavorite(productId);

  const handleToggleFavorite = async () => {
    setIsPending(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    toggleFavorite(productId);
    setIsPending(false);
  };

  let buttonIcon = <Heart className="h-5 w-5" />;
  let buttonText = "Add to Favorites";
  let buttonVariant: "default" | "destructive" = "default";
  let tooltipText = "Click to add to your favorites";

  if (isPending) {
    buttonIcon = <Loader2 className="h-5 w-5 animate-spin" />;
    buttonText = "Processing...";
  } else if (isFav) {
    buttonIcon = <HeartOff className="h-5 w-5" />;
    buttonText = "Remove from Favorites";
    buttonVariant = "destructive";
    tooltipText = "Click to remove from your favorites";
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleToggleFavorite}
              variant={buttonVariant}
              size="lg"
              className="w-full gap-2 transition-all duration-200 hover:scale-105 sm:w-auto"
              disabled={isPending}
            >
              {buttonIcon}
              <span>{buttonText}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
