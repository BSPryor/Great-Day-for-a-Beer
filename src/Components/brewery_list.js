
const BreweryList = function ({breweries}) {

  const list = function() {
    return breweries
    .filter(brewery => brewery.brewery_type !== 'brewpub')
    .map((brewery) => {
      return <li key={brewery.id}> {brewery.name} <a href={brewery.website_url} alt='brewery url' target='_blank' rel="noreferrer">{brewery.website_url} </a></li>;
    })
  } 

  return (
    <div className='row'>
      <ul>
        {list()}
      </ul>
    </div>
  )
  
}

export default BreweryList