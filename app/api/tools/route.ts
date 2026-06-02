import { convertToModelMessages, stepCountIs, streamText, UIMessage } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const openrouter = createOpenRouter({ apiKey: OPENROUTER_API_KEY });

export const maxDuration = 20;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openrouter('openrouter/free'),
    system: 'You are a helpful assistant, you ALWAYS answer VERY briefly if possible',
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 4000,
    tools: {},
    stopWhen: stepCountIs(2),
    onStepFinish(event) {
      console.log('\n📍 Step finished:', event.toolResults);
      if (event.toolCalls && event.toolCalls.length > 0) {
        event.toolCalls.forEach((call) => {
          console.log(`🔧 Tool called: ${call.toolName}`);
          // console.log(`   Result: ${result.output}`);
        });
      }
    },
  });

  return result.toUIMessageStreamResponse();
}
