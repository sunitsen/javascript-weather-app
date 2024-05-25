//selections

const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const card = document.querySelector(".card");

//api key
const apiKey = "d15f82a17c0b51de6f205fe3ef895d9f";




// weather app submit
weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    
    const city = cityInput.value;


    if(city){
        // use try catch
        try{
         const weatherData = await getWeatherData(city);
         displayWeatherInfo(weatherData)

        }catch(error){
            console.log(error);
            displayError(error.message);
        }
    }
    else{
      displayError("Please enter a city");
    }
  
})



// call the api form here 
async function getWeatherData(city){

   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   


     
 const response = await fetch(apiUrl);

  if(!response.ok){
    throw Error("could not find")
  }
  return await response.json()
   
}

// weatcher info 
function displayWeatherInfo(data){ 
  const {name : city,
         main: {temp, humidity},
         weather: [{description,id}]} = data;


         card.textContent = "";
         card.style.display = "flex"

         const cityDisplay = document.createElement("h3");
         const tempDisplay = document.createElement("p");
         const humidityDisplay = document.createElement("p");
         const descDisplay = document.createElement("h1");
         const weatherEmoji = document.createElement("h1");
         const errorDisplay = document.createElement("h1");

         cityDisplay.textContent = city;
         tempDisplay.textContent = `${((temp - 273.15) * 9/5 + 32).toFixed(1)}°F`;        
         humidityDisplay.textContent = `Humidity: ${humidity}`
         descDisplay.textContent = description;
         weatherEmoji.textContent = displayWeatherEmoji(id)
       
        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji")




         card.appendChild(cityDisplay)
         card.appendChild(tempDisplay)
         card.appendChild(humidityDisplay)
         card.appendChild(descDisplay)
         card.appendChild(weatherEmoji)

}

//weather emoji
function displayWeatherEmoji(weatherId){
  switch (true) {
    case (weatherId >= 200 && weatherId < 300):
        return "⚡ Thunderstorm";
    case (weatherId >= 300 && weatherId < 400):
        return "🌧️ Drizzle";
    case (weatherId >= 500 && weatherId < 600):
        return "🌧️ Rain";
    case (weatherId >= 600 && weatherId < 700):
        return "❄️ Snow";
    case (weatherId >= 700 && weatherId < 800):
        return "🌫️ Atmosphere";
    case (weatherId === 800):
        return "☀️ Clear";
    case (weatherId > 800):
        return "☁️ Clouds";
    default:
        return "❓ Unknown";
  }
}


// display error 
function displayError(message){
   const errorDisplay = document.createElement("p");
   errorDisplay.textContent = message;
   errorDisplay.classList.add("errorDisplay")
   card.textContent = "";
   card.style.display = "flex";
   card.appendChild(errorDisplay);

}







