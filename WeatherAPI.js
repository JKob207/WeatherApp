export const getDataByCity = (city) =>
{
    const API_KEY  = "7cd5ca586d684ea09e8140909222805";
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`;

    return fetch(URL)
    .then(res => res.json())
    .catch((error) => {
        console.log("Error: " + error);
    })
}