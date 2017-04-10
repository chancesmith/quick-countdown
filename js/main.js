// default vars
let today = new Date(),
		days = 0,
		hours = 0,
		mins = 0, 
		date = today,
		countdown;

function getUrlVar(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

// get hours & convert to days
if(getUrlVar('days')){ days = getUrlVar('days') * 24 * 60 * 60 * 1000; }
// get hours & convert to hours
if(getUrlVar('hours')){ hours = getUrlVar('hours') * 60 * 60 * 1000; }
// get mins & convert to mins
if(getUrlVar('mins')){ mins = getUrlVar('mins') * 60 * 1000; }
// get date
//if(getUrlVar('date')){ date = getUrlVar('date') * 60 * 60 * 1000; }

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + days + hours + mins);
initializeClock('clock', deadline);