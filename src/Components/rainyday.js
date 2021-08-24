const RainyDay = function ({weather}) {
  if (weather.weather[0].main=== "Clouds" || weather.weather[0].main=== "Clear") {
    return null
  }
    return (
      <div>YOUR WEATHER IS CRAP</div>
    )
  }


export default RainyDay;