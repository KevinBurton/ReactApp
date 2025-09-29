import React from 'react';
import { useState, useEffect } from 'react';

function WeatherForecast({ data }) {
  function fahrenheit(celsius) {
    return (celsius * 9/5) + 32;
  }
  // This component will only render if 'data' is provided
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>C</th>
          <th>F</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {data && data.forecastDays && data.forecastDays.map((day, index) => (
          <tr key={index}>
            <td>{`${day.displayDate.month}/${day.displayDate.day}/${day.displayDate.year}`}</td>
            <td>{day.maxTemperature.degrees.toFixed(1)}</td>
            <td>{fahrenheit(day.maxTemperature.degrees).toFixed(1)}</td>
            <td>{day.daytimeForecast.weatherCondition.description.text}</td>
          </tr>))} 
      </tbody>
    </table>
  );
}
function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState('Madison, WI');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationUrl = `${process.env.REACT_APP_LOCATION_BASE_URL}?address=${selectedCity}&key=${process.env.REACT_APP_LOCATION_API_KEY}`;
                const cityLatLngFetch = await fetch(locationUrl);
                const cityLatLng = await cityLatLngFetch.json();

                const forecastUrl = `${process.env.REACT_APP_WEATHER_BASE_URL}?key=${process.env.REACT_APP_WEATHER_API_KEY}&location.latitude=${cityLatLng.results[0].geometry.location.lat}&location.longitude=${cityLatLng.results[0].geometry.location.lng}&days=4`;
                const forecastFetch = await fetch(forecastUrl);
                const cityWeatherData = await forecastFetch.json();
                setWeatherData(cityWeatherData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedCity]);
    const handleChange = (event) => {
      const city = event.target.value;
      if(city === '') return;
      setSelectedCity(city)
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if(error) {
        return <div>Error: {error.message}</div>;
    }

  return (
    <div>
      <h1>Weather Page</h1>
      <p>This is the weather page of the application.</p>
      <label htmlFor="forecastcity">Choose a city:</label>
      <select name="forecastcity" id="forecastcity" value={selectedCity} onChange={handleChange}>
        <option value="Madison, WI">Madison</option>
        <option value="Seattle">Seattle</option>
        <option value="San Francisco">San Francisco</option>
        <option value="New York">New York</option>
        <option value="Chicago">Chicago</option>
        <option value="London">London</option>
        <option value="Paris">Paris</option>
      </select>
      <WeatherForecast data={weatherData} />
    </div>
  );
}
export default Weather;