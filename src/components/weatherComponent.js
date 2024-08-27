// import Image from 'next/image';
import { useState } from 'react';
// import Layout from './Layout';

const apiKey = 'c4217795df54b13343c33dc69b65d78f';

export default function WeatherComponent() {
  const [location, setLocation] = useState('');
  const [userName, setUserName] = useState('');
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      const weatherData = await response.json();

      if (weatherData.cod !== 200) {
        throw new Error('Location not found. Please try again.');
      }

      const weatherInfo = {
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        temperature: `${weatherData.main.temp}°C`,
        description: weatherData.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      };

      setWeatherDetails(weatherInfo);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeatherDetails(null);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <form
        onSubmit={getWeather}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-blue-400 to-green-400 text-white font-semibold rounded-lg hover:bg-green-500 transition duration-300"
        >
          Get Weather
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {weatherDetails && (
        <div className="mt-8 p-6  bg-white rounded-lg shadow-md text-center space-y-4">
          <h3 className="text-xl font-bold">Hello, {userName}!</h3>
          <p className="text-lg">Location: {weatherDetails.location}</p>
          <p className="text-lg">Temperature: {weatherDetails.temperature}</p>
          <p className="text-lg">Weather: {weatherDetails.description}</p>
          <div className="flex justify-center">
            <img
              src={weatherDetails.icon}
              alt="Weather Icon"
              width={100}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
