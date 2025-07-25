"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LocateFixed, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const searchSchema = z.object({
  origin: z.string().min(3, { message: "Origin must be at least 3 characters." }),
  destination: z.string().min(3, { message: "Destination must be at least 3 characters." }),
});

type RideSearchFormProps = {
  onSubmit: (values: z.infer<typeof searchSchema>) => void;
  isLoading: boolean;
};

export const RideSearchForm = ({ onSubmit, isLoading }: RideSearchFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      origin: "",
      destination: "",
    },
  });

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd use a geocoding service to convert lat/lng to an address.
          // For this demo, we'll just indicate it's the current location.
          form.setValue("origin", `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`);
          toast({ title: "Success", description: "Current location set as origin." });
        },
        (error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: `Could not get location: ${error.message}`,
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by your browser.",
      });
    }
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-headline text-lg">From</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input placeholder="e.g., Connaught Place, New Delhi" {...field} className="pr-10" />
                      </FormControl>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={handleGetCurrentLocation}
                        aria-label="Use current location"
                      >
                        <LocateFixed className="h-5 w-5" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-headline text-lg">To</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., India Gate, New Delhi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full text-lg py-6 bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Finding Best Rides...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-6 w-6" />
                  Find Rides
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
