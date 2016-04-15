'use strict';

var futureDate = moment("20160507", "YYYYMMDD").fromNow();
var provisionDate = moment(futureDate).subtract(90, "minutes");
var now = moment().format('YYYY,MM,DD H:mm:ss');
var in90min = moment().add(90, "minutes");
var till90 = moment(in90min).fromNow()
var a = moment();
var dur = a.to(in90min) // "in a day"

//set the 90 min clock
$('.date-btn').on("click", function() {
    $('#getting-started').text(dur);
    $('#server-status-bar').addClass("provisionable");
    $('#server-status-bar .status').html('<a href="#" class="button success">Launch Now!</a>');


});

$('#getting-started').text(futureDate)

$('#time-till-provisioning').text(futureDate)




$(document).foundation();