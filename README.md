# Description
Demo asset: React client extension displaying weather forecast based on the browser geolocation.

![image](https://github.com/steven-lu-liferay/react-weather-forecast/assets/80542752/b4d9ffaf-07e2-4bec-9c16-bd4984082e12)

## Limitations
1. Calls are made to https://api.weather.gov (U.S. National Weather Service), so the asset is limited to U.S. geolocation coordinates. Requires modification to API endpoints for non-U.S. locales.
2. For the 'TODAY' card, the lower temperature may not be the low temperature for the day. It's the low temperature going forward from now. For example, if we're making the call at noon, and the nighttime low is 60 degrees, but the morning temperature was as low as 20 degrees, the app will only show 60 degrees for 'TODAY'. The U.S. National Weather Service doesn't give us low temperatures from earlier in the day.

## To add to Liferay
Add as a "Custom Element" client extension.

HTML Element Name is "weather-forecast-app".

![image](https://github.com/steven-lu-liferay/react-weather-forecast/assets/80542752/8cf1cca8-59a0-441c-9244-1f74d503b07e)
