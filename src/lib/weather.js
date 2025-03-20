export const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
export const getCurrentWeather = async (lat, long) => {
  const params = {
    latitude: lat,
    longitude: long,
    timezone: 'auto',
    current: 'temperature_2m',
  };
  const responses = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current();
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0).value(),
    },
  };
  return weatherData;
};
