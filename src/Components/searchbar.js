import axios from "axios"
import { useState } from "react"
import BreweryList from "./brewery_list"

export default function SearchBar(props) {
  const [city, setCity] = useState('')
  const [breweries, setBreweries] = useState([])
  
  function handleSearchClick() {
    setBreweries([])
    axios.get(`https://api.openweathermap.org/data/2.5/weather`,{
      params: {
        q: city,
        appid: '1abc293a9c4ae9b968f6cc6d2a9785c9',
        units: 'imperial'
      }
    })
    .then( function (response) {
      if (response.data.weather[0].main === "Clouds" || response.data.weather[0].main === "Clear") {
        handleBrewerySearch();
      } else {
        console.log('Sorry your weather sucks')
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
      </div>
      <BreweryList breweries={breweries}/>
    </div>
   
  )
}