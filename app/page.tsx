'use client';
import { useEffect, useState } from "react";
import Panel from "./components/Panel/Panel";
import ChatInterface from "./chat/components/ChatInterface";
import { DeckMap } from "./map/components/DeckMap";
import { useMapInfo } from "./map/hooks/mapHooks";
import { UIMessage } from "ai";
import { LayerInfo } from "./types";

export default function Home() {
  const [layerData, setLayerData] = useState<LayerInfo>({ layerURL: '', layerName: '', geometry: null });
  const { viewState, layer } = useMapInfo(layerData);
  useEffect(() => console.log('local', layerData), [layerData]);

  return (
    <div className="h-screen w-screen overflow-hidden relative  ">
      <Panel
        key='chatPanel'
        position='leftFull'
        className='w-xs sm:w-sm md:w-m lg:w-lg xl:w-xl 
          h-6/12 sm:h-6/12 md:h-9/12 lg:h-10/12 xl:h-10/12
          bg-gray-800/60 backdrop-blur-md border-4 border-gray-600/10 
          rounded-lg shadow-xl p-4 z-50 '
      >
        <ChatInterface callback={setLayerData} />
      </Panel>

      <DeckMap
        view_state={viewState}
        layers={layer ? [layer] : []}
      />
    </div>
  );
}
