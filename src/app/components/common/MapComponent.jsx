import {
   withScriptjs,
   withGoogleMap,
   GoogleMap,
   Marker,
} from "react-google-maps";
import { compose, withProps } from "recompose";

const MapComponent = compose(
   withProps({
      googleMapURL:
         "https://maps.googleapis.com/maps/api/js?key=AIzaSyDPPWie-9jl4E5z_mV5Tn6O9p3ssppaNGY&callback=initMap",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
   }),
   withScriptjs,
   withGoogleMap
)((props) => (
   <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
         <Marker
            position={{ lat: -34.397, lng: 150.644 }}
            onClick={props.onMarkerClick}
         />
      )}
   </GoogleMap>
));

export default MapComponent;
