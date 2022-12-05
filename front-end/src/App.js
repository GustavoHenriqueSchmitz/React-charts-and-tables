import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Table } from './components/Table';
import { Principal } from './components/principal/principal';
import { Graphic } from './components/Graphic';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Principal/>}/>
          <Route exact path="/tabela" element={<Table/>}/>
          <Route exact path="/grafico" element={<Graphic/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
