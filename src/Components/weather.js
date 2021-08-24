const Weather = function ({weather}) {
  if (!weather.id) {
    return null
  }

  if (weather.weather[0].icon) {
    const iconURL = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

    return (
      <div className='weather card'>
        <img className="card-img-top" id="icon" src={iconURL} alt=''/>
        <div className='card-body'>
          <h2 className="card-title">{weather.name}</h2>
          <h3 className="card-text">{Math.round(weather.main.temp)}&deg;F</h3>
        </div>
      </div>
    )
  }
 
}

export default Weather