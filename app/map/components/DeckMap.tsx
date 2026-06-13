'use client';
import { Layer, MapViewState } from 'deck.gl';
// import { useMemo } from 'react';
import { Map } from 'react-map-gl/maplibre';
import { ZoomWidget, CompassWidget, DeckGL, FullscreenWidget, LoadingWidget } from '@deck.gl/react';
import '@deck.gl/widgets/stylesheet.css';
// import 'maplibre-gl/dist/maplibre-gl.css';


const DeckMap = ({ view_state, layers }: {
  view_state: MapViewState,
  layers: Layer[],
}) => {
  // const memoizedLayers = useMemo(() => [...layers], [layers]);

  const MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;
  const basemaps = {
    dark_backdrop: '019ead52-d6ec-7429-8057-c0a78ba858f1',
    dark_color: '019cafff-3e33-7b71-99dc-1e5d9791e00d'
  };
  const mapURL = `https://api.maptiler.com/maps/${basemaps.dark_backdrop}/style.json?key=`;
  return (
    <DeckGL
      initialViewState={view_state}
      controller
      layers={[...layers]}
    >
      <Map
        style={{ width: '100vw', height: '100vh' }}
        mapStyle={mapURL + MAP_KEY}
      >
      </Map>
      <LoadingWidget placement="top-right" />
      <FullscreenWidget placement="top-right" />
      <ZoomWidget placement='top-right' />
      <CompassWidget placement="top-right" />

    </DeckGL >
  )
};

export default DeckMap;
