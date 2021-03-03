// DOM elements
const time       = document.getElementById('time'),
      calendar   = document.getElementById('calendar'),
      greeting   = document.getElementById('greeting'),
      name       = document.getElementById('name'),
      focus      = document.getElementById('focus'),
      btn        = document.querySelector('.btn'),
      city       = document.querySelector('.city-app'),
      blockquote = document.querySelector('blockquote'),
      figcaption = document.querySelector('figcaption'),
      btnQuote   = document.querySelector('.btn_quote');

// Show Time,
function showTime() {
    let today = new Date(),
        hour  = today.getHours(),
        min   = today.getMinutes(),
        sec   = today.getSeconds(),
        day   = today.getDay(),
        date  = today.getDate(),
        month = today.getMonth();
    
    //Show days
    let days = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let months = ['Января','Февраля','Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

    // Output time
    time.innerHTML = `<div>${zeroTime(hour)}<span>:</span></div><div>${zeroTime(min)}<span>:</span></div><div>${zeroTime(sec)}</div>`;
    calendar.innerHTML = `${days[day]} ${date} ${months[month]}`

    setTimeout(showTime, 1000);
}

// Add Zero
function zeroTime(time) {
    if(time>=0 && time<10 ) {
        time = `0${time}`;
    } else time
    return time;
}  

// Set Background
let interval;

function setBgGreet() {
    
    let today = new Date();
    let hour = today.getHours();

    // btn.disabled = true;
    // setTimeout(function() { btn.disabled = false }, 1000);
   
    if(hour >=6 && hour <12) {
        //morning
        let num = viewBg();
        const src = `img/morning/${num}.jpg`;
        const img = document.createElement('img');
        img.src = src;
        console.log(img);
        img.onload = () => {
            document.body.style.backgroundImage = `url(img/morning/${num}.jpg)`;
        };
        greeting.textContent = 'Доброе утро';
    } else if (hour >=12 && hour <18) {
        // day
        let num = viewBg();
        const src = `img/day/${num}.jpg`;
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => {
          document.body.style.backgroundImage = `url(img/day/${num}.jpg)`;  
        };
        greeting.textContent = 'Добрый день';
    } else if (hour >=18 && hour <24) {
        // evening
        let num = viewBg();
        const src = `img/evening/${num}.jpg`;
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => {
        document.body.style.backgroundImage = `url(img/evening/${num}.jpg)`;
        };
        greeting.textContent = 'Добрый вечер';
    } else if (hour<6) {
        // night
        let num = viewBg();
        const src = `img/night/${num}.jpg`;
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => {
        document.body.style.backgroundImage = `url(img/night/${num}.jpg)`;
        };
        greeting.textContent = 'Доброй ночи';
    }

   clearInterval(interval);
   interval =  setTimeout(setBgGreet,3600000);
 
}



// generate random array numbers
function generateArrayRandomNumber (min, max) {
    var totalNumbers        = max - min + 1,
        arrayTotalNumbers   = [],
        arrayRandomNumbers  = [],
        tempRandomNumber; 
                
        while (totalNumbers--) {
                arrayTotalNumbers.push(totalNumbers + min);
            }
            while (arrayTotalNumbers.length) {
                tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
                arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
                arrayTotalNumbers.splice(tempRandomNumber, 1);
            }

        return arrayRandomNumbers;
}
let arr = generateArrayRandomNumber(1,20);


// View Image
let i=0;
function viewBg() {
    
    if(i===arr.length) i=0;
    let randResult = arr[i];
    i++;
    if(randResult<10) {
        randResult = `0${randResult}`;
    } else {
        randResult;
    }
    return randResult;

    
}


// Get Name
function getName() {
    if (localStorage.getItem("name") === null) {
      name.textContent = "[Введите Имя]";
    } else {
      name.textContent = localStorage.getItem("name");
    }
  }
  
// Set Name
function setName(e) {
if (e.type === "keypress" || e.type === "blur") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13 || e.type === "blur") {
    name.blur();
    if (e.target.textContent.trim() === "") {
        e.target.innerText = localStorage.getItem("name") || "[Введите Имя]";
    } else {
        localStorage.setItem("name", e.target.innerText);
    }
    }
}
}
  
// Get Focus
function getFocus() {
if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Введите Цель]";
} else {
    focus.textContent = localStorage.getItem("focus");
}
}
  
// Set Focus
function setFocus(e) {
if (e.type === "keypress" || e.type === "blur") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13 || e.type === "blur") {
    focus.blur();
    if (e.target.textContent.trim() === "") {
        e.target.innerText = localStorage.getItem("focus") || "[Введите Цель]";
    } else {
        localStorage.setItem("focus", e.target.innerText);
    }
    }
}
}
// reset name/focus
function resetInput(element) {
element.addEventListener("click", (e) => {
    element.textContent = "";
});
}

function getCity() {
    if (localStorage.getItem("city") === null) {
        city.textContent = city.innerHTML;
    } else {
        city.textContent = localStorage.getItem("city");
        weatherApi();
    }
}
  
function setCity(e) {
    if (e.type === "keypress" || e.type === "blur") {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13 || e.type === "blur") {
            city.blur();
        if (e.target.textContent.trim() === "") {
            e.target.innerText = localStorage.getItem("city") || "[Введите город]";
        } else {
            localStorage.setItem("city", e.target.innerText);
        }
        }
    }
}
  
function weatherApi () {
    

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&appid=eda3d4022cf5ab4960476ede7ec2f8cc&&lang=ru&units=metric`)
        .then(function(resp) {return resp.json()})
        .then(function(data) {
            console.log(data);
            try {
                if(data.message === 'city not found') {
                city.textContent = 'Введите правильно город';
                document.querySelector('.city-app').innerHTML = city.textContent;
            } 
           
            document.querySelector('.city-app').innerHTML = city.textContent;
            document.querySelector('.humidity .value').innerHTML = data.main.humidity + '%';
            document.querySelector('.wind .value').innerHTML = data.wind.speed + 'ms';
            document.querySelector('.temp-over-app').innerHTML = data.main.temp.toFixed(0) + '&deg;';
            document.querySelector('.day-icon-app').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`; 
            }
            catch (e) {
                setTimeout(() => {
                    weatherApi();
                    }, 10000);
            }

           

        });
    }

async function getQuote() {  
  const url = './quetes.json';
  const res = await fetch(url);
  const data = await res.json(); 
  let num = randomInteger(0,37)
  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  
  blockquote.textContent = data[num].text;
}


document.addEventListener('DOMContentLoaded', weatherApi);
document.addEventListener('DOMContentLoaded', getQuote);

btnQuote.addEventListener('click', getQuote);

btn.addEventListener('click', () => {
    setTimeout(setBgGreet,200);
    setTimeout(getQuote,1000);
});

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
city.addEventListener("keypress", setCity);
city.addEventListener("blur", setCity);
city.addEventListener("blur", getCity);


//Run
showTime();
setBgGreet();
getName();
getFocus();
getQuote();
getCity();
resetInput(focus);
resetInput(name);
resetInput(city);

setTimeout(() => {
    document.querySelector('.wrapper').style.opacity = 1;
    document.querySelector('.lazy-load').style.opacity = 0;
    document.querySelector('.lazy-load span').innerHTML = '';
    setTimeout(() => {
        document.querySelector('.lazy-load').classList.add('hide');
    },1000)
},4000)