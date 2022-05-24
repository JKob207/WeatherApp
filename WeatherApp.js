class WeatherApp {
    constructor()
    {
        this.initApp();
    }

    initApp = () =>
    {
        console.log("App initalized!");
    }
}

document.addEventListener('DOMContentLoaded', new WeatherApp());