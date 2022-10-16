import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import logo from '../../assets/img/logo/logo.png';
import feelsLike from '../../assets/img/icon/feelsLike.png';
import humidity from '../../assets/img/icon/humidity.png';
import windSpeed from '../../assets/img/icon/windSpeed.png';
import tempMin from '../../assets/img/icon/temp_min.png';
import tempMax from '../../assets/img/icon/temp_max.png';
import pressure from '../../assets/img/icon/pressure.png';
import sunrise from '../../assets/img/icon/sunrise.png';
import sunset from '../../assets/img/icon/sunset.png';
import s from './weatherContainer.module.scss';

export const WeatherContainer = ({ citySelect, onChange }) => {
  const urlLocal = window.location.href;
  const req = /([%].+)\b/gm;
  const [city, setCity] = React.useState(null);
  const APIKEY = "041bcd2cc5c4570e5ee012e7c48aeb00";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${urlLocal.match(req) ? urlLocal.match(req).join('') : 'Лондон'}&units=metric&lang=ru&appid=${APIKEY}`;
  const navigate = useNavigate();

  const cities = ["Лондон", "Токио", "Москва", "Нью-Йорк", "Мехико", "Бангкок", "Рим", "Каир", "Сидней", "Париж"];
  const getCity = (event) => {
    onChange(event.target.value);
  }

  React.useEffect(() => {
    fetch(URL)
      .then(data => data.json())
      .then(res => {
        setCity(res)
        navigate(`/${citySelect}`)
      });
  }, [URL, citySelect, navigate])

  const copyUrl = () => {
    alert('Ссылка скопирована в буфер обмена')
  };
  const optionsDate = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour12: false
  };
  const optionsTime = {
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.logo}><img className={s.logo} src={logo} alt="logo" /></div>
        <div className={s.selectBox}>
          <select defaultValue={'DEFAULT'} onChange={getCity} className={s.select}>
            <option value="DEFAULT" disabled hidden >Город</option>
            {cities.map(city => (
              <option key={city} value={city} className={s.selectItem}>{city}</option>
            ))
            };
          </select>
        </div>
      </div>
      <div className={s.container}>
        {city &&
          <>
            <div className={s.text}>Сегодня: <span className={s.date}>{new Intl.DateTimeFormat('ru-RU', optionsDate).format(city.dt * 1000)}</span></div>
            <div className={s.rowOne}>
              <div className={s.blockOne}>
                <div><img className={s.icon} src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="imgWeather" /></div>
                <div className={s.tempN}>{Math.round(city.main.temp)}</div>
                <div className={s.tempS}>°C</div>
              </div>

              <div className={s.blockTwo}>
                <div className={s.city}>{city.name}</div>
                <div className={s.text}>Данные от: <span className={s.time}>{new Intl.DateTimeFormat('ru-RU', optionsTime).format(city.dt * 1000)}</span></div>
                <div className={s.description}>{city.weather[0].description[0].toUpperCase() + city.weather[0].description.slice(1)}</div>
              </div>
            </div>
            <div className={s.rowTwo}>
              <div className={s.blockOne}>
                <div className={s.text}><img className={s.iconTitle} src={feelsLike} alt="iconTitle" />Ощущается: <label className={s.number}>{Math.round(city.main.feels_like)}</label> °C</div>
                <div className={s.text}><img className={s.iconTitle} src={humidity} alt="iconTitle" />Влажность: <label className={s.number}>{city.main.humidity}</label> %</div>
                <div className={s.text}><img className={s.iconTitle} src={windSpeed} alt="iconTitle" />Ветер: <label className={s.number}>{Math.round(city.wind.speed)}</label> м/с</div>
              </div>
              <div className={s.blockTwo}>
                <div className={s.text}><img className={s.iconTitle} src={tempMin} alt="iconTitle" />Макс. температура: <label className={s.number}>{Math.round(city.main.temp_max)}</label> °C</div>
                <div className={s.text}><img className={s.iconTitle} src={tempMax} alt="iconTitle" />Мин. температура: <label className={s.number}>{Math.round(city.main.temp_min)}</label> °C</div>
                <div className={s.text}><img className={s.iconTitle} src={pressure} alt="iconTitle" />Давление: <label className={s.number}>{city.main.pressure}</label> мм</div>
              </div>
              <div className={s.blockThree}>
                <div className={s.text}><img className={s.iconTitle} src={sunrise} alt="iconTitle" />Восход: <label className={s.number}>{new Intl.DateTimeFormat('ru-RU', optionsTime).format(city.sys.sunrise * 1000).slice(0, -3)}</label></div>
                <div className={s.text}><img className={s.iconTitle} src={sunset} alt="iconTitle" />Закат: <label className={s.number}>{new Intl.DateTimeFormat('ru-RU', optionsTime).format(city.sys.sunset * 1000).slice(0, -3)}</label></div>
                <div className={s.remark}>* по времени МСК</div>
              </div>
            </div>
            <div className={s.rowThree}>
              <CopyToClipboard text={urlLocal}>
                <button onClick={copyUrl} className={s.btn}>Поделиться</button>
              </CopyToClipboard>
            </div>
          </>
        }
      </div>
    </div>
  )
}
