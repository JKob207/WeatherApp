import { getDataByCity } from "./WheatherAPI.js";

class WeatherApp {
    constructor()
    {
        this.initApp();
    }

    initApp = () =>
    {
        console.log("App initalized!");
        
        getDataByCity("Cracow")
        .then(data => {
            console.log(data);
            this.setHeader(data.location)
        })
    }

    async setHeader(location)
    {
        const city = document.querySelector(".location-desc");
        const country = document.querySelector(".country");
        const flag = document.querySelector(".flag img");

        console.log(location);
        city.innerText = location.name;
        country.innerText = location.country;
        flag.src = `https://countryflagsapi.com/svg/${location.country.toLowerCase()}`;
    }
}

document.addEventListener('DOMContentLoaded', new WeatherApp());