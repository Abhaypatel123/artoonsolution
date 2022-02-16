import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import FunctionComp from './FunctionComp';

// home for class component 
// functionalcomp is created task in functional component
function App() {
  return (
    <div className="App">
        <Home />
        {/* <FunctionComp /> */}
    </div>
  );
}

export default App;
