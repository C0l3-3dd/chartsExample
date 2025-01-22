import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";

const CountriesCharts = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error("Erroral optener la informaciongit ", error);
      }
    };
    fetchCountries();
  }, []);

  // Manejar los filtros
  const handleFilterChange = (region) => {
    setRegionFilter(region);
    setFilteredCountries(
      region ? countries.filter((country) => country.region === region) : countries
    );
  };

  return (
    <div>
      <h2>Gráficas de Países</h2>
      
      <label htmlFor="region">Filtrar por Región:</label>
      <select id="region" onChange={(e) => handleFilterChange(e.target.value)}>
        <option value="">Todas</option>
        <option value="Africa">África</option>
        <option value="Americas">América</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceanía</option>
      </select>

      <h3>Distribución de Población</h3>
      <BarChart width={800} height={400} data={filteredCountries.slice(0, 10)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name.common" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="population" fill="#8884d8" />
      </BarChart>

      <h3>Porcentaje de Superficie</h3>
      <PieChart width={800} height={400}>
        <Pie
          data={filteredCountries.slice(0, 10)}
          dataKey="area"
          nameKey="name.common"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#82ca9d"
          label
        />
        <Tooltip />
      </PieChart>

      <h3>Áreas de Países</h3>
      <LineChart width={800} height={400} data={filteredCountries.slice(0, 10)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name.common" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="area" stroke="#8884d8" />
      </LineChart>

      <h3>Comparativa de Idiomas</h3>
      <RadarChart outerRadius={90} width={800} height={400} data={filteredCountries.slice(0, 10)}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name.common" />
        <PolarRadiusAxis />
        <Radar name="Idiomas" dataKey="languages.length" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Tooltip />
      </RadarChart>
    </div>
  );
};

export default CountriesCharts;
