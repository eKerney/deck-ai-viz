// import { createOpenRouter } from '@openrouter/ai-sdk-provider';
// import { convertToModelMessages, streamText, tool } from 'ai';
// import { z } from 'zod';
//
// const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// const openrouter = createOpenRouter({ apiKey: OPENROUTER_API_KEY });
//
// /**
//  * Looks up the appropriate data layer from https://geojson.xyz/ - return the GeoJSON URL route for DeckGL data source 
//  */
// export const getMapDataURL = tool({
//   description: 'Looks up the appropriate data layer from https://geojson.xyz/ - return the GeoJSON URL route for DeckGL data source',
//   inputSchema: z.object({
//     layerType: z
//       .string()
//       .describe('The name of the layer to best match to layers at https://geojson.xyz/')
//   }),
//
//   execute: async ({ layerType }: { layerType: string }) => {
//     const result = streamText({
//       model: openrouter('openrouter/free'),
//       prompt: layerType
//     })
//
//     return { layerURL: result };
//   },
// });

import { tool } from 'ai';
import { z } from 'zod';

const BASE = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0';

const LAYER_MAP: Record<string, string> = {
  'roads': `${BASE}/ne_50m_roads.geojson`,
  'land': `${BASE}/ne_50m_land.geojson`,
  'ocean': `${BASE}/ne_50m_ocean.geojson`,
  'urban': `${BASE}/ne_50m_urban_areas.geojson`,
  'countries': `${BASE}/ne_50m_admin_0_countries.geojson`,
  'states': `${BASE}/ne_50m_admin_1_states_provinces.geojson`,
  'rivers': `${BASE}/ne_50m_rivers_lake_centerlines.geojson`,
  'lakes': `${BASE}/ne_50m_lakes.geojson`,
  'parks': `${BASE}/ne_10m_parks_and_protected_lands_area.geojson`,
  'populated_places': `${BASE}/ne_50m_populated_places.geojson`,
  'populated_places_simple': `${BASE}/ne_50m_populated_places_simple.geojson`,
  'geography_regions': `${BASE}/ne_50m_geography_regions_polys.geojson`,
  'marine': `${BASE}/ne_50m_geography_marine_polys.geojson`,
  'minor_islands': `${BASE}/ne_10m_minor_islands.geojson`,
  'graticules': `${BASE}/ne_50m_graticules_10.geojson`,
  'bounding_box': `${BASE}/ne_50m_wgs84_bounding_box.geojson`,
};

export const getMapDataURL = tool({
  description: 'Looks up a GeoJSON layer URL from https://geojson.xyz/ for use as a DeckGL data source. Available categories: roads, land, ocean, urban, countries, states, rivers, lakes, parks, populated_places',
  inputSchema: z.object({
    layerType: z.string().describe('Layer category — e.g. roads, parks, water, land, urban, countries, states, rivers, lakes, oceans, populated_places'),
  }),
  execute: async ({ layerType }: { layerType: string }) => {
    const key = layerType.toLowerCase().trim();
    const url = LAYER_MAP[key];
    if (url) return { layerURL: url, layerName: key };
    const fuzzy = Object.entries(LAYER_MAP).find(([k]) =>
      k.includes(key) || key.includes(k)
    );
    if (fuzzy) return { layerURL: fuzzy[1], layerName: fuzzy[0] };
    return { error: `Unknown layer type "${layerType}". Available: ${Object.keys(LAYER_MAP).join(', ')}` };
  },
});

