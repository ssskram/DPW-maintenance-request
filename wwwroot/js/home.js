// this file contains client side functions for the home page

// add datatable

// submission confirmation
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

var map, infoWindow;
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.450714, lng: -79.985514},
        zoom: 12,
      });

    var arr = new Array();
    var shapes = $('#shapes').text()
    var shapesObject = $.parseJSON(shapes);
    shapesObject.forEach( function (points,i)
    {
        arr = [];
        points.forEach( function (point, j)
        {
            arr.push(new google.maps.LatLng(
                parseFloat(point.Lat),
                parseFloat(point.Lng)
            ));
        });
        var shape = new google.maps.Polygon({
            paths: arr,
            strokeColor: '#FF0000',
            strokeOpacity: .7,
            strokeWeight: 4,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          });
          shape.setMap(map);
    });
    
}