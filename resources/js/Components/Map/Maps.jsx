import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MyMap extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     markers: [],
   };
 }

 handleMapClick = (mapProps, map, clickEvent) => {
  const { latLng } = clickEvent;
  const lat = latLng.lat();
  const lng = latLng.lng();
  
  // Solo permite un marcador
  this.setState({
    markers: [{ lat, lng }],
  });

  // Llama a la función que se encarga de enviar las coordenadas a la otra clase
  this.props.onCoordinateChange({ lat, lng });
};

 render() {
   const { markers } = this.state;
   return (
     <Map
       google={this.props.google}
       onClick={this.handleMapClick}
       zoom={16}
       style={{
        height: "180px",
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: "5px",
        marginBottom: "20px"
      }}
      containerStyle={{
        height: "180px",
        width: "42%"
      }}
       initialCenter={{ lat: 4.2064090536419805, lng: -75.79095993096395 }}
     >
       {markers.map((marker, index) => (
         <Marker key={index} position={marker} />
       ))}
     </Map>
   );
 }
}

const apiKey = 'AIzaSyCPETmShIY1_-8WP0veLfpCsW_uGxFKzhA';

export default GoogleApiWrapper({apiKey,})(MyMap);