//component to render the Weather of each Center 
import ReactWeather,{ useVisualCrossing } from 'react-open-weather'
import styled from "styled-components";

export const Weather = ({lattitude, longitude, address}) => {

  const { data, isLoading } = useVisualCrossing({
    key: '6ZKLT562DQ73JC7TMJVWYBPHW',
    lat: lattitude,
    lon: longitude,
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  return (
    <WeatherStyling>
    <ReactWeather
      isLoading={isLoading}
      data={data}
      lang="en"
      locationLabel= {address}
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
    </WeatherStyling>
  )

}

const WeatherStyling = styled.div`
  width:100%;
  height:auto;
`
