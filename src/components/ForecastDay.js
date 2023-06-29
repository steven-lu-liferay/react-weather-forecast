import classes from "./ForecastDay.module.css";

function ForecastDay(props) {

    return(
        <div className={classes['forecast-card']}>
            <div className="">
                <div className={classes['forecast-temp']}>
                    <div className={classes['temp-text']}>{props.temp}&deg;</div>
                </div>
                <div className={classes['forecast-date']}>{props.date}</div>
            </div>
        </div>

    );
}

export default ForecastDay;