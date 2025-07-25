import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { FareDetails } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateFareDetails(totalFare: number): FareDetails {
  // This is a mock function to create a plausible breakdown
  const baseFare = totalFare * 0.25;
  const taxes = totalFare * 0.1;
  const distanceAndTimeCharge = totalFare - baseFare - taxes;
  
  return {
    baseFare: parseFloat(baseFare.toFixed(2)),
    distanceCharge: parseFloat((distanceAndTimeCharge * 0.7).toFixed(2)),
    timeCharge: parseFloat((distanceAndTimeCharge * 0.3).toFixed(2)),
    surgeMultiplier: parseFloat((1 + Math.random() * 0.5).toFixed(1)), // Mock surge between 1x and 1.5x
    taxes: parseFloat(taxes.toFixed(2)),
  };
}
