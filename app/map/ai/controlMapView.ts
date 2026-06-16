import { tool } from 'ai';
import { z } from 'zod';

// const createColorField = (usage: string) => {
//   return z
//     .array(z.number().min(0).max(255))
//     .length(4)
//     .describe(`${usage} - Array with exactly 4 number entries, range from 0-255 in this format: [Red, Green, Blue, Alpha] - e.g. 50% opacity red [255, 0, 0, 127] - Alpha=transparency 0=invisible 255=opaque`)
// }
//
// export const updateDeckLayerViz = tool({
//   description: 'Updates DeckGL Map Layer GeoJSONLayer visualization parameters, currently support color fill, line color, line width, point radius, and feature height aka elevation',
//   inputSchema: z.object({
//     fillColor: createColorField('fillColor'),
//     lineColor: createColorField('lineColor'),
//     lineWidth: z.number().describe('width of line 10=small 100=medium 1000=large 5000=extra large 10000=very big'),
//     pointRadius: z.number().describe('size of point e.g. 100=small 1000=medium 10000=large 50000=extra large 100000=very big'),
//     extrudedElevation: z.number().describe('height of polygon or feature 3D extrusion, 1000=small 10000=extra large'),
//   }),
//   execute: async ({ fillColor, lineColor, lineWidth, pointRadius, extrudedElevation }:
//     { fillColor: number[], lineColor: number[], lineWidth: number, pointRadius: number, extrudedElevation: number }) => {
//     // if (!fillColor) return { error: `Incorrect fill color "${fillColor}"` };
//     return { fillColor: fillColor, lineColor: lineColor, lineWidth: lineWidth, pointRadius: pointRadius, extrudedElevation: extrudedElevation };
//   },
// });


/** 
Tool for natural language control of map interactions 
user makes request to LLM 
LLM must understand what the mapview params are 
Returns an updated mapViewState object 
mapviewState is updated using new view 

*/

