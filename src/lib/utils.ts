import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { FareDetails } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateFareDetails(totalFare: number): FareDetails {
  // This is a mock function to create a plausible breakdown
  const baseFare = totalFare * 0.6; // 60%
  const taxes = totalFare * 0.15; // 15%
  const distanceAndTimeCharge = totalFare * 0.25; // 25%

  return {
    baseFare: parseFloat(baseFare.toFixed(2)),
    distanceCharge: parseFloat((distanceAndTimeCharge * 0.7).toFixed(2)),
    timeCharge: parseFloat((distanceAndTimeCharge * 0.3).toFixed(2)),
    surgeMultiplier: 1.0,
    taxes: parseFloat(taxes.toFixed(2)),
  };
}
