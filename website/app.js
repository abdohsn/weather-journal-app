/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=239243747270374b2e6fb2dbd3316b14&units=metric";

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    const zipCode = document.getElementById("zip").value;
    let feelings = document.getElementById("feelings").value;
    getWeather(baseURL, zipCode, apiKey).then(function (data) {
        console.log(data);
        postData("http://localhost:3000/addFeelings", {
            temperature: data.main.temp,
            date: newDate,
            userResponse: feelings,
        })
            .then(updateUI)
            .catch((error) => {
                console.error("postDataError: ", error);
            });
    });
}

const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + key);
    try {
        const data = await res.json();
        console.log(data.main.temp);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

let postData = async (url = "", data = {}) => {
    console.log("inside postData");
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        console.log("response after calling postData url");
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const updateUI = async () => {
    const request = await fetch("http://localhost:3000/getWeather");
    try {
        console.log(request);
        const response = await request.json();
        console.log(response);
        document.getElementById("date").innerHTML = response.data.temperature;
        document.getElementById("temp").innerHTML = response.data.date;
        document.getElementById("content").innerHTML =
            response.data.userResponse;
        console.log("11");
        console.log(response);
    } catch (error) {
        console.log("error", error);
    }
};
