import ForecastDay from "./ForecastDay";
import classes from "./ForecastList.module.css";

function ForecastList(props) {
    return(
        <div>
            <h2 className={classes['forecast-header']}>Weather Forecast for {props.regionName}</h2>
            <div className={classes['forecast-list']}>
                {props.forecasts.map((aForecast, forecastIndex) => (
                    <ForecastDay 
                        key={aForecast['forecast-date']}
                        forecastData={aForecast}
                        temperatureUnit = {props.temperatureUnit}
                    />

                ))}
            </div>  
        </div>
    );
}

export default ForecastList;
