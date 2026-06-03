import { UIMessage } from 'ai';
// import React, { SetStateAction } from 'react';

export interface ChatProps {
  children?: React.ReactNode;
  callback?: (messages: UIMessage[]) => void;
  // messages?: UIMessage[];
  // sendMessage?: ;
  // status?: ChatStatus;
  // dataCallback?: (data: GeoJSONgeneric) => void;
  // dataTypeCallback?: React.Dispatch<SetStateAction<'list' | 'map' | ''>>;
  // floodInfoCallback?: (info: FloodZoneInfo | null) => void;
  // className?: string;
  // onReady?: (fn: (text: string) => void) => void;
}
