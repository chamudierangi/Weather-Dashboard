const apiKey = "c57ec33ddb0413cac0c02355bcbaae49"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector("#weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if(response.status == 404) {
            document.querySelector(".error-msg").style.display = "block";
            document.querySelector(".weather-info").style.display = "none";
        } else {
            var data = await response.json();

            // Console එකේ දත්ත පෙන්වීමට (පරීක්ෂා කිරීම සඳහා)
            console.log(data);

            // දත්ත HTML එකට ඇතුලත් කිරීම (අකුරු නිවැරදිව සකසා ඇත)
            document.querySelector("#city").innerHTML = data.name;
            document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector("#description").innerHTML = data.weather[0].description;

            const mainWeather = data.weather[0].main;

            // Background එක වෙනස් කිරීම
            document.body.classList.remove('sunny', 'cloudy', 'rainy', 'misty');

            if(mainWeather === "Clear") {
                document.body.classList.add('sunny');
            } else if(mainWeather === "Clouds") {
                document.body.classList.add('cloudy');
            } else if(mainWeather === "Rain" || mainWeather === "Drizzle" || mainWeather === "Thunderstorm") {
                document.body.classList.add('rainy');
            } else {
                document.body.classList.add('misty');
            }

            // Icon එක ලබාගැනීම
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.querySelector(".weather-info").style.display = "flex";
            document.querySelector(".error-msg").style.display = "none";
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Button එක click කල විට සෙවීමට
searchBtn.addEventListener("click", () => {
    if(searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Enter key එක press කල විට සෙවීමට
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if(searchBox.value.trim() !== "") {
            checkWeather(searchBox.value);
        }
    }
});

// පිටුව ලෝඩ් වෙද්දීම Colombo වල කාලගුණය පෙන්වීමට
checkWeather("Colombo");