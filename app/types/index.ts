export type LayerGeometry = 'point' | 'line' | 'polygon' | null;

export interface LayerInfo {
  layerURL: string,
  layerName: string,
  geometry: LayerGeometry
};

export interface LayerViz {
  pointType?: string,
  pointFillColor?: [number, number, number, number],
  pointRadius?: number,
  lineColor?: [number, number, number, number],
  lineWidth?: number,
  fillColor?: [number, number, number, number],
  extruded?: boolean,
  extrudedElevation?: number
}
