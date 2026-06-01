import { FloodZoneInfo, GeoJSONgeneric } from '@/app/types';
import { UIMessage } from 'ai';
import React, { SetStateAction } from 'react';

export interface ChatProps {
  children?: React.ReactNode;
  callback?: (messages: UIMessage[]) => void;
  // dataCallback?: (data: GeoJSONgeneric) => void;
  // dataTypeCallback?: React.Dispatch<SetStateAction<'list' | 'map' | ''>>;
  // floodInfoCallback?: (info: FloodZoneInfo | null) => void;
  // className?: string;
  // onReady?: (fn: (text: string) => void) => void;
}
