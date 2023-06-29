import classes from "./ForecastDay.module.css";

function ForecastDay(props) {
    const isSingleTemp = (!props.forecastData['low-temp']);

    console.log(isSingleTemp);
    if(isSingleTemp) {
        return(
            <div className={classes['forecast-card']}>
                <div className="">
                    <div className={classes['forecast-temp']}>
                        <div className={classes['temp-text-single']}>{props.forecastData['high-temp']}&deg;</div>
                    </div>
                    <div className={classes['forecast-date']}>{props.forecastData['forecast-date']}</div>
                </div>
            </div>
    
        );
    
    }

    return(
        <div className={classes['forecast-card']}>
            <div className="">
                <div className={classes['forecast-temp']}>
                    <div className={classes['temp-text']}>
                        <div>{props.forecastData['high-temp']}&deg;</div>
                        <div className={classes['temp-line2']}>{props.forecastData['low-temp']}&deg;</div>
                    </div>
                </div>
                <div className={classes['forecast-date']}>{props.forecastData['forecast-date']}</div>
            </div>
        </div>

    );
}

export default ForecastDay;