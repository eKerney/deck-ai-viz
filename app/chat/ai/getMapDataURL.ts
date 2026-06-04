import { tool } from 'ai';
import { z } from 'zod';

export type LayerEntry = { url: string; geometry: 'point' | 'line' | 'polygon' | null };

const BASE = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0';

const LAYER_MAP: Record<string, LayerEntry> = {
  'roads': { url: `${BASE}/ne_50m_roads.geojson`, geometry: 'line' },
  'land': { url: `${BASE}/ne_50m_land.geojson`, geometry: 'polygon' },
  'ocean': { url: `${BASE}/ne_50m_ocean.geojson`, geometry: 'polygon' },
  'urban': { url: `${BASE}/ne_50m_urban_areas.geojson`, geometry: 'polygon' },
  'countries': { url: `${BASE}/ne_50m_admin_0_countries.geojson`, geometry: 'polygon' },
  'states': { url: `${BASE}/ne_50m_admin_1_states_provinces.geojson`, geometry: 'polygon' },
  'rivers': { url: `${BASE}/ne_50m_rivers_lake_centerlines.geojson`, geometry: 'line' },
  'lakes': { url: `${BASE}/ne_50m_lakes.geojson`, geometry: 'polygon' },
  'parks': { url: `${BASE}/ne_10m_parks_and_protected_lands_area.geojson`, geometry: 'polygon' },
  'populated_places': { url: `${BASE}/ne_50m_populated_places.geojson`, geometry: 'point' },
  'populated_places_simple': { url: `${BASE}/ne_50m_populated_places_simple.geojson`, geometry: 'point' },
  'geography_regions': { url: `${BASE}/ne_50m_geography_regions_polys.geojson`, geometry: 'polygon' },
  'marine': { url: `${BASE}/ne_50m_geography_marine_polys.geojson`, geometry: 'polygon' },
  'minor_islands': { url: `${BASE}/ne_10m_minor_islands.geojson`, geometry: 'polygon' },
  'graticules': { url: `${BASE}/ne_50m_graticules_10.geojson`, geometry: 'line' },
  'bounding_box': { url: `${BASE}/ne_50m_wgs84_bounding_box.geojson`, geometry: 'polygon' },
};

const normalize = (s: string) => s.toLowerCase().trim().replace(/[\s-]+/g, '_');

export const getMapDataURL = tool({
  description: 'Looks up a GeoJSON layer URL from https://geojson.xyz/ for use as a DeckGL data source. Returns the URL, layer name, and geometry type (point/line/polygon).',
  inputSchema: z.object({
    layerType: z.string().describe('Layer category — e.g. roads, parks, land, urban, countries, states, rivers, lakes, oceans, populated_places, marine'),
  }),
  execute: async ({ layerType }: { layerType: string }) => {
    // const key = layerType.toLowerCase().trim();
    const key = normalize(layerType);
    const entry = LAYER_MAP[key];
    if (entry) return { layerURL: entry.url, layerName: key, geometry: entry.geometry };
    // const fuzzy = Object.entries(LAYER_MAP).find(([k]) =>
    //   k.includes(key) || key.includes(k)
    // );
    const fuzzy = Object.entries(LAYER_MAP).find(([k]) => normalize(k).includes(key) || key.includes(normalize(k)));

    if (fuzzy) return { layerURL: fuzzy[1].url, layerName: fuzzy[0], geometry: fuzzy[1].geometry };
    return { error: `Unknown layer type "${layerType}". Available: ${Object.keys(LAYER_MAP).join(', ')}` };
  },
});
