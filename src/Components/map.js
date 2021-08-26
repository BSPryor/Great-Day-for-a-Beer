import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'

const BreweryMap = ( {breweries, coords} ) => {
  const [viewport, setViewport] = useState({
    latitude: coords.lat,
    longitude: coords.lon,
    width: "50vw",
    height: "50vh",
    zoom: 10
  })

  const[selectedBrewery, setSelectedBrewery] = useState(null);

  return(
    <div>
      <ReactMapGL
        {...viewport}        
        mapStyle={'mapbox://styles/mapbox/basic-v9'}
        mapboxApiAccessToken= {process.env.REACT_APP_MAPBOX_KEY}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        
      >
        {breweries
        .filter(brewery => brewery.longitude !== null)
        .map(brewery => (
          <Marker key={brewery.id} latitude={parseFloat(brewery.latitude)} longitude={parseFloat(brewery.longitude)}>
            <button
              className="marker-btn"
              onClick={e=> {
                e.preventDefault();
                setSelectedBrewery(brewery);
              }}
              >
              <FontAwesomeIcon icon={faBeer}/>
            </button>
          </Marker>
        ))}

        {selectedBrewery ? (
          <Popup
            latitude={parseFloat(selectedBrewery.latitude)}
            longitude={parseFloat(selectedBrewery.longitude)}
            onClose={() => {
              setSelectedBrewery(null);
            }}
            className="popup"
          >
            <div>
              <h4>{selectedBrewery.name}</h4>
              <p>{selectedBrewery.street}</p>
              <p>{selectedBrewery.brewery_type}</p>
              <a href={selectedBrewery.website_url} alt='brewery url' target='_blank' rel="noreferrer">{selectedBrewery.website_url}</a>
            </div>
          </Popup>
          ) : null}
      </ReactMapGL>

    </div>

  )
}

export default BreweryMap
