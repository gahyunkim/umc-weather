import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

function App() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const API_KEY = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  const searchWeather = async (e) => {
    if(e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'get',
          url: url,
        })
        setResult(data);
        console.log(data);
      } 
      catch(error) {
        alert(error);
      }
    }
  }

  return (
    <WeatherWrap>
      <div className="weatherInputWrap">
        <input
          value={location}
          placeholder="도시를 입력하세요"
          type="text"
          // 엔터나 키가 눌리면 실행되도록 함
          onKeyDown={searchWeather}
          // input 값이 변할 때 마다 location을 변경하도록 함 
          onChange={(e) => setLocation(e.target.value)}
          
        />
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="city">{result.data.name}</div>
            <div className="temperature">
              {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
            </div>
            <div className="sky">{result.data.weather[0].main}</div>
          </ResultWrap>
        )}
      </div>
    </WeatherWrap>
  );
}

export default App;

const WeatherWrap = styled.div`
  width: 100px;
  height: 100px;

  .weatherInputWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }
  input {
    padding: 20px;
    border: 2px black solid;
    border-radius: 20px;
  }

`;

const ResultWrap = styled.div`
  margin-top: 60px;
  border: 1px black solid;
  padding: 10px;
  border-radius: 20px;

  .city {
    font-size: 25px;
  }
  .temperature {
    font-size: 60px;
    font-weight:400;
    margin-top: 8px;
  }
  .sky {
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`;