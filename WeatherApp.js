import { getDataByCity } from "./WheatherAPI.js";

class WeatherApp {
    constructor()
    {
        this.initApp();
    }

    initApp = () =>
    {
        console.log("App initalized!");
        this.isCelcius = true;

        getDataByCity("New York")
        .then(data => {
            //wydzielić pod koniec do osobnej funkcji!
            console.log(data);
            this.setHeader(data.location);
            this.setCurrentWheather(data.current);
            this.setForecast(data.forecast);
        })
    }

    async setHeader(location)
    {
        const city = document.querySelector(".location-desc");
        const country = document.querySelector(".country");
        const flag = document.querySelector(".flag img");

        city.innerText = location.name;
        country.innerText = location.country;
        let countryFlag = location.country.toLowerCase();
        if(countryFlag == "russia")
        {
            countryFlag = "ru"
        }
        flag.src = `https://countryflagsapi.com/svg/${countryFlag}`;
    }

    async setCurrentWheather(current)
    {
        const image = document.querySelector(".wheather-widget-image img");
        const currentDesc = document.querySelector(".wheather-widget-image-desc");
        const wind = document.querySelector(".wind");
        const percip = document.querySelector(".percip");
        const pressure = document.querySelector(".pressure");
        const temp = document.querySelector(".temp");

        image.src = current.condition.icon;
        currentDesc.innerText = current.condition.text;
        wind.innerText = `Wind: ${current.wind_mph} km/h`;
        percip.innerText = `Percip: ${current.precip_mm} mm`
        pressure.innerText = `Pressure: ${current.pressure_mb} hPa`

        if(this.isCelcius)
        {
            temp.innerText = `${current.temp_c} °C`;
        }else
        {
            temp.innerText = `${current.temp_f} °F`;
        }
    }

    async setForecast(forecast)
    {
        const days = document.querySelectorAll(".wheather-widget-day");
        for(let i=0;i<days.length;i++)
        {
            const wheatherWidgetDayShort = days[i].querySelector(".wheather-widget-day-short");
            const wheatherWidgetDayImg = days[i].querySelector(".wheather-widget-day-img img");
            const wheatherWidgetDayTemp = days[i].querySelector(".wheather-widget-day-temp");

            let date = new Date(forecast.forecastday[i+1].date);
            wheatherWidgetDayShort.innerText = date.toLocaleString("en-GB", { weekday: "short" });

            wheatherWidgetDayImg.src = forecast.forecastday[i+1].day.condition.icon;

            if(this.isCelcius)
            {
                wheatherWidgetDayTemp.innerText = `${forecast.forecastday[i+1].day.avgtemp_c} °C`;
            }else
            {
                wheatherWidgetDayTemp.innerText = `${forecast.forecastday[i+1].day.avgtemp_f} °F`;
            }

        }
    }
}

document.addEventListener('DOMContentLoaded', new WeatherApp());