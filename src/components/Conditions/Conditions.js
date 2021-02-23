import React from 'react';
import classes from './Conditions.module.css';

//instead of having props as arg, can have whatever actual props arg is coming through as argument.
const Conditions = ({ responseObj, error, loading }) => {

    function getSunriseAndSunset(sunriseAndSunsetTime) {
        //let sunriseTime = responseObj.sys.sunrise;
        let date = new Date(sunriseAndSunsetTime * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let ampm = "";
        hours < 12 ? ampm = "am" : ampm = "pm";
        hours = ((hours + 11) % 12 + 1);

        // Will display time in 10:30:23 format
        let formattedSunriseAndSunset = hours + ':' + minutes.substr(-2) + ampm;

        return formattedSunriseAndSunset;
    }

    function getIcon(icon) {
        let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        return iconUrl;
    }

    function getCurrentTime() {
        let today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let ampm = "";
        hours < 12 ? ampm = "am" : ampm = "pm";
        hours = ((hours + 11) % 12 + 1); //?
        let adjustedMinutes = '';
        minutes < 10 ? adjustedMinutes = "0" + minutes : adjustedMinutes = minutes;

        let time = hours + ":" + adjustedMinutes + ampm + " EST";
        return time;
    }


    const { description, main_temp, img, Wrapper, other_info, label, table, main_info } = classes;

    return (
        <div className={Wrapper}>
            {error && <small>Please enter a valid city.</small>}
            {loading && <div>Loading...</div>}
            {responseObj.cod === 200 ?
                <div>
                    <p><strong>{responseObj.name}, {responseObj.sys.country} Weather</strong></p>
                    <p>As of {getCurrentTime()}</p>
                    <div class={main_info}>
                        <img className={img} src={getIcon(responseObj.weather[0].icon)}></img>
                        <h2 className={main_temp}>{Math.round(responseObj.main.temp)}°</h2>
                        <p className={description}>{responseObj.weather[0].description}</p>
                    </div>
                    <div className={other_info}>
                        <table className={table}>
                            <tbody>
                                <tr>
                                    <td>Feels Like</td>
                                    <td>{Math.round(responseObj.main.feels_like)}°</td>
                                </tr>
                                {/* <hr></hr> */}
                                <tr>
                                    <td>Humidity</td>
                                    <td>{responseObj.main.humidity}%</td>
                                </tr>
                                {/* <hr></hr> */}
                                <tr>
                                    <td>Sunrise / Sunset</td>
                                    <td>{getSunriseAndSunset(responseObj.sys.sunrise)} / {getSunriseAndSunset(responseObj.sys.sunset)} EST</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                : null
            }
        </div >
    )
}
export default Conditions;