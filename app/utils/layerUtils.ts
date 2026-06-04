import { GeoJsonLayer, Layer, ScatterplotLayer } from "deck.gl";
import { MapViewState, Tile3DLayer } from "deck.gl";

export const createScatterplotLayer = (dataURL: string) => {
  console.log('createPoints', dataURL)
  //   id: 'ScatterplotLayer',
  // data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
  const layer = new ScatterplotLayer({
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

  return layer;
}

export const createGeoJSONLayer = (dataURL: string): Layer => {
  console.log('createGeoJSON', dataURL)

  return new GeoJsonLayer({
    id: 'mixed-geojson-layer',
    data: dataURL,
    // Style properties for Points (Scatterplot)
    pointType: 'circle',
    getFillColor: (d) => [50, 100, 200, 225],
    getPointRadius: 10000,
    // Style properties for Lines (Path)
    getLineColor: (d) => [150, 200, 250],
    getLineWidth: 2,
    // Style properties for Polygons
    getPolygonFillColor: (d: any) => [5, 50, 100, 150],
    extruded: false
  });

};
