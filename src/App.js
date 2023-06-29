import './App.css';

import ForecastList from './components/ForecastList';

import { useState, useEffect } from 'react';



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedForecasts, setLoadedForecasts] = useState([]);
  const [regionName, setRegionName] = useState("");

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
/*
        console.log("forecast is: " + forecasts);

        setIsLoading(false);
        setLoadedForecasts(forecasts);
*/
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

      /*
      const forecastData = [];
      let periodDate, previousDate;
      const options = { month: 'short', day: 'numeric' };
      for(const i in forecastPeriods) {
        //console.log(forecastPeriods[i]);
        periodDate = new Date(forecastPeriods[i]['startTime']);
        if(previousDate) {
          if(periodDate.getFullYear() === previousDate.getFullYear() && 
             periodDate.getMonth() === previousDate.getMonth() &&
             periodDate.getDay() === previousDate.getDay()) {

              // same day as the last entry

          }

          const forecastDataEntry = {
            date: 
          }
        }
        console.log(periodDate.toLocaleDateString('en-us', options));
      }
      */
     
      setIsLoading(false);
      setLoadedForecasts(forecastPeriods);
    
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
    />
  );
}

export default App;
