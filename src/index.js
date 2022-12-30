require('./style.css')
var moment = require('moment-timezone');

const eventTimerCore = (data) =>{
    console.log(data)
    const countDownDate = new Date(data.end).getTime()

    var currentTime = moment().tz(`${data.country}/${data.city}`).format();
    var endTime = moment.tz(data.end, `${data.country}/${data.city}`).format();

    if(moment(currentTime).isAfter(endTime)){
        return;
    }

    // header create
    var header = document.querySelector(data.el)

    //announcement bar wrap
    const announcementWrapper = document.createElement("div")
    announcementWrapper.classList.add('announcement-wrapper')
    header.insertBefore(announcementWrapper, header.firstChild)

    // announcement inner wrap
    const announcementInnerWrapper = document.createElement("div")
    announcementInnerWrapper.classList.add('announcement-inner-wrapper')
    announcementInnerWrapper.style.background = data.background
    announcementWrapper.appendChild(announcementInnerWrapper)

    // timer wrap
    const timerWrap = document.createElement("div")
    timerWrap.classList.add('timer-wrapper')
    announcementInnerWrapper.appendChild(timerWrap)

    // Title
    const title = document.createElement("h3")
    title.classList.add('counter-title')
    title.innerHTML = data.text
    announcementInnerWrapper.appendChild(title)

    //column
    for(var i = 1; i <= 4; i++){
        var column = document.createElement("div")
        column.classList.add('timer-column', 'timer-column-'+i)
        var columnText = document.createElement("p")
        columnText.innerHTML = '00';
        var columnHead = document.createElement("h4")
        column.appendChild(columnText)
        column.appendChild(columnHead)
        timerWrap.appendChild(column)
    }

    document.querySelector('.timer-column-1 h4').innerHTML = 'Days'
    document.querySelector('.timer-column-2 h4').innerHTML = 'Hours'
    document.querySelector('.timer-column-3 h4').innerHTML = 'Minutes'
    document.querySelector('.timer-column-4 h4').innerHTML = 'Seconds'

    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();
      
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
      
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        // Display the result in the elements
        document.querySelector('.timer-column-1 p').innerHTML = days.toLocaleString(undefined,{minimumIntegerDigits: 2})
        document.querySelector('.timer-column-2 p').innerHTML = hours.toLocaleString(undefined,{minimumIntegerDigits: 2})
        document.querySelector('.timer-column-3 p').innerHTML = minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})
        document.querySelector('.timer-column-4 p').innerHTML = seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})
      
        // If the count down is finished, write some text 
        if (distance < 0) {
          clearInterval(x);
          timerWrap.innerHTML = "EXPIRED";
        }
    }, 1000);
}

const eventTimerInit = (data) =>{
    addEventListener('DOMContentLoaded', (event) => {
        eventTimerCore(data);
    })
}

module.exports = {
    eventTimer: function (data) {
        new eventTimerInit(data);
    }
}