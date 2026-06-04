export type LayerGeometry = 'point' | 'line' | 'polygon' | null;

export interface LayerInfo {
  layerURL: string,
  layerName: string,
  geometry: LayerGeometry
};

export interface LayerViz {
  pointType?: string,
  pointFillColor?: [number, number, number, number],
  pointRadius?: 10000,
  lineColor?: [number, number, number, number],
  lineWidth?: 10000,
  fillColor?: [number, number, number, number],
  extruded?: boolean,
}
