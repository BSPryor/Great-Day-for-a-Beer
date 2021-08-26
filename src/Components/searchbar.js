import axios from "axios"
import { useState } from "react"
import BreweryList from "./brewery_list"
import RainyDay from "./rainyday"
import Weather from "./weather"


export default function SearchBar() {
  const [city, setCity] = useState('')
  const [breweries, setBreweries] = useState([])
  const [weather, setWeather] = useState({})
  const [coords, setCoords] = useState({})

  const [isRainy, setIsRainy] = useState(false)
  const [isNice, setIsNice] = useState(false)
  const [haveWeather, setHaveWeather] = useState(false)
  const [loadGeo, setLoadGeo] = useState(false)
  
 

  if (loadGeo) {
    handleSearchClick();
    setLoadGeo(false)
  }

  function handleSearchClick() {
    document.body.className = ''
    setHaveWeather(false)
    setBreweries([])
    setWeather({})
    setIsNice(false)
    setIsRainy(false)

    axios.get(`https://api.openweathermap.org/data/2.5/weather`,{
      params: {
        q: city,
        appid: process.env.REACT_APP_WEATHER_KEY,
        units: 'imperial'
      }
    })
    .then( function (response) {
      setWeather(response.data)
      setHaveWeather(true)
      setCoords({
        lat: response.data.coord.lat,
        lon: response.data.coord.lon
      })    
    const coordsUrl = `${response.data.coord.lat},${response.data.coord.lon}`  
     if (response.data.weather[0].main === "Clouds" || response.data.weather[0].main === "Clear") {
      setIsNice(true)
      handleBrewerySearch(coordsUrl)
    } else {
        setIsRainy(true)
    }
  })
    
  } 

  function handleBrewerySearch(coordsUrl) {
    
    axios.get(`https://api.openbrewerydb.org/breweries`,{
      params: {
        by_dist: coordsUrl
      }
    })
    .then(function(response) {
      setBreweries(response.data)
      setCity('')
    })
  }
  

  function handleGeolocate() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        axios.get('https://us1.locationiq.com/v1/reverse.php?', {
          params: {
            key : process.env.REACT_APP_LOCATION_KEY,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            format: 'json'
          }
        })
          .then((response) => {
            setCity(response.data.address.city)
            setLoadGeo(true)
          })
                   
     })
    }
  }
  


  return (
    <div>
      <div className='col-md-6 offset-md-3'> 
        <div className='input-group'>
          <input type='text' id='query' className='form-control' placeholder='Enter City' onChange={(e) => setCity(e.target.value)}></input>      
          <button className='button btn btn-primary' onClick={handleSearchClick}>Search</button>
          <button className='button btn btn-success' onClick={handleGeolocate}>Locate Me!</button>
        </div>
       { haveWeather && <Weather weather={weather} />} 
      </div>
      <div className="col-md-6 offset-md-3">      
      { isNice && <BreweryList breweries={breweries} coords={coords}/>}
      { isRainy && <RainyDay coords={coords}/>}
      
      </div>
    </div>   
  )
}