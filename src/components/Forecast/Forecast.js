import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

const Forecast = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({}); //responseObj is initialized as empty object

    //for errors
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    //converts input to string
    // const uriEncodedCity = encodeURIComponent(city);

    function getForecast(e) {

        e.preventDefault(); //pass event (e) object through getForecast and call preventDefault to prevent form from refreshing page upon submission

        if (city.length === 0) {
            return setError(true);
        }

        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});

        setLoading(true);

        //converts input to string
        let uriEncodedCity = encodeURIComponent(city);

        //old api
        // `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`

        // `api.openweathermap.org/data/2.5/weather?${uriEncodedCity}&APPID=c965ba6fd9f13e0f0417381d5cce67b7`

        // weather data fetch function will go here
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${uriEncodedCity}&units=${unit}&APPID=c965ba6fd9f13e0f0417381d5cce67b7`)
            .then(response => response.json()) //extracts JSON body content
            .then(response => {
                if (response.cod !== 200) {
                    throw new Error()
                }
                setResponseObj(response);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.log(err.message);
            });
    }

    const { textInput, Radio, search, Button } = classes;

    return (
        <div>
            <h1>React Weather App</h1>
            <div>
                {/* {JSON.stringify(responseObj)} */}
            </div>
            <form onSubmit={getForecast}>
                <div className={search}>
                    {/* <i className="fa fa-search"></i> */}
                    <input
                        className={textInput}
                        for="search"
                        type="text"
                        placeholder="Enter City"
                        maxLength="50"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <br></br>
                <label>
                    <input
                        className={Radio}
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Fahrenheit
                </label>
                <label>
                    <input
                        className={Radio}
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Celcius
                </label>
                <button className={Button} type="submit">Get Forecast</button>

            </form>
            <Conditions
                responseObj={responseObj}
                error={error} //new
                loading={loading} //new
            />
        </div>
    )
}
export default Forecast;