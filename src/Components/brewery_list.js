
const BreweryList = function ({breweries}) {
  if (breweries.length === 0) {
    return null
  }
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
    <div className='row'>
      <table className="table table-striped">
        <tr className="thead-light">
          <th>Brewery</th>
          <th>Website</th>
        </tr>
        <tbody>
        {list()}
        </tbody>
      </table>
        
      
    </div>
  )
  
}

export default BreweryList