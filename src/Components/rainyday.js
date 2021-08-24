import axios from "axios";
import { useState } from "react";
import GamesList from "./gamelist";

const RainyDay = function () {
  const [selection, setSelection] = useState('shooter')
  const [hasGames, setHasGames] = useState(false)
  const [games, setGames] = useState([])

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
        'x-rapidapi-key': 'f2872f2fddmsh8109582059b770dp1b689ejsn6ecf3bc1f0a8'
      }
    };

    function handleChange(e) {
      setSelection(e.target.value)
    }

    return (
      <div>
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
        <button type="button" value="Submit" onClick={handleClick} >Search for Games and Drinks!</button>
      </form>
      { hasGames && <GamesList games={games} />}
    </div>
      
    )
}
export default RainyDay;