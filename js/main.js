// default vars
let today = new Date(),
		days = 0,
		hours = 0,
		mins = 0,
		date = today,
		countdown,
		title = 'Countdown',
		message = 'Times up!',
		$title = document.getElementById('title'),
		$clock = document.getElementById('clock'),
		$message = document.getElementById('done-message'),
		tour = true;

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

function showTitle(){
	if(getUrlVar('title')){ title = decodeURIComponent( getUrlVar('title') ); }
	$title.innerHTML = title;
}

function showTimerDoneMessage(){
	// hide title
	$title.style.display = 'none';
	// hide clock
	$clock.style.display = 'none';
	// focus in .wrap
	document.getElementsByClassName('wrap')[0].style.opacity = 1;
	// add .done to <body>
	document.body.classList.add('done');

	if(getUrlVar('message')){ message = decodeURIComponent( getUrlVar('message') ); }
	$message.innerHTML = '<h1>' + message + '</h1>';
	$message.innerHTML += '<p>Let\'s <a href="./">cleanup</a>.</p>';
}

// post: https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
// source: http://codepen.io/SitePoint/pen/MwNPVq
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
  var startTotal = getTimeRemaining(endtime).total;

  function updateClock() {
    var t = getTimeRemaining(endtime);
    
    // update progress bar progress
    var currentPercentageLeft = Math.floor( t.total / startTotal * 100 );
    progressJs().set(currentPercentageLeft);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
      progressJs().end();
      showTimerDoneMessage();
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

if(mins || hours || days){
	tour = false;
	var deadline = new Date(Date.parse(new Date()) + days + hours + mins);
	showTitle();
	initializeClock('clock', deadline);
	progressJs().setOptions({ 'theme': 'blue' }).start().set(100);
	document.getElementsByClassName('wrap')[0].style.opacity = 0.2;
}

if(tour){
	// hide title
	$title.style.display = 'none';
	// hide clock
	$clock.style.display = 'none';

	$message.innerHTML = '<h1>Ready for a countdown?</h1>';
	$message.innerHTML += '<p>Pick a one below or <a href="https://github.com/chancesmith/quick-countdown/blob/master/README.md">read the instructions</a> to create your own countdown.</p>';
	$message.innerHTML += '<a class="btn" href="?mins=3">3 mins</a> ';
	$message.innerHTML += '<a class="btn" href="?mins=5">5 mins</a> ';
	$message.innerHTML += '<a class="btn" href="?hours=1">1 hour</a>';
}