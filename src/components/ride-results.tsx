"use client";

import type { RideOption } from "@/lib/types";
import { RideOptionCard } from "@/components/ride-option-card";
import { RideOptionCardSkeleton } from "@/components/ride-option-card-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, TriangleAlert } from "lucide-react";

type RideResultsProps = {
  rideOptions: RideOption[];
  isLoading: boolean;
  error: string | null;
  peakTimeRecommendation: string | null;
};

export const RideResults = ({ rideOptions, isLoading, error, peakTimeRecommendation }: RideResultsProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RideOptionCardSkeleton />
        <RideOptionCardSkeleton />
        <RideOptionCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (rideOptions.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <h2 className="font-headline text-2xl">Ready to ride?</h2>
        <p>Enter your origin and destination to see fare comparisons.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {peakTimeRecommendation && (
        <Alert className="bg-primary/10 border-primary/30 max-w-3xl mx-auto">
          <Lightbulb className="h-4 w-4 text-primary" />
          <AlertTitle className="font-headline text-primary">Wise Tip!</AlertTitle>
          <AlertDescription>
            {peakTimeRecommendation}
          </AlertDescription>
        </Alert>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in-50 duration-500">
        {rideOptions.map((option) => (
          <RideOptionCard key={option.service} option={option} />
        ))}
      </div>
    </div>
  );
};
