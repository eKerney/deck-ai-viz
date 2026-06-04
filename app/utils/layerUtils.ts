import { GeoJsonLayer, Layer, ScatterplotLayer } from "deck.gl";
import { MapViewState, Tile3DLayer } from "deck.gl";
import { LayerViz } from "../types";

export const createScatterplotLayer = (dataURL: string) => {
  console.log('createScatterplotLayer', dataURL)
  return new ScatterplotLayer({
    id: 'scatter-layer',
    data: dataURL,
    getPosition: (d) => [d.longitude, d.latitude],
    getRadius: 20,
    getLineColor: [255, 255, 255],
    getLineWidth: 1,
    stroked: true,
    pickable: true,
    getFillColor: (d) => [(40 + (1 * 100)), (120 + (1 * 100)), 200 - (1 * 100)],
    autoHighlight: true,
    highlightColor: [0, 255, 208],
    opacity: 0.9
  })
}

export const createGeoJSONLayer = (
  dataURL: string,
  layerViz: LayerViz
): Layer => {
  const { polygonFillColor = [40, 173, 10, 150] } = layerViz;

  return new GeoJsonLayer({
    id: `geojson-xyz-layer`,
    data: dataURL,
    // Style properties for Points (Scatterplot)
    pointType: 'circle',
    getFillColor: polygonFillColor,
    getPointRadius: 10000,
    // Style properties for Lines (Path)
    getLineColor: (d: any) => [200, 200, 200, 200],
    getLineWidth: 5000,
    // Style properties for Polygons
    // getPolygonFillColor: (d: any) => polygonFillColor,
    extruded: false,
    updateTriggers: { getFillColor: [polygonFillColor] }
  });

};
