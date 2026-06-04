import { tool } from 'ai';
import { z } from 'zod';

const rgbaColorSchema = z.array(z.number()).length(4).min(0).max(255)
const colorField = (usage: string) => rgbaColorSchema.describe(`${usage} - array with 4 number entries, range from 0-255 in this format: [Red, Green, Blue, Alpha] - e.g. fully opaque red [255, 0, 0, 255]`);

export const updateDeckLayerViz = tool({
  description: 'Updates DeckGL Map Layer GeoJSONLayer visualization parameters, currently support color fill for polygons and points.',
  inputSchema: z.object({
    fillColor: colorField('fillColor'),
    lineColor: colorField('lineColor'),
    lineWidth: z.number().describe('width of line 10=small 100=med 1000=lg 5000=xl 10000=2xl'),
    pointRadius: z.number().describe('size of point e.g. 100=small 1000=med 10000=large 50000=xl 100000=2xl'),
  }),
  execute: async ({ fillColor, lineColor, lineWidth, pointRadius }:
    { fillColor: number[], lineColor: number[], lineWidth: number, pointRadius: number }) => {
    // if (!fillColor) return { error: `Incorrect fill color "${fillColor}"` };
    return { fillColor: fillColor, lineColor: lineColor, lineWidth: lineWidth, pointRadius: pointRadius };
  },
});
