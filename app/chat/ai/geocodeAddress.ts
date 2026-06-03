import { tool } from 'ai';
import { z } from 'zod';

/**
 * Converts addresses/place names to coordinates using the ArcGIS Geocoding API.
 */

export const geocodeAddressTool = tool({
  description:
    'Convert a place name, address, or landmark into geographic coordinates',
  inputSchema: z.object({
    place: z
      .string()
      .describe(
        'The place name, address, or landmark to geocode (e.g., "New York", "White House", "1600 Pennsylvania Ave")'
      )
  }),

  execute: async ({ place }: { place: string }) => {
    console.log(`\n🌍 geocodeAddressTool called with: ${place}}`);
    const geocodeResult = await geocodeAddress(place);
    if ('error' in geocodeResult) return geocodeResult;
    const { longitude, latitude, address } = geocodeResult;
    return { x: longitude, y: latitude, address };
  },
});

interface GeocodeResult {
  longitude: number;
  latitude: number;
  address: string;
}

interface GeocodeError {
  error: string;
}

/**
 * Geocodes an address using the ArcGIS World Geocoder.
 *
 * @param place - The address or place name to geocode
 * @returns Coordinates and formatted address, or an error
 */
async function geocodeAddress(place: string): Promise<GeocodeResult | GeocodeError> {
  const geocodeUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=${encodeURIComponent(place)}&f=json&maxLocations=1`;
  try {
    const response = await fetch(geocodeUrl);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Geocoding API error: ${response.status} ${response.statusText} - ${text}`);
    }
    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      return { error: `No geocoding candidates found for "${place}"` };
    }

    const topCandidate = data.candidates[0];
    return {
      longitude: topCandidate.location.x,
      latitude: topCandidate.location.y,
      address: topCandidate.address,
    };
  } catch (error) {
    console.error('Error fetching geocoding results:', error);
    return { error: 'Failed to fetch geocoding results' };
  }
}
