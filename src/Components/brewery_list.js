
const BreweryList = function ({breweries}) {
  const list = function() {
    return breweries
    .filter(brewery => brewery.brewery_type !== 'brewpub' && brewery.brewery_type !== 'planning')
    .map((brewery) => {
      return (
      <tr key={brewery.id}> 
        <td>{brewery.name}</td> 
        <td><a href={brewery.website_url} alt='brewery url' target='_blank' rel="noreferrer">{brewery.website_url} </a></td>
      </tr>
      )
    })
  } 

  return (
    
      <table className="table table-striped table-bordered">
        <tr className="thead-light">
          <th scope="col">Brewery</th>
          <th scope="col">Website</th>
        </tr>
        <tbody>
        {list()}
        </tbody>
      </table>
        
      
    
  )
  
}

export default BreweryList