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

//set the 90 min clock
$('.date-btn').on("click", function() {
	if (clockState == 0) {
		$('#time-till-event').text(dur);
	    // $('#server-status-bar').addClass("provisionable");
	    $('.status').addClass('hide');
	    $('.launch-now').removeClass('hide')
	} else if(clockState == 1){
		$('.launching').addClass('hide')
		$('.server').text('SERVER ONLINE')
		$('#server-status-bar').addClass('online')
	} else if(clockState == 2) {
		$('#time-till-event').countdown(in10Min, function(event) {
   			$(this).html(event.strftime('%-M:%S'));
 		});
 		$('.btns1 a.edit').addClass('hide')
 		$('.btns1 a.start').removeClass('hide')
 		$('table tr:nth-child(2)').addClass('next-talk')
	}

    clockState += 1;
});

$('.launch-now').on('click', function(){
    $('.launch-now').addClass('hide')
    $('.launching').removeClass('hide')
});

$('#time-till-event').text(futureDate)

$('#time-till-provisioning').text(futureDate)

$('.launching .timer').countdown(in4Min, function(event) {
   $(this).html(event.strftime('%-M:%S'));
 });