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
        className='w-xs sm:w-sm md:w-m lg:w-lg xl:w-lg 
        h-full
          bg-gray-800/30 backdrop-blur-sm   
           shadow-xl p-4 z-50 '
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
