// Weather App JavaScript
const apiKey = "46827f65f682c86701b62277bd21447f"; // OpenWeatherMap API anahtarınızı buraya ekleyin
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Hava durumu verilerini getir
async function checkWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`);
        
        if (response.status === 404) {
            alert("Şehir bulunamadı! Lütfen geçerli bir şehir adı girin.");
            return;
        }
        
        const data = await response.json();
        
        // Sıcaklık güncelle
        document.querySelector(".weather h1").innerHTML = Math.round(data.main.temp) + "°C";
        
        // Şehir adı güncelle
        document.querySelector(".weather h2").innerHTML = data.name;
        
        // Nem güncelle
        document.querySelector(".nem").innerHTML = data.main.humidity + "%";
        
        // Rüzgar hızı güncelle
        document.querySelector(".ruzgar").innerHTML = Math.round(data.wind.speed) + " km/h";
        
        // Hava durumu ikonunu güncelle
        updateWeatherIcon(data.weather[0].main);
        
    } catch (error) {
        console.error("Hava durumu verisi alınamadı:", error);
        alert("Hava durumu verisi alınamadı. Lütfen tekrar deneyin.");
    }
}

// Hava durumuna göre ikon güncelle
function updateWeatherIcon(weatherMain) {
    switch (weatherMain.toLowerCase()) {
        case "clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "mist":
            weatherIcon.src = "images/mist.png";
            break;
        case "rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "snow":
            weatherIcon.src = "images/snow.png";
            break;
        default:
            weatherIcon.src = "images/clouds.png";
    }
}

// Arama butonuna tıklama olayı
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Enter tuşuna basma olayı
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        if (searchBox.value.trim() !== "") {
            checkWeather(searchBox.value);
        }
    }
});

// Sayfa yüklendiğinde varsayılan şehir olarak İstanbul'u göster
window.addEventListener("load", () => {
    checkWeather("Istanbul");
});
