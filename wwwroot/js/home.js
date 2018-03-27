// this file contains client side functions for the home page

// add datatable
var table = $("#dt").DataTable({
    searching: true,
    paging: false,
    ordering: false,
    order: [[ 1, "desc" ]],
    bLengthChange: false,
});
new $.fn.dataTable.Responsive( table, {} );

$("#search").keyup(function(){
    table.search( this.value ).draw();
});

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

var map;
var infoWindows = [];
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.434734, lng: -80.012025},
        zoom: 13,
        mapTypeControl: false
      });

    var card = document.getElementById('tablecontainer');
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(card);

    var arr = new Array();
    var shapes = $('#shapes').text()
    var shapesObject = $.parseJSON(shapes);
    shapesObject.forEach( function (points,i)
    {
        var oid = points[0].oid;
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

        // Create the bounds object
        var bounds = new google.maps.LatLngBounds();
        for (i = 0; i < arr.length; i++) {
            if (i > 0)
            {
                bounds.extend(arr[i]);
            }
        }

        shape.addListener('click', function() {
            for (var i=0;i<infoWindows.length;i++) {
                infoWindows[i].close();
            }
            map.setCenter(bounds.getCenter()); 
            map.setZoom(16);
            table.columns( 1 ).search( oid ).draw();
            href = $( "td" ).first().find( 'a' ).attr('href');
            href_formatted = '<a href="'+ href +'"><span style="font-size: 16px;">Report an issue</span></a>'
            facilityname = $ ( "td" ).eq(1).find( "#name" ).text();
            neighborhood = $ ( "td" ).eq(2).find( "#neighborhood" ).text();
            image = $ ( "td" ).eq(2).find( "#link" ).text();
            var content = "<div class='text-center'><img style='width:300px; border-radius: 10px 10px 10px 10px;' src=" + image + "><br/><br/><b>" + facilityname + "</b> <br/>" + neighborhood + "<br/>" + href_formatted + "</div>";
            var infoWindow = new google.maps.InfoWindow({
                content: content,
                center: bounds.getCenter(),
                position: bounds.getCenter()
            });
            infoWindows.push(infoWindow); 
            infoWindow.open(map);
            $( "td" ).css("background-color", "rgba(57, 172, 205, 0.03)");
          });
    });

    var header = document.getElementById('headercontainer');
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(header);
}