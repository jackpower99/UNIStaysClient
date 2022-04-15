import React, { useMemo } from 'react'
import {useQuery} from "react-query";
import {
    GoogleMap,
    useLoadScript,
    Marker
  } from "@react-google-maps/api";

import { getAccomodationById } from '../../api/api';


export default function Map(props) {

const { mapStyle, accomodations, clickedAccomodationCallbackFunction } = props;

const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyBr79tHPtjDXaDwrmDnyAZzgjGfCJV273w", })

if(!isLoaded){
    return <div>Loading</div>
}
else{
    return <MapGoogle mapStyle={mapStyle} accomodations={accomodations} clickedAccomodationCallbackFunction={clickedAccomodationCallbackFunction} />
}

}

function MapGoogle(props){

    const { mapStyle, accomodations, clickedAccomodationCallbackFunction } = props;

    const [idClicked, setIdClicked] = React.useState("")
    const [getPropertyDetailsFlag, setGetPropertyDetailsFlag] = React.useState(false);
    const [markers, setMarkers] = React.useState([]);

    useQuery(
        ["getAccomodationById",idClicked],
        getAccomodationById,{
        onSuccess: (data)=>{
          console.log(data);
            clickedAccomodationCallbackFunction(data);
        },
        onError: (err) =>{
          console.log(err);
        },
          enabled: getPropertyDetailsFlag === true,
          cacheTime: 0
        }
      );

    const center = useMemo(()=> ({lat: 53.4 , lng: -7.9 }), []);

    const markerClicked = (id) => {
        setIdClicked(id);
        setGetPropertyDetailsFlag(true)
    }

    return( 
    <GoogleMap zoom={7.4} center={center} mapContainerStyle={mapStyle} >
{accomodations.map(acc =>  (
      <Marker
       key={acc._id}
       position={{lat: parseFloat(acc.lat.$numberDecimal), lng: parseFloat(acc.lng.$numberDecimal)}}
       onClick ={() => markerClicked(acc._id)}
        />
))}
</GoogleMap>
    )
}
