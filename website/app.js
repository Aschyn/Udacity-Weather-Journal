/* Global Variables */
const key = '&appid=a4598039d5e6bef59068bf0f5286a782';
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


//Gets weather data from the API
const getWeather = async(url, userInput) => {
    const res = await fetch(url)
    try{
      const data = await res.json();
      const result = {temperature: data.main.temp, date: newDate, input: userInput};
      return await result;
    }catch(error){
      alert('Invalid entry!');
      //If request is rejected, break the chain.
      throw new Error(error);
    }
}
//Sends data from the weather api to the server
const postToServer = async(url = '', data = {}) =>{
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
  }catch(error){
    console.log('Error', error);
  }
}
//makes function asynchronous
const getFromServer = async() =>{
  //wait to assign a value to res until the promise is recieved
  const res = await fetch('/weather')
  //if successful:
  try{
    //wait until promise is fufilled
    const data = await res.json();
    //Set entry text
    document.querySelector('#date').innerHTML = 'Date: '+data.date;
    document.querySelector('#temp').innerHTML = `Temp: ${data.temperature}  &#176; F`;
    document.querySelector('#content').innerHTML = 'Feelings: '+data.input;
  }catch(error){
    console.log(JSON.stringify(error));
  }
}



document.querySelector('#generate').addEventListener('click', function(e){
  e.preventDefault();
  const zip = document.querySelector('#zip').value;
  const userInput = document.querySelector('#feelings').value;
  getWeather((weatherUrl+zip+key), userInput).then(data => {postToServer('/weather', data)}).then(() => getFromServer());
});
