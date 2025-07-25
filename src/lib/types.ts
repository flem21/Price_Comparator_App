export type RideService = 'Uber' | 'Ola' | 'Rapido';

export type FareDetails = {
  baseFare: number;
  distanceCharge: number;
  timeCharge: number;
  surgeMultiplier: number;
  taxes: number;
};

export type RideOption = {
  service: RideService;
  predictedFare: number;
  peakTimeRecommendation: string;
  eta: number; // in minutes
  travelTime: number; // in minutes
  fareDetails: FareDetails;
  isCheapest?: boolean;
  isFastest?: boolean;
};
