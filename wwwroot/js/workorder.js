// this document contains the client side functions for New/WorkOrder.cshtml

// call google map
// geocode address
var map, infoWindow;
var lat = parseFloat(document.getElementById('lat').value);
var lng = parseFloat(document.getElementById('long').value);
var lat_lng = {lat: lat, lng: lng};
var address = document.getElementById('address').value;
var name = document.getElementById('name').value;
var link = document.getElementById('img').value;
var content = "<img style='width:300px; border-radius: 10px 10px 10px 10px;' src=" + link + "><br/><br/><b>" + name + "</b> <br/>" + address;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: lat_lng,
        zoom: 18
      });
    var infoWindow = new google.maps.InfoWindow({
        content: content,
        center: lat_lng,
        position: lat_lng
    });
    infoWindow.open(map);
    var frm = document.getElementById('form');
    var bck = document.getElementById('back');
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(frm);
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(bck);
}

$( "#form" ).draggable();