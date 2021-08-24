function GamesList({games}) {
  function renderGames() {
      return games
      .slice(0,10)
      .map((game) => {
        return (
        <tr key={game.id}> 
          <td>{game.title}</td> 
          <td><a href={game.game_url} alt='game url' target='_blank' rel="noreferrer">{game.game_url} </a></td>
          <td>{game.short_description}</td>
          <td><img src={game.thumbnail} alt='game' /></td>
        </tr>
        )
      })
    }

  return (
    <table className="table table-striped table-bordered">
      <tr className="thead-dark">
        <th >Title</th>
        <th >Link</th>
        <th >Description</th>
        <th >Image</th>
      </tr>
      {renderGames()}
    </table>
  )
}

export default GamesList