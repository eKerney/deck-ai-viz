'use client';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';
import { useState } from 'react';
import { ChatProps } from './ChatInterface.types';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { inputSelector, setInput } from '@/app/store/chatSlice';

export default function ChatInterface(props: ChatProps) {
  // const { messages, sendMessage, status } = useChat({
  //   transport: new DefaultChatTransport({
  //     api: '/api/chat',
  //   }),
  // });
  // const [input, setInput] = useState('');
  const {
    children,
    callback,
  } = props;
  const input = useSelector(inputSelector);
  const dispatch = useDispatch();
  const { messages, sendMessage, status } = useChat();


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
      <div className={`flex flex-row items-center mb-8 $`}>
        <div
          className='text-2xl font-mono text-white'
          style={{ fontFamily: 'monospace' }}
        >
          Am I In a Simulation???
        </div>
      </div>
      <div className='flex-1 flex flex-col w-full max-w-md mx-auto'>
        <div className='flex-1 overflow-y-auto mb-4'>
          {messageMapper(messages)}
        </div>


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
}
