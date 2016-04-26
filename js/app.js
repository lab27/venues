'use strict';

var stateMsg1 = "One hour before event.";
var stateMsg2 = "~10 Minutes before event.";
var serverOn = false;

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
	    $('.server-start-button').removeClass('disabled')
	    $('.launch-advice').removeClass('hide')
	    $('.server-panel .badge').removeClass('neutral').addClass('warning').text('!')
	    if ($('select').val() == 'none') {
			$('.device-panel .badge').removeClass('neutral').addClass('warning').text('!')
		}


	} else if(clockState == 1){
		$('.server-progress').addClass('hide')
 	 	$('.server-bitrate').text('25')

		
		if ($('select').val() == 'vr') {
			$('.clock-label .badge').removeClass('secondary').addClass('warning').text('!')
 	 		$('.talk-panel .button').removeClass('disabled').addClass('success')
 	 		$('.soundbars').addClass('signal');
		}

	
 	 	

 	 	$('.server-panel .badge').removeClass('warning').addClass('success').html('&#x2713;')
 	 	serverOn = true
 	 	
		$('.phase3').removeClass('hide')
		$('.talk-phase1').addClass('hide')
		$('.talk-phase2').removeClass('hide')
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

 		$('.callout').removeClass('hide')
 		// $('.clock-msg').addClass('hide')
 		//$('.date-btn').addClass('hide');
		$('.state-msg').text(stateMsg2);

		insideTenMin = true;
		
		$('.talk-panel .badge').removeClass('neutral').addClass('warning').text('!')
		if ($('select').val() == 'none') {
			$('.device-panel .badge').removeClass('warning').addClass('alert')
		} else if ($('select').val() == 'vr') {
			
			$('.start').removeClass('disabled')
			$('.start').addClass('success')

		}

	} else if(clockState == 3) {
		$('.callout h5').text("You wanna be startin' somethin'?")
		$('.callout').removeClass('hide').removeClass('warning').addClass('alert')

		// $('.clock-msg').countdown(oneSecond, {elapse: true}).on('update.countdown', function(event) {
		//   var $this = $(this);
		//   if (event.elapsed) {
		//     $this.html(event.strftime('<span>%S ago</span>'));
		//   } else {
		//     $this.html(event.strftime('<span>%H:%M:%S ass</span>'));
		//   }
		// });
		$('.clock-msg').addClass('hide')
		$('.ago-msg').removeClass('hide').html("1 minute ago")
		$(this).addClass('hide')
	}

    clockState += 1;
});

// select change
$('select').change(function(){
  if($(this).val() == 'vr'){ 
    $('.device-panel .badge').removeClass('neutral').removeClass('warning').removeClass('alert').addClass('success').html('&#x2713;')
  } else if ($(this).val() == 'none') {
  	 $('.device-panel .badge').removeClass('success').removeClass('alert').addClass('warning').html('!')
  } else if ($(this).val() == 'new') {
  	$('#device-modal').foundation('open');
  }
  $('.soundbars').addClass('signal');
  $('.listeners').removeClass('hide')
  if (insideTenMin == true) {
  		$('.soundbars').addClass('signal');
  }

  if (serverOn == true) {
  	$('.talk-phase2 .button').removeClass('disabled')
  }

});




//turn server on
$('.server-start-button').on('click',function(){
	$(this).hide()
	$('.server-progress').removeClass('hide')
	$('.phase1').addClass('hide')
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
	// $('.talk-stop-button').removeClass('hide');
	$(this).addClass('hide');
	$('.on-air').addClass('success').addClass('animate-flicker').text('ON AIR')
	$('.talk-panel .badge').removeClass('warning').addClass('success').html('&#x2713;')
	$('.talk-progress').removeClass('hide')
	$('.talk-phase2').addClass('hide')
	$('.callout').addClass('hide')
	$('.top-bar').addClass('topbar-on-air')
	$('.talk-panel .progress-meter-text').countdown(oneSecond, {elapse: true}).on('update.countdown', function(event) {
		  var $this = $(this);
		  if (event.elapsed) {
		    $this.html(event.strftime('<span>%H:%M:%S</span>'));
		  } else {
		    $this.html(event.strftime('<span>%H:%M:%S</span>'));
		  }
		});
});

//CLICK STOP stream
$('.talk-stop-button').on('click', function(){
    $('.talk-start-button').removeClass('hide');
	$(this).addClass('hide');
	$('.top-bar').removeClass('topbar-on-air')
	$('.top-bar').addClass('topbar-off-air')

	$('.on-air').removeClass('success').removeClass('animate-flicker').text('OFF AIR')
	$('.talk-panel .badge').removeClass('success').addClass('warning').html('!')
	$('.stopped').removeClass('hide');
	$('.soundbars').removeClass('signal');
});

//close the callout
$('.callout').on('click', function(){
	$(this).addClass('hide')
});
