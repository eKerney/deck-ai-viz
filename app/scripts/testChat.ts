import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText, streamText, convertToModelMessages } from 'ai';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const openrouter = createOpenRouter({ apiKey: OPENROUTER_API_KEY });
const model = openrouter('openrouter/free');

export const answerQuestion = async (userInput: string, systemPrompt: string) => {
      const messages = [
            // { role: "system" as const, content: systemPrompt },
            { role: "user" as const, content: userInput },
      ];
      const { textStream } = streamText({
            model,
            messages: messages,
            system: systemPrompt,
      })
      // return text;
      for await (const text of textStream) {
            process.stdout.write(text);
      }
      return textStream;
}

// const prompt = 'We are building an app with the AI SDK, brief please.'
// const prompt = 'Where is Kalamazoo MI?'
const prompt = 'How far is Kalamazoo, MI from Chicago by car'
// const systemPrompt = 'You are a helpful geospatial and GIS assistant'
const systemPrompt = '';
const response = await answerQuestion(prompt, systemPrompt);
// console.log(response);
