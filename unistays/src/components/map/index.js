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
    const role = JSON.parse(localStorage.getItem("userRole"));
    const [isLoading, setLoading] = React.useState(true);
    const [token, setToken ] = React.useState(localStorage.getItem("token"))

    useQuery(
        ["getAccomodationById",{idClicked: idClicked, token: token}],
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
        ["getFriends", {email: email, token: token}],
        getFriends,{
        onSuccess: (data)=>{
          var ids = [] 
          data?.studentsData?.forEach(student => {
            ids = [...ids, student._id]
          })
            setFriendsIds(ids)
        },
        onError: (err) =>{
          console.log(err);
        },
        enabled: role === "Student",
        refetchOnMount: role === "Student",
        cacheTime: 0,
        }
      );

      useQuery(
        ["getFriendsLocations", {friendsIds: friendsIds, token: token}],
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
          cacheTime: 0,
          retry: 2
        }
      );

      console.log(isLoading)

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
       icon={friendsCurrentLocationIds.includes(acc._id)?'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png': null }
        />
))}
</GoogleMap>
    )
}
