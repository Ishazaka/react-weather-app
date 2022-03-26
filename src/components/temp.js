import React, { useEffect, useState } from 'react';
import "./style.css";
import Weathercard from './weathercard';

const Temp = () => {

    const [searchvalue, setSearchvalue] = useState("baltimore");
    const [tempinfo, setTempinfo] = useState({});

    const getWeatherinfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=f3c0363fe4b541b5d937342ed650c267`;

            let res = await fetch(url);
            let data = await res.json();
            console.log(data);

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            }
            setTempinfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getWeatherinfo();
    }, [])


    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type="search" placeholder='search...' autoFocus id='search' className='searchTerm' value={searchvalue} onChange={(e) => { setSearchvalue(e.target.value) }} />
                    <button className='searchButton' type='button' onClick={getWeatherinfo}> Search </button>

                </div>

            </div>

            {/* our temp card */}

            < Weathercard tempinfo={tempinfo} />

        </>
    )
}

export default Temp