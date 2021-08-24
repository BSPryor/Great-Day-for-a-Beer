import axios from "axios"
import { useState } from "react"
import BreweryList from "./brewery_list"
import RainyDay from "./rainyday"
import Weather from "./weather"

export default function SearchBar() {
  const [city, setCity] = useState('')
  const [breweries, setBreweries] = useState([])
  const [weather, setWeather] = useState({})

  const [isRainy, setIsRainy] = useState(false)
  const [isNice, setIsNice] = useState(false)
  const [haveWeather, setHaveWeather] = useState(false)

  function handleSearchClick() {
    setHaveWeather(false)
    setBreweries([])
    setWeather({})
    setIsNice(false)
    setIsRainy(false)

    axios.get(`https://api.openweathermap.org/data/2.5/weather`,{
      params: {
        q: city,
        appid: '1abc293a9c4ae9b968f6cc6d2a9785c9',
        units: 'imperial'
      }
    })
    .then( function (response) {
      setWeather(response.data)
      setHaveWeather(true)

      if (response.data.weather[0].main === "Clouds" || response.data.weather[0].main === "Clear") {
        setIsNice(true)
        handleBrewerySearch()
      } else {
        setIsRainy(true)
      }
    })
  } 

  function handleBrewerySearch() {
    axios.get(`https://api.openbrewerydb.org/breweries`,{
      params: {
        by_city: city,
      }
    })
    .then(function(response) {
      setBreweries(response.data)
      setCity('')
    })
  }
  
  return (
    <div>
      <div className='col-md-6 offset-md-3'> 
        <div className='input-group'>
          <input type='text' id='query' className='form-control' placeholder='Enter City' onChange={(e) => setCity(e.target.value)}></input>      
          <button className='button btn btn-primary' onClick={handleSearchClick}>Search</button>
        </div>
       { haveWeather && <Weather weather={weather} />} 
      </div>
      <div className="col-md-6 offset-md-3">      
      { isNice && <BreweryList breweries={breweries}/>}
      { isRainy && <RainyDay />}
      
      </div>
    </div>   
  )
}