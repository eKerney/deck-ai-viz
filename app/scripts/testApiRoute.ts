// Fix Plan — app / scripts / testApiRoute.ts

const userPrompt = 'Could you get the source url from geojson.xyz for countries of the world?  This is for a deck.gl map layer, the data source';
const route = 'tools'
const response = await fetch('http://localhost:3000/api/' + route, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ id: '1', role: 'user', content: 'hello', parts: [{ type: 'text', text: userPrompt }] }]
  }),
});

if (!response.ok) { console.error(await response.text()); process.exit(1); }

const reader = response.body!.getReader();
const decoder = new TextDecoder();
let buffer = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split('\n');
  buffer = lines.pop() || '';
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    const json = line.slice(6).trim();
    if (json === '[DONE]') break;
    try {
      const event = JSON.parse(json);
      if (event.type === 'text-delta') process.stdout.write(event.delta);
    } catch { /* skip malformed */ }
  }
}

