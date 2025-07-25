"use client";

import { useState } from "react";
import { z } from "zod";
import { predictFare } from "@/ai/flows/predict-fare";
import type { RideOption, RideService } from "@/lib/types";
import { RideSearchForm, searchSchema } from "@/components/ride-search-form";
import { RideResults } from "@/components/ride-results";
import { generateFareDetails } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [rideOptions, setRideOptions] = useState<RideOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [peakTimeRecommendation, setPeakTimeRecommendation] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (values: z.infer<typeof searchSchema>) => {
    setIsLoading(true);
    setError(null);
    setRideOptions([]);
    setPeakTimeRecommendation(null);

    try {
      const services: RideService[] = ["Uber", "Ola", "Rapido"];
      const currentTime = new Date().toISOString();

      const farePromises = services.map(service =>
        predictFare({
          origin: values.origin,
          destination: values.destination,
          currentTime,
          rideType: service,
        }).then(prediction => {
          // Mocking ETA and Travel Time for demonstration
          const eta = Math.floor(Math.random() * 10) + 2; // 2-12 mins
          const travelTime = Math.floor(Math.random() * 20) + 15; // 15-35 mins
          const fareDetails = generateFareDetails(prediction.predictedFare);

          return {
            ...prediction,
            service,
            eta,
            travelTime,
            fareDetails,
          };
        })
      );

      const results = await Promise.all(farePromises);

      // Determine cheapest and fastest
      let cheapest = results[0];
      let fastest = results[0];
      for (const result of results) {
        if (result.predictedFare < cheapest.predictedFare) {
          cheapest = result;
        }
        if (result.eta < fastest.eta) {
          fastest = result;
        }
      }

      const finalOptions = results.map(option => ({
        ...option,
        isCheapest: option.service === cheapest.service,
        isFastest: option.service === fastest.service,
      }));
      
      const recommendation = results.find(r => r.peakTimeRecommendation)?.peakTimeRecommendation;
      setPeakTimeRecommendation(recommendation || null);

      setRideOptions(finalOptions);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to predict fares. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">
            RideWise <span className="text-foreground">India</span>
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Your smart companion for hassle-free travel. Compare fares, get predictions, and choose the best ride.
          </p>
        </header>

        <section className="max-w-3xl mx-auto">
          <RideSearchForm onSubmit={handleSearch} isLoading={isLoading} />
        </section>

        <section className="mt-8 md:mt-12">
          <RideResults 
            rideOptions={rideOptions} 
            isLoading={isLoading} 
            error={error} 
            peakTimeRecommendation={peakTimeRecommendation}
          />
        </section>
      </div>
    </main>
  );
}
