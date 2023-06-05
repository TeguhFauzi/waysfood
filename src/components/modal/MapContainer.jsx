import MapsPicker from './MapsPicker';

const MapContainer = () => {
  return (
    <div className="absolute">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-40"></div>
      <div className="fixed z-50 ">
        <MapsPicker token={'pk.eyJ1IjoiYXpteWUiLCJhIjoiY2xoZWJrOWx6MHZlNzNrcDQ1dXN4ZXZiZiJ9.NIxzs5-FM3S_r3U8-yzSEg'} />
      </div>
    </div>
  );
};

export default MapContainer;
