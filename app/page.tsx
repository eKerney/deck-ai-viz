'use client';
import { Layer, MapViewState, } from "deck.gl";
import { useEffect, useState } from "react";
import { DeckMap } from "./components/DeckMap";
import Panel from "./components/Panel/Panel";
import ChatInterface from "./components/ChatInterface/ChatInterface";

export default function Home() {

  const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -85.55,
    latitude: 42.30,
    zoom: 12,
    pitch: 30,
    bearing: 0,
  };
  const [initialViewState, setInitialViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);
  const [chatMessages, setChatMessages] = useState<Array<string>>([]);
  // const { features, loading, error } = useOvertureData(overtureParams);
  // run once on init
  // const { data } = useOvertureCategories();

  return (
    <div className="h-screen w-screen overflow-hidden relative  ">
      <Panel
        key='chatPanel'
        position='leftFull'
        className='w-xs sm:w-sm md:w-m lg:w-lg xl:w-xl 
          h-6/12 sm:h-6/12 md:h-9/12 lg:h-10/12 xl:h-10/12
          bg-gray-800/60 backdrop-blur-md border-4 border-gray-600/10 
          rounded-lg shadow-xl p-4 z-50 '
        messages={chatMessages}
      >
        <ChatInterface
          callback={setChatMessages}
        />
      </Panel>
      <DeckMap
        view_state={initialViewState}
        layers={[]}
      />
    </div>
  );
}
// dataCallback={setMapData}
// dataTypeCallback={setOutputType}
// floodInfoCallback={setFloodInfo}
// onReady={(fn) => {
//   triggerRef.current = fn;
// }}
