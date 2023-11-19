import React, { useState } from "react";
import './WeatherApp.css'

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import mist_icon from '../Assets/mist.png'

const WeatherApp = () => {
    const [city, setCity] = useState('pageBegin');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [windRate, setWindRate] = useState('');
    const [weather, setWeather] = useState('');

    const [wicon, setWicon] = useState('')


    const selectData = (data) => {
        if (data.cod === 200) {

            setHumidity(data.main.humidity + " %");
            setWindRate(Math.floor(data.wind.speed) + " km/h");
            setTemperature(Math.floor(data.main.temp) + " ºC");
            setCity(data.name);

            if (data.weather[0].icon.slice(0, 2) === "01") {
                setWicon(clear_icon);
                setWeather('Ensolarado / Limpo');
            }
            else if ((data.weather[0].icon.slice(0, 2) === "02")) {
                setWicon(cloud_icon);
                setWeather('Nublado');

            }
            else if ((data.weather[0].icon.slice(0, 2) === "03") || (data.weather[0].icon.slice(0, 2) === "04")) {
                setWicon(drizzle_icon);
                setWeather('Garoa / Chuva leve');

            }
            else if ((data.weather[0].icon.slice(0, 2) === "09") || (data.weather[0].icon.slice(0, 2) === "10") || (data.weather[0].icon.slice(0, 2) === "11")) {
                setWicon(rain_icon);
                setWeather('Chuvoso');

            }
            else if ((data.weather[0].icon.slice(0, 2) === "13")) {
                setWicon(snow_icon);
                setWeather('Nevando');

            }
            else if ((data.weather[0].icon.slice(0, 1) === "5")) {
                setWicon(mist_icon);
                setWeather('Enevoado');
            }
            else {
                setWicon('');
            }
        }
        else {
            setCity('')
            setTemperature('')

            setWicon('')
        }
    }


    const search = async (e) => {
        e.preventDefault()
        const element = document.getElementsByClassName("cityInput")[0].value
        document.getElementsByClassName("cityInput")[0].value = ''

        if (element === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element}&units=Metric&appid=${process.env.REACT_APP_API_KEY}`

        let response = await fetch(url);
        let data = await response.json();
        selectData(data);



    }


    return (
        <div className="container">
            <form className='top-bar' onSubmit={(e) => search(e)}>
                <input type="text" className="cityInput" placeholder="Buscar" />
                <button className='btn-submit' type="submit">
                    <img src={search_icon} alt="Buscar" />
                </button>
            </form>

            {city === 'pageBegin' ? <div><h3>Digite o local desejado</h3></div> :
                (<div className="data-container" >
                    {wicon ? <><img className="weather-image" src={wicon} alt={weather} title={weather} />
                        <div className="weather-location">
                            {city}
                        </div>
                        <div className="weather-temp">
                            {temperature}
                        </div>
                        <div className="elements">
                            <div className="element" title="Umidade Relativa">
                                <img src={humidity_icon} alt="Umidade Relativa" className="icon" />
                                <div className="data">
                                    <div className="humidity-percent">{humidity}</div>
                                </div>
                            </div>
                            <div className="element" title="Velocidade do Vento">
                                <img src={wind_icon} alt="Velocidade do Vento" className="icon" />
                                <div className="data">
                                    <div className="wind-rate">{windRate}</div>
                                </div>
                            </div>
                        </div></> : <h3>Local não encontrado</h3>}
                </div>)}




        </div>
    )
}

export default WeatherApp