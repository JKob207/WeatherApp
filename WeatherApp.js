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

        this.searchWheatherByCity("Cracow");
        this.searchBarCheck();
        this.setChangeTemp();
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
        percip.innerText = `Percip: ${current.precip_mm} mm`;
        pressure.innerText = `Pressure: ${current.pressure_mb} hPa`;

        if(this.isCelcius)
        {
            temp.innerText = `${current.temp_c} °C`;
        }else
        {
            temp.innerText = `${current.temp_f} °F`;
        }

        this.setBackground(current.condition.code);
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

    async searchBarCheck()
    {
        const searchCity = () =>
        {
            this.searchWheatherByCity(searchBarInput.value)
            .then(() => {
                searchBarInput.value = "";
            })
        }

        const searchBarInput = document.querySelector("#search-bar input");
        const searchBarSvg = document.querySelector("#search-bar svg");
        searchBarSvg.addEventListener("click", searchCity);
        searchBarInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                searchCity();
            }
        })
    }

    async searchWheatherByCity(city)
    {
        getDataByCity(city)
        .then(data => {
            console.log(data);
            if(data.location)
            {
                this.setHeader(data.location);
                this.setCurrentWheather(data.current);
                this.setForecast(data.forecast);
            }
        })
    }

    async setChangeTemp()
    {
        const celcius = document.querySelector(".degrees-control .celcius");
        const farenheit = document.querySelector(".degrees-control .farenheit");
        let currentCity = document.querySelector(".location-desc").innerText.toLowerCase();

        celcius.addEventListener("click", () => {
            if(farenheit.classList.contains("active"))
            {
                currentCity = document.querySelector(".location-desc").innerText.toLowerCase();

                farenheit.classList.remove("active");
                celcius.classList.add("active");
                this.isCelcius = true;
                this.searchWheatherByCity(currentCity);
            }
        })

        farenheit.addEventListener("click", () => {
            if(celcius.classList.contains("active"))
            {
                currentCity = document.querySelector(".location-desc").innerText.toLowerCase();

                celcius.classList.remove("active");
                farenheit.classList.add("active");
                this.isCelcius = false;
                this.searchWheatherByCity(currentCity);
            }
        })
    }

    async setBackground(code)
    {
        const widget = document.querySelector("#widget");

        const clearTab = [1000];
        const cloudsTab = [1003, 1006, 1009];
        const fogTab = [1030, 1135, 1147];
        const rainTab = [1063, 1066, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1240, 1243, 1246, 1249, 1255];
        const snowTab = [1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1258, 1261, 1264];
        const thunderTab = [1087, 1273, 1276, 1279, 1282];

        clearTab.forEach(el => {
            if(el == code)
            {
                widget.style.backgroundImage = "url('./img/clear.gif')";
            }
        })

        cloudsTab.forEach(el => {
            if(el == code)
            {
                widget.style.backgroundImage = "url('./img/clouds.gif')";
            }
        })

        fogTab.forEach(el => {
            if(el == code)
            {
                widget.style.backgroundImage = "url('./img/fog.gif')";
            }
        })

        rainTab.forEach(el => {
            if(el == code)
            {
                widget.style.backgroundImage = "url('./img/rain.gif')";
            }
        })

        snowTab.forEach(el => {
            if(el == code)
            {
                widget.style.backgroundImage = "url('./img/snow.gif')";
            }
        })

        thunderTab.forEach(el => {
            if(el == code)
            {
                widget.style.backgroundImage = "url('./img/thunderstorm.gif')";
            }
        })


    }
}

document.addEventListener('DOMContentLoaded', new WeatherApp());