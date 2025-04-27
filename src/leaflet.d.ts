import 'leaflet';
import 'leaflet.heat';

declare module 'leaflet' {
  function heatLayer(latlngs: any[], options?: any): any;
}