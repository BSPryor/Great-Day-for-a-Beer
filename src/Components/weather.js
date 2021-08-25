const Weather = function ({weather}) {
  const iconURL = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <div className='weather card offset-md-3'>
      <img className="card-img-top" id="icon" src={iconURL} alt=''/>
      <div className='card-body'>
        <h2 className="card-title">{weather.name}</h2>
        <h3 className="card-text">{Math.round(weather.main.temp)}&deg;F</h3>
      </div>
    </div>
  )
  
}

export default Weather