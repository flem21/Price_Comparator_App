"use client";

import type { RideOption } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RideServiceIcon } from "@/components/icons/ride-service-icons";
import { ArrowRight, Clock, IndianRupee, Tag, Zap } from "lucide-react";

type RideOptionCardProps = {
  option: RideOption;
};

const getDeeplink = (service: string, origin: string, destination: string) => {
    // In a real app, you would use geocoded lat/lng
    switch(service) {
        case "Uber": return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${destination}`;
        case "Ola": return `https://book.olacabs.com/?pickup=${origin}&drop=${destination}`;
        case "Rapido": return `https://rapido.bike/`; // Rapido doesn't have a standard web deeplink
        default: return '#';
    }
}

export const RideOptionCard = ({ option }: RideOptionCardProps) => {
  return (
    <Card className="flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <CardHeader className="relative pb-4">
        <div className="flex justify-between items-start">
            <RideServiceIcon service={option.service} className="h-8 w-auto text-foreground" />
            <div className="flex gap-2">
                {option.isFastest && <Badge variant="secondary" className="bg-green-200 text-green-800"><Zap className="h-3 w-3 mr-1" />Fastest</Badge>}
                {option.isCheapest && <Badge variant="secondary" className="bg-blue-200 text-blue-800"><Tag className="h-3 w-3 mr-1" />Cheapest</Badge>}
            </div>
        </div>
        <CardTitle className="pt-4 flex items-baseline gap-2 font-headline">
          <IndianRupee className="h-7 w-7" />
          <span className="text-5xl font-bold">{Math.round(option.predictedFare)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex justify-around text-center">
            <div className="px-2">
                <p className="text-2xl font-bold font-headline">{option.eta}</p>
                <p className="text-sm text-muted-foreground">Arrival Time (min)</p>
            </div>
             <div className="px-2">
                <p className="text-2xl font-bold font-headline">{option.travelTime}</p>
                <p className="text-sm text-muted-foreground">Trip (min)</p>
            </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Fare Details</AccordionTrigger>
                <AccordionContent>
                <ul className="space-y-2 text-sm">
                    <li className="flex justify-between"><span>Base Fare</span> <span>₹{option.fareDetails.baseFare.toFixed(2)}</span></li>
                    <li className="flex justify-between"><span>Distance Charge</span> <span>₹{option.fareDetails.distanceCharge.toFixed(2)}</span></li>
                    <li className="flex justify-between"><span>Time Charge</span> <span>₹{option.fareDetails.timeCharge.toFixed(2)}</span></li>
                    <li className="flex justify-between"><span>Surge</span> <span className={option.fareDetails.surgeMultiplier > 1.1 ? 'text-destructive font-semibold' : ''}>{option.fareDetails.surgeMultiplier}x</span></li>
                    <li className="flex justify-between border-t pt-2 mt-2"><strong>Total</strong> <strong>₹{option.predictedFare.toFixed(2)}</strong></li>
                </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <a href={getDeeplink(option.service, 'origin', 'destination')} target="_blank" rel="noopener noreferrer">
                Book on {option.service}
                <ArrowRight className="ml-2 h-4 w-4" />
            </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
