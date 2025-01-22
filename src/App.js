import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CountriesCharts from "./components/CountriesCharts";
import WeatherCharts from "./components/WeatherCharts";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/countries">Gráficas de Países</Link>
          </li>
          <li>
            <Link to="/Weather">Gráficas de Clima</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/countries" element={<CountriesCharts />} />
        <Route path="/Weather" element={<WeatherCharts />} />
      </Routes>
    </Router>
  );
}

export default App;
