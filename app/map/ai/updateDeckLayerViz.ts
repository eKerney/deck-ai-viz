import { tool } from 'ai';
import { z } from 'zod';

export const updateDeckLayerViz = tool({
  description: 'Updates DeckGL Map Layer GeoJSONLayer visualization parameters, currently support color fill for shapes, aka polygons ',
  inputSchema: z.object({
    polygonFillColor: z.array(z.number())
      .length(4)
      .min(0)
      .max(255)
      .describe("An array with 4 number entries, each range from 0-255 in this format: [Red, Green, Blue, Alpha] - e.g. this is fully opaque red [255, 0, 0, 255]"),
  }),
  execute: async ({ polygonFillColor }: { polygonFillColor: number[] }) => {
    if (!polygonFillColor) return { error: `Incorrect fill color "${polygonFillColor}"` };
    return { polygonFillColor: polygonFillColor };
  },
});
