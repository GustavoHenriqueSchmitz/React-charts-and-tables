import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Table } from './components/Table';
import { Principal } from './components/principal/principal';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Principal/>}/>
          <Route exact path="/tabela" element={<Table/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
