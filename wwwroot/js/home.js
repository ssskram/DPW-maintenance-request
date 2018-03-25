// this file contains client side functions for the home page

$(document).ready(function () {
    var status = $('#status').text();
    if ( status == "Success" )
    {
        $( "#dialog" ).dialog({
            width: 450,
            height: 205
        });
    }
});

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.450714, lng: -79.985514},
        zoom: 12,
        disableDefaultUI: true
      });
}