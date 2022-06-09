const api={
    key:"960cb20ff236de3acfb8a65b7b499e5c",
    base:"https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
btn.addEventListener('click',getInput);

const city=document.querySelector('.city');
const date=document.querySelector('.date');
const temp = document.querySelector('.temp');
const weather = document.querySelector('.weather');
const range = document.querySelector('.range');
const weatherIcon=document.querySelector('.weather-icon');



function getInput (event){
   event.preventDefault();
   if(event.type == 'click'){
       getData(search.value);
       console.log(search.value);
   }
};

function getData(){
    //fetch api
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response=>{
        return response.json();
    }).then(displayData);
}

function displayData(response){
    // console.log(response);
    if(response.cod === "404"){
        const err=document.querySelector('.invalid-data');
        err.textContent='Enter a valid city';
        //clear search
        search.value="";
    }else{
        //city
        city.innerText = `${response.name},${response.sys.country}`;
        //date
        const today =new Date();
        date.innerText = dateFunction(today);

        //temp
        temp.innerHTML = `Temp :  ${Math.round(response.main.temp)}&deg;C`;
        
        //weather
        weather.innerText= `Weather : ${response.weather[0].main}`;

        //range
        range.innerHTML = `Range : ${Math.round(response.main.temp_min)}&deg;C /  ${Math.round(response.main.temp_max)}&deg;C`;

        //setting icon according to weather
        const iconURL ="https://api.openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        //when we get all the data we clear search field
        search.value ="";
    }
};

function dateFunction(d){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day=days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} , ${date} ${month} ${year}`
}