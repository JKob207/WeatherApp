export const getDataByCity = (city) =>
{
    const API_KEY  = "7cd5ca586d684ea09e8140909222805";
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`;

    const DATA = fetch(URL)
    .then(res => res.json())

    return DATA;
}