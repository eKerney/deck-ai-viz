// import { yourProvider } from "your-custom-provider";
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const openrouter = createOpenRouter({
  apiKey: OPENROUTER_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openrouter('openrouter/free'),
    system: 'You are a helpful assistant, you ALWAYS answer VERY briefly if possible',
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
