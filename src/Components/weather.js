const Weather = function ({weather}) {
  if (!weather.id) {
    return null
  }

  if (weather.weather[0].icon) {
    const iconURL = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    return (
      <div className='weather'>
        <h2>{weather.name}</h2>
        <img src={iconURL} alt=''/>
        <h3>{weather.main.temp}</h3>
      </div>
    )
  }
 
}

export default Weather