import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const API_KEY = "e9eaa1f26ab89b729427e0d532d6a4c7";
  const [loading, setloading] = useState(false);
  const [location, setlocation] = useState("");
  const [search, setsearch] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");

  const handleSearch = (e) => {
    setsearch(e.target.value);
  };
  useEffect(() => {
    const getWeather = async () => {
      try {
        setloading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        console.log(data);
        setlocation(data.name);
        setWindSpeed(`${data.wind.speed} KPH`);
        setHumidity(data.main.humidity);
        setFeelsLike(data.main.feels_like);
        setTemp(data.main.temp);
        setWeather(data.weather[0].main);
        setloading(false);
      } catch (error) {
        console.log(error);
        setlocation("");
        setWindSpeed("");
        setHumidity("");
        setFeelsLike("");
        setTemp("");
        setWeather("");
        setloading(false);
      }
    };
    getWeather();
  }, [search]);

  return (
    <div className="container">
      <div className="section-1">
        <input
          type="text"
          placeholder="Enter location"
          value={search}
          onChange={handleSearch}
        />
        {loading && <p className="loading">Loading...</p>}
      </div>
      <div className="section-2">
        <div>
          <p className="city">{location}</p>
          <p className="temp">{temp}</p>
        </div>
        <p className="weather">{weather}</p>
      </div>
      <div className="section-3">
        <div>
          <p>{feelsLike}</p>
          <p>Feels Like</p>
        </div>
        <div>
          <p>{humidity}</p>
          <p>Humidity</p>
        </div>
        <div>
          <p>{windSpeed}</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export default App;
