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
	    $('.server-start-button').removeClass('hide')
	    $('.launch-advice').removeClass('hide')
	    // $('.switch').removeClass('disabled')
	    $('.server-panel .badge').removeClass('neutral').addClass('warning').text('!')
	    if ($('select').val() == 'none') {
			$('.device-panel .badge').removeClass('neutral').addClass('warning').text('!')
		}


	} else if(clockState == 1){
		$('.server-progress').addClass('hide')
		// $('.server-status').text('SERVER ONLINE')
		//$('#server-status-bar').addClass('online')
 	 	//$('.switch').removeClass('starting')
 	 	//$('.switch-active').text('Online')
 	 	$('.server-bitrate').text('25')

		
		if ($('select').val() == 'vr') {
			$('.clock-label .badge').removeClass('secondary').addClass('warning').text('!')
 	 		$('.talk-panel .button').removeClass('disabled').addClass('success')
 	 		$('.soundbars').addClass('signal');
		}

	
 	 	

 	 	$('.server-panel .badge').removeClass('warning').addClass('success').html('&#x2713;')
 	 	
		$('.online-for').removeClass('hide')
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
 		$('.clock-msg').addClass('hide')
 		$('.talk-start-button').removeClass('hide')
 		$('.date-btn').addClass('hide');
		$('.state-msg').text(stateMsg2);

		insideTenMin = true;
		
		$('.talk-panel .badge').removeClass('neutral').addClass('warning').text('!')
		if ($('select').val() == 'none') {
			$('.device-panel .badge').removeClass('warning').addClass('alert')
		} else if ($('select').val() == 'vr') {
			
			$('.start').removeClass('disabled')
			$('.start').addClass('success')

		}

	}

    clockState += 1;
});

// select change
$('select').change(function(){
  if($(this).val() == 'vr'){ 
    $('.device-panel .badge').removeClass('neutral').removeClass('warning').addClass('success').html('&#x2713;')
  } else if ($(this).val() == 'none') {
  	 $('.device-panel .badge').removeClass('success').removeClass('alert').addClass('warning').html('!')
  } else if ($(this).val() == 'new') {
  	$('#device-modal').foundation('open');
  }
  $('.soundbars').addClass('signal');
  if (insideTenMin == true) {
  		$('.soundbars').addClass('signal');
		$('.start').removeClass('disabled')
  }
});




//turn server on
$('.server-start-button').on('click',function(){
	$(this).hide()
	$('.server-progress').removeClass('hide')
	$('.launch-advice').addClass('hide')
    $('.launching-now').removeClass('hide')
    $('.date-btn').removeClass('hide');
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
$('.talk-start-button').on('click', function(){
	$('.talk-stop-button').removeClass('hide');
	$(this).addClass('hide');
	$('.streaming').removeClass('hide')
	$('.talk-panel .badge').removeClass('warning').addClass('success').html('&#x2713;')
	// $('table tr:nth-child(2) .live').removeClass('hide')
	// $('table tr:nth-child(2) .stopped').addClass('hide')
	//$('table tr:nth-child(2)').removeClass('next-talk').addClass('streaming')
	// $('table tr:nth-child(2) td.talk-time').countdown(oneSecond, {elapse: true}).on('update.countdown', function(event) {
	// 	  var $this = $(this);
	// 	  if (event.elapsed) {
	// 	    $this.html(event.strftime('<span>%H:%M:%S</span>'));
	// 	  } else {
	// 	    $this.html(event.strftime('<span>%H:%M:%S</span>'));
	// 	  }
	// 	});
});

//CLICK STOP stream
$('.talk-stop-button').on('click', function(){
    $('.talk-start-button').removeClass('hide');
	$(this).addClass('hide');
	$('.streaming').addClass('hide')
	$('.clock-label .badge').removeClass('success').addClass('alert').html('!')
	$('.stopped').removeClass('hide');
	$('.soundbars').removeClass('signal');
	//$('table tr:nth-child(2)').removeClass('streaming').addClass('interrupted')



});