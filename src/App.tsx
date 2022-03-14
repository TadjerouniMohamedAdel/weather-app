import { LatLngExpression } from 'leaflet';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Searchbox from './components/SearchBox/Searchbox';

const App: React.FC = () => {
  const [position, setPosition] = React.useState<LatLngExpression>([
    36.7449, 3.0289,
  ]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (val) => {
          console.log(val);
          setPosition([val.coords.latitude, val.coords.longitude]);
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 4000, maximumAge: 0 }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  React.useEffect(() => {
    getCurrentLocation();
  }, []);

  React.useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <div className="App">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup <br /> Easily customizable.
          </Popup>
        </Marker>

        <Searchbox type="text" placeholder="Search for a location" />
      </MapContainer>
    </div>
  );
};

export default App;
