import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import clear from "../assets/clear.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import axios from "axios";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";

const Weather = () => {
  const [inputCity, setInputCity] = useState("Lahore");
  const [city, setCity] = useState("Karachi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState(cloud);
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
    "09d": drizzle,
    "09n": drizzle,
  };
  const API_KEY = "";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = response.data;
      console.log(data);
      setWeatherData(data);
      setImgSrc(allIcons[data.weather[0].icon] || cloud);

      setError("");
    } catch (error) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputCity);
  };

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  return (
    <div className="place-self-center bg-gradient-to-r from-blue-600 text-white to-cyan-600 shadow-zinc-700 tracking-wide p-[40px] rounded-3xl shadow-md flex items-center flex-col">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          value={inputCity}
          className="h-[50px] border-none outline-none rounded-3xl text-zinc-800 pl-[25px] font-[18px]"
        />
        <button
          type="submit"
          className="cursor-pointer bg-white text-black flex items-center justify-center h-[51px] w-[51px] rounded-full p-3"
        >
          <FiSearch className="text-black scale-[1.5] hover:scale-[1.75] transition-all duration-300" />
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {weatherData && (
        <>
          <img
            src={imgSrc}
            className="w-[150px] mb-[15px] mt-[30px] mx-0"
            alt=""
          />
          <p className="text-[60px] text-white leading-none">
            {weatherData.main.temp}°C
          </p>
          <p className="text-[30px] text-white">
            Feels Like: {weatherData.main.feels_like}°C
          </p>
          <p className="text-[35px] text-white">
            {weatherData.weather[0].description}
          </p>
          <p className="text-[22px] text-white">{weatherData.name}</p>
          <div className="text-white w-[100%] mt-[42px] flex justify-between">
            <div className="flex items-start gap-[12px] font-[22px]">
              <img src={humidity} alt="" className="w-[40px] h-8 mt-[10px]" />
              <div className="flex-col flex">
                <p>{weatherData.main.humidity}%</p>
                <span className="block text-[16px]">Humidity</span>
              </div>
            </div>
            <div className="flex gap-3">
              <img
                src={wind}
                alt=""
                className="top-0 w-[45px] h-10 mt-[10px]"
              />
              <div className="flex-col grid mt-1">
                <p>{weatherData.wind.speed} Km/h</p>
                <span className="block text-[16px]">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
