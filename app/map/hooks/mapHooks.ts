import { MapViewState } from "deck.gl";

export function useMapInfo(): { viewState: MapViewState } {

  const viewState: MapViewState = {
    longitude: -85.55,
    latitude: 42.30,
    zoom: 12,
    pitch: 30,
    bearing: 0,
  };

  return { viewState }
}
