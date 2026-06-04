import { convertToModelMessages, stepCountIs, streamText, UIMessage } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { geocodeAddressTool } from '../ai/geocodeAddress';
import { getMapDataURL } from '../ai/getMapDataURL';
import { google } from '@ai-sdk/google';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const openrouter = createOpenRouter({
  apiKey: OPENROUTER_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const model = google('gemini-2.5-flash-lite'); // or 'gemini-2.5-flash'
  // const model = openrouter('openrouter/free');

  const result = streamText({
    model: model,
    system: 'You are a helpful assistant, you ALWAYS answer VERY briefly if possible',
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 4000,

    tools: {
      geocodeAddressTool,
      getMapDataURL
    },
    stopWhen: stepCountIs(2),
    onStepFinish(event) {
      console.log('\n📍 Step finished:', event.toolResults);
      if (event.toolCalls && event.toolCalls.length > 0) {
        event.toolCalls.forEach((call) => {
          console.log(`🔧 Tool called: ${call.toolName}`);
        });
      }
      if (event.toolResults && event.toolResults.length > 0) {
        event.toolResults.forEach((result) => {
          console.log(`   Result:`, result.output);
        });
      }
    },
  });

  return result.toUIMessageStreamResponse();
}

