export type LayerGeometry = 'point' | 'line' | 'polygon' | null;

export interface LayerInfo {
  layerURL: string,
  layerName: string,
  geometry: LayerGeometry
};
