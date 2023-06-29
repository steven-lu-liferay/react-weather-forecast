import './App.css';

import ForecastList from './components/ForecastList';

import { useState, useEffect } from 'react';



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedForecasts, setLoadedForecasts] = useState([]);
  const [regionName, setRegionName] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState("");

  useEffect(() => {
    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition((position) => {

      const gridEndpoint = "https://api.weather.gov/points/" + position.coords.latitude + "," + position.coords.longitude;
      fetch(
        gridEndpoint
      
      ).then(response => {
        return response.json();
    
      }).then(data => {
        const forecastEndpoint = data["properties"]["forecast"];
        const timeZoneList = data["properties"]["timeZone"].split('/');
        setRegionName(timeZoneList[timeZoneList.length-1]);
        getForecastData(forecastEndpoint);

      });
    
    });
  

  }, []);

  function getForecastData(forecastEndpoint) {
    fetch(
      forecastEndpoint
    
    ).then(response => {
      return response.json();
  
    }).then(data => {
      const forecastPeriods = data["properties"]["periods"];

      const forecastData = [];
      let periodDate, previousDate;
      let periodTemp, previousTemp;

      let temperatureUnit;

      const options = { month: 'short', day: 'numeric' };
      for(const i in forecastPeriods) {

          if(i == 0) {
            setTemperatureUnit(forecastPeriods[i]['temperatureUnit']);
          }

          periodDate = new Date(forecastPeriods[i]['startTime']);
          if(previousDate) {
              periodTemp = forecastPeriods[i]['temperature'];
              if(periodDate.getUTCFullYear() === previousDate.getUTCFullYear() && 
                periodDate.getMonth() === previousDate.getMonth() &&
                periodDate.getDay() === previousDate.getDay()) {

                  // same day as the last entry, package the temperatures together
                  
                  const forecastDateEntry = {
                      "forecast-date": (i==1)? 'TODAY' : periodDate.toLocaleDateString(navigator.language, options),
                      "high-temp": Math.max(previousTemp, periodTemp),
                      "low-temp": Math.min(previousTemp, periodTemp)
                  }

                  if(i == 1) {
                    delete forecastDateEntry['low-temp'];
                  }

                  previousDate = null;
                  previousTemp = null;

                  forecastData.push(forecastDateEntry);
              }
              else {
                  // the previous period is different from the current period
                  // the forecast is for the next day, store values and go onto the next time period

                  // store previous as single entry forecast ... this happens if the previous period
                  // forecast is for today and is a single entry
                  const forecastDateEntry = {
                      "forecast-date": (i==0)? 'TODAY' : previousDate.toLocaleDateString(navigator.language, options),
                      "high-temp": previousTemp
                  }

                  previousDate = new Date(forecastPeriods[i]['startTime']);
                  previousTemp = forecastPeriods[i]['temperature'];
              }

          }
          else {
              // we have a new forecast, store values and go onto the next time period
              previousDate = new Date(forecastPeriods[i]['startTime']);
              previousTemp = forecastPeriods[i]['temperature'];
          }

      }

      setIsLoading(false);
      setLoadedForecasts(forecastData);
    
    });
  
  }

  if(isLoading) {
    return (
      <div>
        Loading ...
      </div>
    );
  }

  return (
    <ForecastList 
      forecasts = {loadedForecasts} 
      regionName = {regionName}
      temperatureUnit = {temperatureUnit}
    />
  );
}

export default App;
