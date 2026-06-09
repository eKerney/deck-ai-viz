import DeckGL, { Layer, MapViewState } from 'deck.gl';
import { useMemo } from 'react';
import { Map, FullscreenControl } from 'react-map-gl/maplibre';

export const DeckMap = ({ view_state, layers }: {
  view_state: MapViewState,
  layers: Layer[],
}) => {
  const memoizedLayers = useMemo(() => [...layers], [layers]);

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
        <FullscreenControl />
      </Map>
    </DeckGL >
  )
};
