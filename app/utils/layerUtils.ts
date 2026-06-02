import { ScatterplotLayer } from "deck.gl";
import { MapViewState, Tile3DLayer } from "deck.gl";

export const createScatterplotLayer = (dataURL: string) => {
  console.log('createPoints', dataURL)
  //   id: 'ScatterplotLayer',
  // data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',

  const pointLayer = new ScatterplotLayer({
    id: 'scatter-layer',
    data: dataURL,
    getPosition: (d) => [d.longitude, d.latitude],
    getRadius: 20,
    getLineColor: [255, 255, 255],
    getLineWidth: 1,
    stroked: true,
    pickable: true,
    getFillColor: (d) => [(40 + (d.certainty * 100)), (120 + (d.certainty * 100)), 200 - (d.certainty * 100)],
    autoHighlight: true,
    highlightColor: [0, 255, 208],
    opacity: 0.9
  })

  return pointLayer;
}
