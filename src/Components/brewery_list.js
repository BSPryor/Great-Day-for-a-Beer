import { useEffect, useState } from 'react';
import BreweryMap from './map';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';


const BreweryList = function ({breweries, coords}) {
  const [forecast, setForecast] = useState({dt_txt: '0'})
  const [isHot, setIsHot] = useState(false)
  
  useEffect (() => {
    document.body.className += "sunny"
    
  }, [])

  function getForecast() {
    axios.get('https://api.openweathermap.org/data/2.5/forecast?' , {
      params: {
        lat: coords.lat,
        lon: coords.lon,
        appid: process.env.REACT_APP_WEATHER_KEY,
        units: 'imperial'
      }
    })
    .then(function(response){       
      const goodTime = response.data.list
        .filter(w => w.main.temp < 85)
        .find(w => w.dt_txt[11] !== '0');
      setForecast(goodTime);
    })
  }
 
  const list = function() {
    return breweries
    .filter(brewery => brewery.brewery_type !== 'planning' && brewery.brewery_type !== 'contract')
    .map((brewery) => {
      return (
      <tr key={brewery.id}> 
        <td>{brewery.name}</td> 
        <td><a href={brewery.website_url} alt='brewery url' target='_blank' rel="noreferrer" className="a-sunny">{brewery.website_url}  </a></td>
      </tr>
      )
    })
  } 
  
  function tooHotClick() {
    getForecast() 
    setIsHot(true)   
  }
  
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={tooHotClick}>It's too hot!</button>
      <br></br>
      { isHot && <h2>It will be cooler at <Moment unix format="h:mm a" tz="America/New_York" >{forecast.dt}</Moment></h2>}
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr >
            <th scope="col">Brewery</th>
            <th scope="col">Website</th>
          </tr>
        </thead>
        
        <tbody>
        {list()}
        </tbody>
      </table>
      
      <BreweryMap breweries={breweries} coords={coords}/>
    </div>   
    
  )
  
}

export default BreweryList