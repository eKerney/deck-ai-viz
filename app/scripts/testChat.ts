import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText, streamText, Output } from 'ai';
import { z } from "zod";
import { google } from '@ai-sdk/google';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const openrouter = createOpenRouter({ apiKey: OPENROUTER_API_KEY });
// const model = openrouter('openrouter/free');
// const model = openrouter('google/gemma-4-26b-a4b-it:free');
const model = google('gemini-2.5-flash'); // or 'gemini-2.5-flash'

const schema = Output.object({
      schema: z.object({
            directions: z.object({
                  start: z.string().describe('starting location'),
                  end: z.string().describe('ending location'),
                  distance: z.number().describe('total distance in miles from start to end'),
                  time: z.string().describe('amount of time to travel from start to end'),
                  turns: z.array(z.string().describe('turn by turn directions fro travelling from start to end by car'))
            }).describe('an object containing car travel directions from start to end destination')
      }),
      name: 'GetDirections'
});

export const answerQuestion = async (userInput: string, systemPrompt: string) => {
      const messages = [{ role: "user" as const, content: userInput }];
      const { textStream } = streamText({
            model,
            messages: messages,
            system: systemPrompt,
      })
      for await (const text of textStream) {
            process.stdout.write(text);
      }
      return textStream;
}
export const streamDirections = async (prompt: string) => {
      const result = await streamText({
            model: model,
            prompt: prompt,
            output: schema,
      })
      for await (const obj of result.partialOutputStream) {
            console.clear();
            // console.dir(obj, { depth: null });
            console.log(JSON.stringify(obj, null, 2));
      }
      const finalObject = await result.output
};

export const getDirections = async (prompt: string) => {
      const { output } = await generateText({
            model: model,
            prompt: prompt,
            output: schema,
      })
      return output.directions;
};


// streamText answerQuestion
// const prompt = 'How far is Kalamazoo, MI from Chicago by car'
// const systemPrompt = '';
// const response = await answerQuestion(prompt, systemPrompt);
//
// getDirections()
// const prompt = 'Directions from Kalamazoo, MI to Chicago, IL'
// const directions = await getDirections(prompt);
// console.log(directions);

// streamDirections()
const prompt = 'Directions from Kalamazoo, MI to Chicago, IL'
const directions = await streamDirections(prompt);

