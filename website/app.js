/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = "&APPID=9703f8dc370fccb91d6f800c44a86291&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// get request to the weather API
const weatherReadings = async (url) => {
    const res = await fetch(url);
    try{
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error){
        console.log("error", error);
    }
}
//callback function for when it is clicked
document.getElementById('generate').addEventListener('click', weatherAction);
function weatherAction(e){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    weatherReadings(`${baseUrl}${zip}${apiKey}`)
    .then(
        function (data){
            postData('http://localhost:8000/add', {temperature: data.main.temp, date: newDate, userResponse: feelings });
        })
        .then(function(){
            updateUI()
        })
}

const postData = async(url='', data={}) => {
    const res = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8000/'
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await res.json();
        return newData
    }catch (error){
        console.log("error", error);
    }
}
const updateUI = async() =>{
    const req = await fetch ('http://localhost:8000/all');
    try{
        const allData = await req.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.response;
    }catch(error){
        console.log('error', error);
    }
}