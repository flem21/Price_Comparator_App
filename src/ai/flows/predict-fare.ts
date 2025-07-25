'use server';

/**
 * @fileOverview Predicts fares during peak hours using AI to help users make informed decisions about when to book rides.
 *
 * - predictFare - A function that handles the fare prediction process.
 * - PredictFareInput - The input type for the predictFare function.
 * - PredictFareOutput - The return type for the predictFare function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictFareInputSchema = z.object({
  origin: z.string().describe('The origin address for the ride.'),
  destination: z.string().describe('The destination address for the ride.'),
  currentTime: z.string().describe('The current time as an ISO string.'),
  rideType: z.enum(['Uber', 'Rapido', 'Ola']).describe('The type of ride.'),
});
export type PredictFareInput = z.infer<typeof PredictFareInputSchema>;

const PredictFareOutputSchema = z.object({
  predictedFare: z.number().describe('The predicted fare for the ride.'),
  peakTimeRecommendation: z.string().describe('Recommendation on optimal time to book ride, if applicable.'),
});
export type PredictFareOutput = z.infer<typeof PredictFareOutputSchema>;

export async function predictFare(input: PredictFareInput): Promise<PredictFareOutput> {
  return predictFareFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictFarePrompt',
  input: {schema: PredictFareInputSchema},
  output: {schema: PredictFareOutputSchema},
  prompt: `You are a ride fare prediction expert. Given the origin, destination, current time, and ride type, you will predict the fare for the ride.

Origin: {{{origin}}}
Destination: {{{destination}}}
Current Time: {{{currentTime}}}
Ride Type: {{{rideType}}}

Consider the current time and predict if it is a peak hour. If it is, provide a recommendation on when to book the ride to save money. Return a JSON object containing the predicted fare and peak time recommendation (if applicable).`,
});

const predictFareFlow = ai.defineFlow(
  {
    name: 'predictFareFlow',
    inputSchema: PredictFareInputSchema,
    outputSchema: PredictFareOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
