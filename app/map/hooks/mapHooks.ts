import { LayerInfo, LayerViz } from "@/app/types";
import { createGeoJSONLayer, createScatterplotLayer } from "@/app/utils/layerUtils";
import { Layer, MapViewState } from "deck.gl";

export function useMapInfo(layerInfo: LayerInfo, layerViz: LayerViz): { viewState: MapViewState, layer: Layer | null } {
  const viewState: MapViewState = {
    longitude: -85.55,
    latitude: 42.30,
    zoom: 12,
    pitch: 30,
    bearing: 0,
  };

  let layer: Layer | null = null;
  if (!layerInfo.layerURL) return { viewState, layer: null };
  switch (layerInfo.geometry) {
    case 'point':
      layer = createGeoJSONLayer(layerInfo.layerURL, layerViz);
      break;
    case 'polygon':
      layer = createGeoJSONLayer(layerInfo.layerURL, layerViz);
      break;
    case 'line':
      layer = createGeoJSONLayer(layerInfo.layerURL, layerViz);
      break;
    case null:
      break;
    default:
      break;
  }

  return { viewState, layer }
}
