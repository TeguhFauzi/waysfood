import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

//MapBox Default Styles
const MapboxStreets = 'mapbox://styles/mapbox/streets-v11';
const MapboxOutDoor = 'mapbox://styles/mapbox/outdoors-v11';
const MapboxLight = 'mapbox://styles/mapbox/light-v10';
const MapboxDark = 'mapbox://styles/mapbox/dark-v10';
const MapboxSatellite = 'mapbox://styles/mapbox/satellite-v9';
const MapboxSatelliteStreet = 'mapbox://styles/mapbox/satellite-streets-v11';
const MapboxNavigationDay = 'mapbox://styles/mapbox/navigation-day-v1';
const MapboxNavigationNight = 'mapbox://styles/mapbox/navigation-night-v1';

//MapBox Custom styles
const Custom1 = 'mapbox://styles/examples/cke97f49z5rlg19l310b7uu7j';
const Custom2 = 'mapbox://styles/surajfc/ckq0jexlc0h4418k00g3y1ora/draft';

const MapsPicker = ({ token }) => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 18.5204,
    longitude: 73.8567,
    zoom: 8,
  });

  return <ReactMapGL {...viewport} mapboxApiAccessToken={token} onViewportChange={(nextViewport) => setViewport(nextViewport)} mapStyle={Custom1} />;
};

export default MapsPicker;
