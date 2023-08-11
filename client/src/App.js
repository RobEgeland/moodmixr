import logo from './logo.svg';
import './App.css';
import Authorize from './Components/Authorize';

function App() {
  return (
    <div className="App">
      <h1 className='text-center text-4xl font-body mt-5 -z-10'>MoodMixr</h1>
      <Authorize/>
    </div>
  );
}

export default App;
