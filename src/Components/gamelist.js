function GamesList({games}) {
  function renderGames() {
      return games
      .slice(0,10)
      .map((game) => {
        return (
        <tr key={game.id}> 
          <td>{game.title}</td> 
          <td><a href={game.game_url} alt='game url' target='_blank' rel="noreferrer" className="a-rainy">{game.game_url} </a></td>
          <td>{game.short_description}</td>
          <td><img src={game.thumbnail} alt='game' /></td>
        </tr>
        )
      })
    }

  return (
    <table className="table table-bordered rainy-table">
      <thead className="thead-dark">
        <tr >
          <th >Title</th>
          <th >Link</th>
          <th >Description</th>
          <th >Image</th>
        </tr>
      </thead>
      <tbody>
        {renderGames()}
      </tbody>
    </table>
  )
}

export default GamesList