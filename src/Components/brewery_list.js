import { useEffect } from 'react';
import BreweryMap from './map';

const BreweryList = function ({breweries, coords}) {
  useEffect (() => {
    document.body.className += "sunny"
  }, [])
 
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

  return (
    <div>
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