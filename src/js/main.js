const currentYear = 2020;
const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Octorber',
    'November',
    'December'
];

const colours = ['#239B56','#2ECC71','#7DCEA0','#F4D03F','#7DCEA0','#E74C3C'];
const defaultColour = '#fff';
let activeColour = '';

const calendar = document.getElementById('calendar');
const moods = document.querySelectorAll('.mood');
const clear = document.querySelector('#clear');

moods.forEach(mood => {
    mood.addEventListener('click', ()=> {
        if(mood.classList.contains('selected')){
            mood.classList.remove('selected');
            activeColour = defaultColour;
        }else{
            moods.forEach(mood => {
                mood.classList.remove('selected');
            });

            mood.classList.add('selected');
            activeColour = getComputedStyle(mood).getPropertyValue('color');
        }
    });
});

const getAllDays = year => {
    const firstDay = new Date(`January 1 ${year}`);
    const lastDay = new Date(`December 31 ${year}`);
    const days = [firstDay];

    let lastDayInArray = firstDay;

    while(lastDayInArray.getTime() !== lastDay.getTime()){
        days.push(addDays(lastDayInArray,1));
        lastDayInArray = days[days.length - 1];
    }

    return days;
};

const dates = getAllDays(currentYear);

let monthHTML = '';

month.forEach((month, idx) => {
    monthHTML += `<div class="month month_${idx}">
    <h3>${month}</h3>
    <div class="week_days_container">
    ${weekDays
        .map(day => `<div class="week_days">${day}</div>`)
        .join('')}
        </div>
        <div class="days_container"></div>
        </div>`;
});

calendar.innerHTML = monthHTML;

dates.forEach(date => {
    const month = date.getMonth();
    const monthEl = document.querySelector(`.month_${month} .days_container`);

    if(date.getDate() === 1 && date.getDay() !== 0){
        for(let i = 0; i < date.getDay(); i++){
            const emptySpot = createEmptySpot();
            monthEl.appendChild(emptySpot);
        }
    }
    const dateEl = createDateEl(date);
    monthEl.appendChild(dateEl);
});

const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
	circle.addEventListener('click', () => {
		circle.style.backgroundColor = activeColour;
	});
});

clear.addEventListener('click', () => {
	circles.forEach(circle => {
		circle.style.backgroundColor = defaultColour;
	});
});

function getRandomColor(){
    return colors[Math.floor(Math.random() * 5)];
}

function createDateEl(date){
    const day = date.getDate();
    const dateEl = document.createElement('div');
    dateEl.classList.add('days');
    dateEl.innerHTML = `<span class="circle">${day}</span>`;

    return dateEl;
}

function createEmptySpot(){
    const emptyEl = document.createElement('div');
    emptyEl.classList.add('days');

    return emptyEl;
}

function addDays(date,days){
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

