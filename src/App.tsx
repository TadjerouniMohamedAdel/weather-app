// import { LatLngExpression } from 'leaflet';
import React from 'react';
import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const App: React.FC = () => {
  const [position, setPosition] = React.useState<LatLngExpression>([
    36.7449, 3.0289,
  ]);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (val) => {
          setPosition([val.coords.latitude, val.coords.longitude]);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="App">
      <MapContainer
        center={[36.7312717, 3.0876783]}
        zoom={13}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
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
};

export default App;
