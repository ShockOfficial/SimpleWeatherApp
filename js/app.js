const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=68b81ff73e048d24cf7f92c5f842d47e';
const units = '&units=metric';

let $city;
let $url;

const getWeather = () => {
    $city = (!input.value) ? 'Kraków' : input.value;
    $url = apiLink + $city + apiKey + units;

    axios.get($url)
        .then(res => {
            warning.textContent = '';
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather)
            cityName.textContent = res.data.name;
            temperature.textContent = temp.toFixed() + "°C";
            humidity.textContent = hum + '%';
            weather.textContent = status.main;
            input.value = '';
            if (status.id < 300) {
                photo.setAttribute('src', '../img/thunderstorm.png');
            } else if (status.id < 400) {
                photo.setAttribute('src', '../img/drizzle.png');
            } else if (status.id < 600) {
                photo.setAttribute('src', '../img/rain.png');
            } else if (status.id < 700) {
                photo.setAttribute('src', '../img/ice.png');
            } else if (status.id < 800) {
                photo.setAttribute('src', '../img/fog.png');
            } else if (status.id === 800) {
                photo.setAttribute('src', '../img/sun.png');
            } else if (status.id < 900) {
                photo.setAttribute('src', '../img/cloud.png');
            } else {
                photo.setAttribute('src', '../img/unknown.png');
            }
        })
        .catch(err =>
            warning.textContent = "Wpisz poprawną nazwę miasta!")
};

function emptyInput() {
    if (!input.value) {
        warning.textContent = 'Musisz podać jakieś miasto!';
    } else {
        getWeather();
    }
};

btn.addEventListener('click', emptyInput)
input.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        emptyInput();
    }

})

getWeather()