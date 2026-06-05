import { tool } from 'ai';
import { z } from 'zod';

const createColorField = (usage: string) => {
  return z
    .array(z.number().min(0).max(255))
    .length(4)
    .describe(`${usage} - Array with exactly 4 number entries, range from 0-255 in this format: [Red, Green, Blue, Alpha] - e.g. 50% opacity red [255, 0, 0, 127] - Alpha=transparency 0=invisible 255=opaque`)
}

export const updateDeckLayerViz = tool({
  description: 'Updates DeckGL Map Layer GeoJSONLayer visualization parameters, currently support color fill for polygons and points.',
  // strict: true,
  inputSchema: z.object({
    fillColor: createColorField('fillColor'),
    lineColor: createColorField('lineColor'),
    lineWidth: z.number().describe('width of line 10=small 100=medium 1000=large 5000=extra large 10000=very big'),
    pointRadius: z.number().describe('size of point e.g. 100=small 1000=medium 10000=large 50000=extra large 100000=very big'),
  }),
  execute: async ({ fillColor, lineColor, lineWidth, pointRadius }:
    { fillColor: number[], lineColor: number[], lineWidth: number, pointRadius: number }) => {
    // if (!fillColor) return { error: `Incorrect fill color "${fillColor}"` };
    return { fillColor: fillColor, lineColor: lineColor, lineWidth: lineWidth, pointRadius: pointRadius };
  },
});

// import { tool } from 'ai';
// import { z } from 'zod';
//
// // 1. Helper that strips text/units and forces a valid number
// const groqNumberCoerce = (desc: string) =>
//   z.preprocess((val) => {
//     if (typeof val === 'string') {
//       // Strips common string mutations like 'px', '#', 'rgba', brackets, etc.
//       const cleaned = val.replace(/[^\d.-]/g, '');
//       return cleaned ? parseFloat(cleaned) : val;
//     }
//     return val;
//   }, z.coerce.number().min(0).max(255))
//     .describe(`${desc} - MUST be a plain numeric value, do not include units or quotes.`);
//
// export const updateDeckLayerViz = tool({
//   description: 'Updates DeckGL Map Layer parameters. Supports color configuration for polygon and point visualizations.',
//
//   inputSchema: z.object({
//     // 2. Flatten keys AND use coercion to break any string generations
//     fillR: groqNumberCoerce('Fill Red'),
//     fillG: groqNumberCoerce('Fill Green'),
//     fillB: groqNumberCoerce('Fill Blue'),
//     fillA: groqNumberCoerce('Fill Alpha/Opacity'),
//
//     lineR: groqNumberCoerce('Line Red'),
//     lineG: groqNumberCoerce('Line Green'),
//     lineB: groqNumberCoerce('Line Blue'),
//     lineA: groqNumberCoerce('Line Alpha/Opacity'),
//
//     // Use standard coercion for sizes to protect them from "px" strings
//     lineWidth: z.coerce.number().describe('width of line e.g., 10, 100, 1000'),
//     pointRadius: z.coerce.number().describe('radius size of point e.g., 100, 1000, 5000'),
//   }),
//
//   execute: async (args) => {
//     // 3. Assemble into the exact [R,G,B,A] arrays your DeckGL layers need
//     const fillColor = [args.fillR, args.fillG, args.fillB, args.fillA];
//     const lineColor = [args.lineR, args.lineG, args.lineB, args.lineA];
//
//     console.log('Successfully coerced Groq to clean numbers:', fillColor, lineColor);
//
//     return {
//       fillColor,
//       lineColor,
//       lineWidth: args.lineWidth,
//       pointRadius: args.pointRadius
//     };
//   },
// });
//
