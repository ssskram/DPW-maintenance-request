// this document contains the client side functions for New/WorkOrder.cshtml

// call google map
// geocode address
var map, infoWindow;
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.426150, lng: -79.986672},
        zoom: 11
      });
}