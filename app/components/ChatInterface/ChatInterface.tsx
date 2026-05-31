import { UIMessage, useChat } from '@ai-sdk/react';
import { useEffect, useState, useRef } from 'react';
import { ChatProps } from './ChatInterface.types';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { inputSelector, setInput } from '@/app/store/chatSlice';


export const ChatInterface = (props: ChatProps) => {
  const {
    children,
    className,
    callback,
    dataCallback,
    dataTypeCallback,
    floodInfoCallback,
    onReady,
  } = props;
  const input = useSelector(inputSelector);
  const dispatch = useDispatch();
  const { messages, sendMessage, status } = useChat();

  const processedToolsRef = useRef<Set<string>>(new Set());

  const triggerChat = (text: string) => {
    dispatch(setInput(text));
    sendMessage({ text });
    dispatch(setInput(''));
  };

  // give parent access to triggerChat
  if (onReady) {
    onReady(triggerChat);
  }


  // Sync messages to parent
  useEffect(() => callback?.(messages), [messages, callback]);

  useEffect(() => {
    messages.forEach((message, msgIndex) => {
      message.parts.forEach((part, partIndex) => {
        const toolKey = `${message.id}-${partIndex}-${part.type}`;

        // Skip if already processed
        if (processedToolsRef.current.has(toolKey)) return;

        if (part.type === 'tool-arcgisPlacesTool') {
          const arcgisToolOutput = (part as any).output;
          if (arcgisToolOutput?.geojson && dataCallback) {
            processedToolsRef.current.add(toolKey);
            dataCallback(arcgisToolOutput.geojson);
          }
        }

        if (part.type === 'tool-geocodeAddressTool') {
          const geocodeOutput = (part as any).output;
          if (geocodeOutput?.geojson) {
            processedToolsRef.current.add(toolKey);
            if (dataCallback) {
              dataCallback(geocodeOutput);
            }
            // Extract flood zone info for direct UI rendering (bypasses LLM)
            // Only pass official/legal text: glossary + disclaimer
            if (geocodeOutput?.floodZone && floodInfoCallback) {
              floodInfoCallback({
                riskLevel: geocodeOutput.floodZone.riskLevel,
                glossary: geocodeOutput.floodZone.glossary,
                disclaimer: geocodeOutput.disclaimer || '',
                zoneCode: geocodeOutput.floodZone.zoneCode || null,
                address: geocodeOutput.address || '',
              });
            }
          }
        }
      });
    });
  }, [messages, dataCallback, floodInfoCallback]);

  const examplePrompts = [
    'Show me FEMA flood information for the Washington Monument',
    'Am I in a flood zone at 100 Foundry St, Phoenixville, PA?',
    'Is 8 Church St, Charleston, SC 29401 in a flood risk area?',
    'Is the French Quarter in New Orleans in a flood zone?',
  ];

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
      <div className={`flex flex-row items-center mb-8 ${className || ''}`}>
        <Image
          src='/br_logo.png'
          alt='Blue Raster Logo'
          width={72}
          height={30}
          className='mr-8'
        />
        <div
          className='text-2xl font-mono text-white'
          style={{ fontFamily: 'monospace' }}
        >
          Am I In a Flood Zone?
        </div>
      </div>
      <div className='flex-1 flex flex-col w-full max-w-md mx-auto'>
        <div className='flex-1 overflow-y-auto mb-4'>
          {messageMapper(messages)}
        </div>

        {messages.length === 0 && input.trim() === '' && (
          <div className='mb-4'>
            <p className='text-sm text-white mb-2 font-semibold italic pl-2'>
              Select a prompt or click on the map to get started:{' '}
            </p>

            <div className='flex flex-wrap gap-2'>
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type='button'
                  onClick={() => {
                    dispatch(setInput(prompt));
                    sendMessage({ text: prompt });
                    dispatch(setInput(''));
                  }}
                  className='px-3 py-2 text-sm rounded-full border border-zinc-900/60
                             bg-zinc-900/60 hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-600/60 
                             transition text-gray-100/90'
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input });
            dispatch(setInput(''));
          }}
        >
          {status === 'streaming' && (
            <span className=' loading loading-xl loading-spinner text-accent'></span>
          )}
          <input
            className=' left-2 dark:bg-zinc-800/90  w-full max-w-md p-2 border 
            border-zinc-300 dark:border-zinc-800 rounded shadow-xl text-white/90  focus:ring-2 focus:ring-blue-500 '
            value={input}
            placeholder='Enter an address or ask a question...'
            onChange={(e) => dispatch(setInput(e.currentTarget.value))}
          />
        </form>
      </div>
      {children}
    </div>
  );
};

export default ChatInterface;
