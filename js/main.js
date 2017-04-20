// default vars
let today = new Date(),
		days = 0,
		hours = 0,
		mins = 0,
		date = today,
		countdown,
		deadline,
		title = 'Countdown',
		message = 'Times up!',
		$title = document.getElementById('title'),
		$clock = document.getElementById('clock'),
		$message = document.getElementById('done-message'),
		tour = true;

// sets up today as a string for ?time and ?date
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd;}
if(mm<10){mm='0'+mm;}
var todayString = mm+'/'+dd+'/'+yyyy;

// adds splice for ?time adding ":" in "1230" = "12:30"
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

// grabs the URL variable, if it exists
function getUrlVar(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

// get hours & convert to days
if(getUrlVar('days')){
	days = getUrlVar('days') * 24 * 60 * 60 * 1000;
	deadline = new Date(Date.parse(new Date()) + days + hours + mins + 1000);
}
// get hours & convert to hours
if(getUrlVar('hours')){
	hours = getUrlVar('hours') * 60 * 60 * 1000;
	deadline = new Date(Date.parse(new Date()) + days + hours + mins + 1000);
}
// get mins & convert to mins
if(getUrlVar('mins')){
	mins = getUrlVar('mins') * 60 * 1000;
	deadline = new Date(Date.parse(new Date()) + days + hours + mins + 1000);
}
// get date
if(getUrlVar('date')){
	todayString = getUrlVar('date').replace(/-/g, "\/");
	deadline = new Date(Date.parse(new Date( todayString )));
}
// get military time
if(getUrlVar('time')){
	// todayString is either today or a future date
	todayString = todayString + " " + getUrlVar('time').splice(2, 0, ":");
	dealine = new Date(Date.parse(new Date( todayString )));
}
console.log(deadline);
////
// change the title
// @return void
////
function showTitle(){
	if(getUrlVar('title')){ title = decodeURIComponent( getUrlVar('title') ); }
	$title.innerHTML = title;
}
////
// show success message
// @return void
////
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
////
// initialize clock and look till done
// @var `id` of element on DOM
// @var `endtime` when to stop countdown
////
function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  var startTotal = getTimeRemaining(endtime).total;
  // update clock on DOM
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
////
// check if deadline is set
////
if(deadline){
	tour = false;
	showTitle();
	initializeClock('clock', deadline);
	progressJs().setOptions({ 'theme': 'blue' }).start().set(100);
	document.getElementsByClassName('wrap')[0].style.opacity = 0.5;
}
////
// start the tour
////
if(tour){
	// hide title
	$title.style.display = 'none';
	// hide clock
	$clock.style.display = 'none';
	// build tour for DOM injection
	$message.innerHTML = '<h1>Ready for a countdown?</h1>';
	$message.innerHTML += '<p>Pick a one below or <a href="https://github.com/chancesmith/quick-countdown/blob/master/README.md">read the instructions</a> to create your own countdown.</p>';
	$message.innerHTML += '<a class="btn" href="?mins=3">3 mins</a> ';
	$message.innerHTML += '<a class="btn" href="?mins=5">5 mins</a> ';
	$message.innerHTML += '<a class="btn" href="?hours=1">1 hour</a>';
}