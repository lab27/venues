'use strict';

var stateMsg1 = "One hour before event.";
var stateMsg2 = "~10 Minutes before event.";

var insideTenMin = false;

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
var inOneHour = moment(now).add(60, "minutes").format('YYYY/MM/DD H:mm:ss');
var oneSecond = new Date().getTime() + 1000;

//set the 90 min clock
$('.date-btn').on("click", function() {
	if (clockState == 0) {
		$('.clock-msg').countdown(inOneHour, function(event) {
   			$(this).html(event.strftime('%-M:%S'));
 		});
		$('.state-msg').text(stateMsg1);
	    $('.launchable-in').addClass('hide');
	    $('.date-btn').addClass('hide');
	    $('.start-now').removeClass('hide')
	    $('.launch-advice').removeClass('hide')
	    $('.switch').removeClass('disabled')
	    $('.server-label .badge').removeClass('secondary').addClass('warning').text('!')

	} else if(clockState == 1){
		$('.launching-now').addClass('hide')
		// $('.server-status').text('SERVER ONLINE')
		//$('#server-status-bar').addClass('online')
 	 	$('.switch').removeClass('starting')
 	 	$('.switch-active').text('Online')
		
		if ($('select').val() == 'vr') {
			$('.clock-label .badge').removeClass('secondary').addClass('warning').text('!')
 	 		$('.main-clock .button').removeClass('disabled').addClass('success')
		}

	
 	 	

 	 	$('.server-label .badge').removeClass('warning').addClass('success').html('&#x2713;')
		$('.online-for').countdown(oneSecond, {elapse: true}).on('update.countdown', function(event) {
		  var $this = $(this);
		  if (event.elapsed) {
		    $this.html(event.strftime('<span>%H:%M:%S</span>'));
		  } else {
		    $this.html(event.strftime('<span>%H:%M:%S</span>'));
		  }
		});
	} else if(clockState == 2) {
		$('.clock-msg').countdown(in10Min, function(event) {
   			$(this).html(event.strftime('%-M:%S'));
 		});
 		$('.btns1 a.edit').addClass('hide')
 		$('.btns1 a.start').removeClass('hide')
 		$('table tr:nth-child(2)').addClass('next-talk')
 		$('.date-btn').addClass('hide');
		$('.state-msg').text(stateMsg2);

		insideTenMin = true;
		

		if ($('select').val() == 'none') {
			$('.device-label .badge').removeClass('warning').addClass('alert')
		} else if ($('select').val() == 'vr') {
			$('.soundbars').addClass('signal');
			$('.start').removeClass('disabled')
			$('.start').addClass('success')

		}

	}

    clockState += 1;
});

// select change
$('select').change(function(){
  if($(this).val() == 'vr'){ 
    $('.device-label .badge').removeClass('warning').removeClass('alert').addClass('success').html('&#x2713;')
  } else if ($(this).val() == 'none') {
  	 $('.device-label .badge').removeClass('success').removeClass('alert').addClass('warning').html('!')
  } else if ($(this).val() == 'new') {
  	$('#device-modal').foundation('open');
  }
  if (insideTenMin == true) {
  		$('.soundbars').addClass('signal');
		$('.start').removeClass('disabled')
  }
});


// Flip server switch
$('.switch-input').change(function() {
    if(this.checked) {
    $('.start-now').addClass('hide')
    $('.launch-advice').addClass('hide')
    $('.launching-now').removeClass('hide')
    $('.date-btn').removeClass('hide');
    }
});



//main countdown
$('.clock-msg').text(futureDate)

//server countdown
$('#time-till-provisioning').text(futureDate)

//time till server is launched
$('.launching-now .timer').countdown(in4Min, function(event) {
   $(this).html(event.strftime('%-M:%S'));
 });

//Click Start Stream
$('.start').on('click', function(){
	$('.stop').removeClass('hide');
	$(this).addClass('hide');
	$('.venue-title .label').removeClass('hide')
	$('.clock-label .badge').removeClass('warning').addClass('success').html('&#x2713;')
	$('table tr:nth-child(2) .live').removeClass('hide')
	$('table tr:nth-child(2) .stopped').addClass('hide')
	//$('table tr:nth-child(2)').removeClass('next-talk').addClass('streaming')
	$('table tr:nth-child(2) td.talk-time').countdown(oneSecond, {elapse: true}).on('update.countdown', function(event) {
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
    $('.start').removeClass('hide');
	$(this).addClass('hide');
	$('.venue-title .label').addClass('hide')
	$('.clock-label .badge').removeClass('success').addClass('alert').html('!')
	$('table tr:nth-child(2) .stopped').removeClass('hide');
	$('table tr:nth-child(2) .live').addClass('hide')
	$('.soundbars').removeClass('signal');
	//$('table tr:nth-child(2)').removeClass('streaming').addClass('interrupted')

} else {
    // Do nothing!
}

});