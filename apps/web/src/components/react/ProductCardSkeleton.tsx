"use client";

import { Card, CardContent, CardFooter } from "@synoem/ui/components/card";

export const ProductCardSkeleton = () => {
  return (
    <div className="group h-full flex flex-col overflow-hidden bg-muted rounded-lg shadow-sm">
      <Card className="overflow-hidden h-full flex flex-col rounded-lg p-0 gap-4">
        <CardContent className="p-0 rounded-lg">
          <div className="relative aspect-[4/3] overflow-hidden">
            <div className="w-full h-full bg-muted-foreground/20 animate-pulse" />
            <div className="absolute top-3 right-3">
              <div className="w-16 h-5 rounded-full bg-muted-foreground/20 animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col flex-grow p-4 gap-2">
            <div className="h-6 w-3/4 bg-accent animate-pulse mb-1" />

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-muted-foreground/20 animate-pulse" />
              <div className="h-4 w-32 bg-muted-foreground/20 rounded animate-pulse" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-muted-foreground/20 animate-pulse" />
              <div className="h-4 w-28 bg-muted-foreground/20 rounded animate-pulse" />
            </div>

            <div className="h-4 w-full bg-muted-foreground/20 rounded animate-pulse mt-1" />
            <div className="h-4 w-2/3 bg-muted-foreground/20 rounded animate-pulse mb-auto" />
          </div>
        </CardContent>

        <CardFooter className="p-4 w-full flex flex-col gap-2">
          <div className="w-full h-9 bg-muted-foreground rounded animate-pulse" />
          <div className="w-full h-9 bg-muted-foreground/50 rounded animate-pulse" />
        </CardFooter>
      </Card>
    </div>
  );
};
