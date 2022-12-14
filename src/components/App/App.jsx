import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherContainer } from '../WeatherContainer/WeatherContainer'
import s from './app.module.scss';

export const App = () => {
  const urlLocal = window.location.href;
  const req = /([%].+)\b/gm;
  const [citySelect, setCitySelect] = React.useState(urlLocal.match(req) ? urlLocal.match(req).join('') : 'Лондон'); 

  const getCity = (city) => {
    setCitySelect(city);
  };

  return (
    <div className={s.container}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherContainer onChange={getCity} citySelect={citySelect} />} />
          <Route path="/:city" element={<WeatherContainer onChange={getCity} citySelect={citySelect} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


