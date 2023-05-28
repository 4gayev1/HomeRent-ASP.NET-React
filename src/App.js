
import './App.css';
import { Routes, Route } from "react-router-dom";
import Blok from './Views/Blok';
import Flat from './Views/Flat';
import Contract from './Views/Contract';
import Navbar from './Components/Navbar';


function App() {
  return (
    <div className="App">

      <Navbar/>
      <Routes>
        <Route path="/" element={<Blok />} />
        <Route path="/flat" element={<Flat />} />
        <Route path="/contract" element={<Contract />} />
        
      </Routes>
    </div>
  );
}

export default App;
