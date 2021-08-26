import 'bootstrap/dist/css/bootstrap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import SearchBar from './Components/searchbar';


require('dotenv').config()

function App() {

  return (
    <div className="App container" >
      <h1>A Great Day for A Beer</h1>
      <hr></hr>
      <SearchBar />
    </div>
    

  );
}

export default App;
