import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("Puebla");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [cities, setCities] = useState(["Veracruz", "Monterrey", "Yucatan", "Mexico","Puebla"]);

  const apiKey = "c81c9f31326e19c7bd6de1f13c32b858"; 

  // Consulta timepo actual
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          cities.map((city) =>
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            )
          )
        );
        const data = responses.map((res) => res.data);
        setWeatherData(data);
      } catch (error) {
        console.error("Error en la consulta", error);
      }
    };

    fetchWeather();
  }, [cities]);

  // Consulta 5 dias de pronostico 
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );
        setForecastData(response.data.list);
      } catch (error) {
        console.error("Error en la consulta", error);
      }
    };

    fetchForecast();
  }, [city]);

  if (!weatherData || !forecastData) return <div>Opteniedno informacion...</div>;


  const barData = weatherData.map((data) => ({
    city: data.name,
    minTemp: data.main.temp_min,
    maxTemp: data.main.temp_max,
  }));

  const pieData = weatherData.map((data) => ({
    name: data.name,
    value: data.main.humidity,
  }));

  const lineData = forecastData.map((entry) => ({
    time: entry.dt_txt,
    temp: entry.main.temp,
  }));

  const radarData = weatherData.map((data) => ({
    city: data.name,
    windSpeed: data.wind.speed,
  }));

  return (
    <div>
      <h1>Clima</h1>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <label htmlFor="city-select">Pronostico por ciudad para: </label>
        <select
          id="city-select"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2>Min/Max Temperaturas por Ciudad</h2>
        <BarChart width={600} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="minTemp" fill="#8884d8" name="Min Temp" />
          <Bar dataKey="maxTemp" fill="#82ca9d" name="Max Temp" />
        </BarChart>
      </div>

      <div>
        <h2>Distribución de HUmedad</h2>
        <PieChart width={600} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>

      <div>
        <h2>Pronostico de la temperatura para {city}</h2>
        <LineChart width={600} height={300} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" name="Temperature" />
        </LineChart>
      </div>

      <div>
        <h2>Velocidad del viento por ciudad</h2>
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="city" />
          <PolarRadiusAxis />
          <Radar
            name="Wind Speed"
            dataKey="windSpeed"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </div>
    </div>
  );
};

export default WeatherApp;
