import axios from "axios";
import { useState, useEffect } from "react";
import GamesList from "./gamelist";
import Moment from "react-moment";
import 'moment-timezone'

const RainyDay = function ({coords}) {
  const [selection, setSelection] = useState('shooter')
  const [hasGames, setHasGames] = useState(false)
  const [games, setGames] = useState([])
  const [forecast, setForecast] = useState({dt_txt: '0'})


    useEffect(() => {      
      document.body.className += "rainy"
      getForecast();
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getForecast() {
      axios.get('https://api.openweathermap.org/data/2.5/forecast?' , {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          appid: process.env.REACT_APP_WEATHER_KEY
        }
      })
      .then(function(response){        
        const goodTime = response.data.list
          .filter(w => w.weather[0].main === 'Clear' || w.weather[0].main === "Clouds")
          .find(w => w.dt_txt[11] !== '0')
        setForecast(goodTime);
      })
    }

    function handleClick() {
      axios.request(getGames).then(function (response) {
        setGames(response.data);
        setHasGames(true);
      }).catch(function (error) {
        console.error(error);
      });
    }

    const getGames = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: {
        category: selection, 
        platform: 'browser',
      },
      headers: {
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_GAMES_KEY
      }
    };

    function handleChange(e) {
      setSelection(e.target.value)
    }
  
    return (
      <div className="rainy-table">
        <div className='next-clear'>
          <h2>The next time it will be clear to go to a brewery is <Moment unix format="h:mm a" tz="America/New_York" >{forecast.dt}</Moment> Eastern</h2>
        </div>
        <form>
          <label htmlFor="game-type">What kind of game do you want to play?  
            <select name="game-type" onChange={handleChange}>
            
              <option value="shooter">Shooter</option>
              <option value="strategy">Strategy</option>
              <option value="mmo">MMO</option>
              <option value="card">Card</option>
              <option value="action-rpg">Action RPG</option>
              <option value="fantasy">Fantasy</option>
                       
            </select>
          </label>
        <button type="button" value="Submit" onClick={handleClick} >Search for Games</button>
      </form>
      { hasGames && <GamesList games={games} />}
    </div>
      
    )
}
export default RainyDay;