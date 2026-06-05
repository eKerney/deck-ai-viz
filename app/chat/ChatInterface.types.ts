import { LayerInfo, LayerViz } from '../types';
import React, { SetStateAction } from 'react';

export interface ChatProps {
  children?: React.ReactNode;
  layerCallback?: SetStateAction<React.Dispatch<LayerInfo>>;
  layerVizCallback?: SetStateAction<React.Dispatch<LayerViz>>;
  // status?: ChatStatus;
  // dataCallback?: (data: GeoJSONgeneric) => void;
  // dataTypeCallback?: React.Dispatch<SetStateAction<'list' | 'map' | ''>>;
  // floodInfoCallback?: (info: FloodZoneInfo | null) => void;
  // className?: string;
  // onReady?: (fn: (text: string) => void) => void;
}
