//component to render the Weather of each Center 
import { Loader } from "./Loader"
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { useVisualCrossing } from 'react-open-weather'

export const Weather = ({lattitude, longitude, address}) => {

  const { data, isLoading } = useVisualCrossing({
    key: '6ZKLT562DQ73JC7TMJVWYBPHW',
    lat: lattitude,
    lon: longitude,
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  return (
    <ReactWeather
      isLoading={isLoading}
      data={data}
      lang="en"
      locationLabel= {address}
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
  )

}