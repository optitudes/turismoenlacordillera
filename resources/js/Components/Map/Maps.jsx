import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const center = {
 lat: 4.513485168350246,
 lng: -75.69575415741261
};

function MyMap({style,updatePositions}) {

  const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik"
  })

  const [markerPosition, setMarkerPosition] = React.useState(null);

  const [map, setMap] = React.useState(null)

  const updatePosition = React.useCallback((event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log({ lat, lng });
      setMarkerPosition({ lat, lng });
      updatePositions({lat,lng});
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
   setMap(null)
  }, [])

 return isLoaded ? (
    <GoogleMap
      mapContainerStyle={style}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onDblClick={updatePosition}
      >
        {markerPosition && (
            <Marker position={markerPosition} />
          )}
    <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MyMap)
