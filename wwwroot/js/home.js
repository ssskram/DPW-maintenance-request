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

$( "#form" ).draggable();

var map;
var infoWindows = [];
function initMap() {

    var clickpolygon = function() {
        var center = $(this).parent().parent().find( "#centerrelay" ).text();
        center = center.replace(/[{()}]/g, '');
        alert(center);
        var commaPos = center.indexOf(',');
        var coordinatesLat = parseFloat(center.substring(0, commaPos));
        var coordinatesLong = parseFloat(center.substring(commaPos + 1, center.length));
        var centerPoint = new google.maps.LatLng(coordinatesLat, coordinatesLong)
        map.setCenter(centerPoint); 
        map.setZoom(16);
        href_formatted = '<a><span style="font-size: 16px;" onclick="openfromInfowindow()">Report an issue</span></a>'
        facilityname = $ ( "td" ).eq(1).find( "#name" ).text();
        neighborhood = $ ( "td" ).eq(2).find( "#neighborhood" ).text();
        image = $ ( "td" ).eq(2).find( "#link" ).text();
        var content = "<div class='text-center'><img style='width:300px; border-radius: 10px 10px 10px 10px;' src=" + image + "><br/><br/><b>" + facilityname + "</b> <br/>" + neighborhood + "<br/>" + href_formatted + "</div>";
        var infoWindow = new google.maps.InfoWindow({
            content: content,
            center: centerPoint,
            position: centerPoint
        });
        infoWindows.push(infoWindow); 
        infoWindow.open(map);
        $('#formname').val( facilityname );
        $("#back").show();
    }
    Array.from(tablebuttons).forEach(function(element) {
        element.addEventListener('click', clickpolygon);
    });

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.445982, lng: -79.997847},
        zoom: 13,
        clickableIcons: false,
        mapTypeControl: false
      });

    // reset map
    $('#back').on('click', function () {
        map.setCenter({lat: 40.445982, lng: -79.997847}); 
        map.setZoom(13);
        table.columns( 1 ).search("").draw();
        for (var i=0;i<infoWindows.length;i++) {
            infoWindows[i].close();
        }
        $("#back").hide();
        $("#form").hide();
    });

    var card = document.getElementById('tablecontainer');
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(card);

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

        // Associate bounds with OID p/ table item
        var center = bounds.getCenter();
        var relays = document.getElementsByClassName('centerrelay');
        Array.from(relays).forEach(function( element, i ) {
            if (element.innerHTML == oid)
            {
                element.innerHTML = center;
            }
          });

        shape.addListener('click', function() {
            for (var i=0;i<infoWindows.length;i++) {
                infoWindows[i].close();
            }
            map.setCenter(bounds.getCenter()); 
            map.setZoom(16);
            table.columns( 1 ).search( oid ).draw();
            href_formatted = '<a><span style="font-size: 16px;" onclick="openfromInfowindow()">Report an issue</span></a>'
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
            $('#formname').val( facilityname );
            $("#back").show();
          });
    });
    var bck = document.getElementById('back');
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(bck);
    var header = document.getElementById('headercontainer');
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(header);
    var frm = document.getElementById('form');
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(frm);
}

// handling table buttons
var tablebuttons = document.getElementsByClassName('tablebutton');
var getfacilityname = function() {
    // set facility name in form
    var name = $(this).parent().parent().find( "#name" ).text();
    $('#formname').val( name );
    table.columns( 1 ).search( name ).draw();
};
Array.from(tablebuttons).forEach(function(element) {
    element.addEventListener('click', getfacilityname);
});

function openfromInfowindow() {
    $("#form").show();
}

function submititem() {
    var data = $('#formdata').serialize();
    var cleandata = data.replace(/\'/g, '');
    $.ajax(
        {
            url: "/Home/Submit",
            type: 'POST',
            data: cleandata,
            success:function(result) {
                location.reload(true);
            },
            error: function(result) {
                alert("Failed to post.  Please try again.");
            }
        }
    );
}