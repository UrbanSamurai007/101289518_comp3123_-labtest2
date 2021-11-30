import React, { useState } from 'react';
import './App.css';

const api = {
  key: 'a2f79a5180f38a79b8e0f47b5167f69d',
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {

    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&unit=metic&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('');
          console.log(result);
        });
    }
  }

  const buildDate = (d) => {
    let months = ["Janury", "Febuary", "March", "April",
  "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun.", "Mon.", "Tues.", "Wed.",
  "Thurs.", "Fri.", "Sat."];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date} ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 293.15) ? 'app sun' : 'app') : 'app' }>
      <main>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="search..." 
              onChange={e => setCity(e.target.value)}
              value={city}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
          <div>
            <div className="weather-box">
              <div className="location-box">
                <div className="loc">{weather.name}, {weather.sys.country}</div>
                <div className="date">{buildDate(new Date())}</div>
              </div>
              
              <img className="icon" src={"https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"} />
                <div className="temp">{Math.round(weather.main.temp - 273.15)}°C</div>
                <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
          ): ('')}
      </main>
    </div>
  );
}

export default App;
