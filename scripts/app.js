const cityForm = document.querySelector('form');
const card = document.querySelector('.weather-card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;
    console.log(data)

    const { cityDets, weather } = data

    details.innerHTML = `
     <h4>${cityDets.EnglishName}, ${cityDets.Country.EnglishName}</h4>
                <div class="weather">${weather.WeatherText}</div>
                <div class="temp">
                    <span>${Math.round(weather.Temperature.Metric.Value)} &deg;c</span>
                </div>`;

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    if (card.classList.contains('hidden')) {
        card.classList.remove('hidden');
    }
}

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

});