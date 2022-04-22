import React, { useMemo } from 'react'
import {useQuery} from "react-query";
import {
    GoogleMap,
    useLoadScript,
    Marker
  } from "@react-google-maps/api";

import { getAccomodationById, getFriends, getFriendsLocations } from '../../api/api';


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
    const [friendsIds, setFriendsIds] = React.useState([])
    const [friendsCurrentLocationIds, setFriendsCurrentLocationIds] = React.useState([])
    const email = JSON.parse(localStorage.getItem("userEmail"));
    const [isLoading, setLoading] = React.useState(true);

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

      useQuery(
        ["getFriends", email ],
        getFriends,{
        onSuccess: (data)=>{
          var ids = [] 
          data.studentsData.forEach(student => {
            ids = [...ids, student._id]
          })
            setFriendsIds(ids)
        },
        onError: (err) =>{
          console.log(err);
        },
        refetchOnMount: "always",
        cacheTime: 0
        }
      );

      useQuery(
        ["getFriendsLocations", friendsIds ],
        getFriendsLocations,{
        onSuccess: (data)=>{
          console.log(data)
            setFriendsCurrentLocationIds(data)
            setLoading(false);
        },
        onError: (err) =>{
          console.log(err);
          setLoading(false);
        },
          enabled: friendsIds.length > 0,
          cacheTime: 0
        }
      );

      console.log(isLoading)

    const center = useMemo(()=> ({lat: 53.4 , lng: -7.9 }), []);

    const markerClicked = (id) => {
        setIdClicked(id);
        setGetPropertyDetailsFlag(true)
    }

    // const mapIcon = (acc)=>{
    //   if(friendsCurrentLocationIds)
    // }

    return( 
    <GoogleMap zoom={7.4} center={center} mapContainerStyle={mapStyle} >
{accomodations.map(acc =>  (
      <Marker
       key={acc._id}
       position={{lat: parseFloat(acc.lat.$numberDecimal), lng: parseFloat(acc.lng.$numberDecimal)}}
       onClick ={() => markerClicked(acc._id)}
       icon={friendsCurrentLocationIds.includes(acc._id)?'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png': null }
        />
))}
</GoogleMap>
    )
}