'use strict';

var futureDate = moment("20160507", "YYYYMMDD").fromNow();
var provisionDate = moment(futureDate).subtract(90, "minutes");
var now = moment().format('YYYY,MM,DD H:mm:ss');
var in90min = moment().add(60, "minutes");
var till90 = moment(in90min).fromNow()
var a = moment();
var dur = a.to(in90min) // "in a day"
var clockState = 0;
var addFour = moment().add(4, "minutes");
var in4Min = moment(now).add(4, "minutes").format('YYYY/MM/DD H:mm:ss');
var in10Min = moment(now).add(10, "minutes").format('YYYY/MM/DD H:mm:ss');
var oneSecond = new Date().getTime() + 1000;

//set the 90 min clock
$('.date-btn').on("click", function() {
	if (clockState == 0) {
		$('#time-till-event').text(dur);
	    $('.launchable-in').addClass('hide');
	    $('.date-btn').addClass('hide');
	    $('.launch-now').removeClass('hide')
	    $('.launch-advice').removeClass('hide')

	} else if(clockState == 1){
		$('.launching-now').addClass('hide')
		$('.server-status').text('SERVER ONLINE')
		$('#server-status-bar').addClass('online')
		$('.online-for').countdown(oneSecond, {elapse: true})

		.on('update.countdown', function(event) {
		  var $this = $(this);
		  if (event.elapsed) {
		    $this.html(event.strftime('<span>%H:%M:%S</span>'));
		  } else {
		    $this.html(event.strftime('<span>%H:%M:%S</span>'));
		  }
		});
	} else if(clockState == 2) {
		$('#time-till-event').countdown(in10Min, function(event) {
   			$(this).html(event.strftime('%-M:%S'));
 		});
 		$('.btns1 a.edit').addClass('hide')
 		$('.btns1 a.start').removeClass('hide')
 		$('table tr:nth-child(2)').addClass('next-talk')
 		$('.date-btn').addClass('hide');
	}

    clockState += 1;
});

$('.launch-now').on('click', function(){
    $('.launch-now').addClass('hide')
    $('.launch-advice').addClass('hide')
    $('.launching-now').removeClass('hide')
    $('#server-status-bar').addClass('provisioning')
    $('.server-status').text('SERVER IS BEING LAUNCHED')
    $('.date-btn').removeClass('hide');

});

//main countdown
$('#time-till-event').text(futureDate)

//server countdown
$('#time-till-provisioning').text(futureDate)

//time till server is launched
$('.launching-now .timer').countdown(in4Min, function(event) {
   $(this).html(event.strftime('%-M:%S'));
 });

//Click Start Stream
$('.start').on('click', function(){
	$('.btns1 .stop').removeClass('hide');
	$(this).addClass('hide');
	$('table tr:nth-child(2) .live').removeClass('hide')
	$('table tr:nth-child(2) .stopped').addClass('hide')
	$('table tr:nth-child(2) td.soundbars-cell .soundbars').removeClass('hide');
	$('table tr:nth-child(2) td.talk-time').countdown(oneSecond, {elapse: true})

		.on('update.countdown', function(event) {
		  var $this = $(this);
		  if (event.elapsed) {
		    $this.html(event.strftime('<span>%H:%M:%S</span>'));
		  } else {
		    $this.html(event.strftime('<span>%H:%M:%S</span>'));
		  }
		});
});

//CLICK STOP stream
$('.stop').on('click', function(){
	if (confirm('Are you sure you want to stop the stream?')) {
    $('.btns1 .start').removeClass('hide');
	$(this).addClass('hide');
	$('table tr:nth-child(2) .stopped').removeClass('hide');
	$('table tr:nth-child(2) .live').addClass('hide')
	$('table tr:nth-child(2) td.soundbars-cell .soundbars').addClass('hide');
} else {
    // Do nothing!
}

});