'use client';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';
import { useEffect, useState } from 'react';
import { ChatProps } from '../ChatInterface.types';
import ReactMarkdown from 'react-markdown';

export default function ChatInterface(props: ChatProps) {
  const { children, layerCallback, layerVizCallback } = props;
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: 'chat/api' }),
    onFinish: ({ message }) => {
      for (const part of message.parts) {
        console.log(part)
        if ((part as any).type === 'tool-getMapDataURL' && (part as any).state === 'output-available') {
          layerCallback?.((part as any).output);
          break;
        }
        else if ((part as any).type === 'tool-updateDeckLayerViz' && (part as any).state === 'output-available') {
          layerVizCallback?.((part as any).output);
          break;
        }
      }
    },
  });

  const messageMapper = (messages: Array<UIMessage>) => {
    return messages.map((message) => (
      <div key={message.id} className='whitespace-pre-wrap'>
        {message.parts.map((part, i) => {
          if (part.type === 'text') {
            if (message.role === 'user' && part.text !== '')
              return (
                <div className='chat chat-start' key={`chat-start-${i}`}>
                  <div className='chat-bubble bg-gray-700/80 text-white' key={`${message.id}-${i}`}>
                    {part.text}
                  </div>
                </div>
              );
            if (message.role === 'assistant' && part.text !== '')
              return (
                <div className='chat chat-end' key={`chat-start-${i}`}>
                  <div className='chat-bubble bg-gray-800/80 text-white' key={`${message.id}-${i}`}>
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a {...props} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline' />
                        ),
                      }}
                    >
                      {part.text}
                    </ReactMarkdown>
                  </div>
                </div>
              );
          }
          return null;
        })}
      </div>
    ));
  };

  return (
    <div className='flex flex-col h-full'>
      <div className={`flex flex-row items-baseline mb-8`}>
        <div
          className='text-xl font-mono text-white'
          style={{ fontFamily: 'monospace' }}
        >
          Add a layer from geojson.xyz and update the viz
        </div>
      </div>
      <div className='flex-1 flex flex-col w-full max-w-md mx-auto min-h-0'>
        <div className='grow overflow-y-auto mb-4'>
          {messageMapper(messages)}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput('');
          }}
          className='px-1'
        >
          {status === 'streaming' && (
            <span className=' loading loading-xl loading-spinner text-accent'></span>
          )}
          <input
            className=' left-2 bg-zinc-900/80  w-full border-4  p-3  mb-10 
             border-zinc-700 rounded shadow-xl text-white/90  focus:ring-1 focus:ring-amber-600 '
            value={input}
            placeholder='Which layer would you like to add...'
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
      {children}
    </div>
  );
}
