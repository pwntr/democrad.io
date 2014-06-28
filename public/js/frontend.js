// on document ready
$(function() {
    


});

var serverURL = 'http://127.0.0.1:3000';
    
var url = 'http://1live.akacast.akamaistream.net/7/706/119434/v1/gnl.akacast.akamaistream.net/1live';


function playStationWithID(id) {

    console.log('started playing station ' + id);

    // send it to the web app
    $.get(serverURL + "/radio/" + id, function(data) {
        // nothing to do here
    });

}

function changeVolume(volume) {

    // send it to the web app
    $.get(serverURL + "/radio/volume/" + volume, function(data) {
        // nothing to do here
    });

}



$(document).on('click', '.list-group-item', function(event) {

    // get the station ID
    var station = $(this).attr('id');

    playStationWithID(station);

    // disable jumping back to the top # anchor when clicking on a link or button
    event.preventDefault();
    return false;

});

$('#stopAudio').click(function() {
    $.get(serverURL + "/radio/end");
    // disable jumping back to the top # anchor when clicking on a link or button
    event.preventDefault();
    return false;
});



$('#volumeSlider').slider({
	formater: function(value) {
		return value + ' %';
	}
});



$('#volumeSlider').on('slideStop', function(event){
    console.log('volume changed to ' + event.value + '%');
    changeVolume(event.value);
});