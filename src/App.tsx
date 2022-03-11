// import { LatLngExpression } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const App: React.FC = () => (
  <div className="App">
    <MapContainer
      center={[505, -0.09]}
      zoom={13}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <div
        style={{ zIndex: 30000, position: 'absolute' }}
        className="weather-searbox"
      >
        <input type="text" placeholder="hello world" />
      </div>
    </MapContainer>
  </div>
);

export default App;
