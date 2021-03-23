import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';

const icons = {
  xxSmall: divIcon({className: 'marker-icon pink', iconSize: [6, 6]}),
  xSmall: divIcon({className: 'marker-icon pink', iconSize: [8, 8]}),
  small: divIcon({className: 'marker-icon pink', iconSize: [12, 12]}),
  normal: divIcon({className: 'marker-icon purple', iconSize: [16, 16]}),
large: divIcon({className: 'marker-icon purple', iconSize: [24, 24]}),
xLarge: divIcon({className: 'marker-icon red', iconSize: [36, 36]}),
xxLarge: divIcon({className: 'marker-icon red', iconSize: [48, 48]})
};

function MapView(props) {
  const {locationArray} = props;
  const markerElements = locationArray.map(location =>{
    const{
      id,country_code,
      country, province,
      coordinates:{latitude, longitude},
      latest:{confirmed}
    } = location;

    let markerIcon = icons.xxSmall;
    if (confirmed >= 101 && confirmed <= 500) {
        markerIcon = icons.xSmall;
    }
    else if (confirmed >= 501 && confirmed <= 1000) {
        markerIcon = icons.small;
    }
    else if (confirmed >= 1001 && confirmed <= 5000) {
        markerIcon = icons.normal;
    }
    else if (confirmed >= 5001 && confirmed <= 10000) {
        markerIcon = icons.large;
    }
    else if (confirmed >= 10001 && confirmed <= 50000) {
        markerIcon = icons.xLarge;
    }
    else if (confirmed >= 50001) {
        markerIcon = icons.xxLarge;
    }

    let title = country;
    if (province !== '' && province !== country) {
        title = `${province}, ${country}`;
    }


    return(
      <Marker key={`${id}-${country_code}`} position={[latitude, longitude]} icon={markerIcon}>
        <Popup>{title}</Popup>
      </Marker>
    )
  })
  return (
<MapContainer
  className="map-view"
  center={[51.0, 19.0]}
  zoom={4}
  maxZoom={18}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
  {markerElements}
</MapContainer>
  );
}

export default MapView;
