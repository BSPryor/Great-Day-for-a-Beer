
const BreweryList = function ({breweries}) {

  const list = function() {
    return breweries.map((c) => {
      return <li key='c.id'>c.name</li>;
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