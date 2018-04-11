// this file contains client side functions for the home page

var helper = document.getElementById('helper');
var map;
var infoWindows = [];

// user's items
var items = $('#items').text();
if ( items > 0 )
{
    helper.innerHTML = "Your requests"
    var aWidth = $(window).width(); 
    var Width = aWidth * 0.7;
    $( "#dialog" ).dialog({
        width: Width,
        height: 'auto',
        modal: true,
        close: function () {
            helper.innerHTML = "Select a facility from the map, <br/> or search the table"
        }
    });
}

$("#search").keyup(function(){
    table.search( this.value ).draw();
});

$( "#form" ).draggable();

// add datatables
var table = $("#dt").DataTable({
    searching: true,
    paging: false,
    ordering: false,
    order: [[ 1, "desc" ]],
    bLengthChange: false,
});
new $.fn.dataTable.Responsive( table, {} );
$.fn.dataTable.moment( 'MM/DD/YYYY HH:mm');
var othertable = $("#dtui").DataTable({
    pageLength : 5,
    searching: true,
    paging: true,
    ordering: true,
    order: [[ 0, "desc" ]],
    bLengthChange: false,
    columnDefs: [
        { orderable: false, targets: 2 },
        { orderable: false, targets: 3 }
    ]
});
new $.fn.dataTable.Responsive( othertable, {} );

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.445982, lng: -79.997847},
        zoom: 13,
        clickableIcons: false,
        mapTypeControl: false
      });

      // form validation
    $("#formdata").validate({
        messages: {
            Issue: 'This field is required'
        }
    });
    var validator = $( "#formdata" ).validate();
    $( "#Issue" ).change(function() {
        validator.element("#Issue");
    });
    
    // reset app
    $('#back').on('click', function () {
        map.setCenter({lat: 40.445982, lng: -79.997847}); 
        map.setZoom(13);
        table.columns( 1 ).search("").draw();
        for (var i=0;i<infoWindows.length;i++) {
            infoWindows[i].close();
        }
        $('#search').val(null);
        $('#search').keyup();
        table.search("").draw();
        $("#back").hide();
        $("#form").hide();
        table.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
        helper.innerHTML = "Select a facility from the map, <br/> or search the table"
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
            strokeColor: 'rgb(0, 51, 255)',
            strokeOpacity: .6,
            strokeWeight: 4,
            fillColor: 'rgb(0, 51, 255)',
            fillOpacity: 0.2
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

        // polygon click events
        shape.addListener('click', function() {
            $('#search').val(null);
            $('#search').keyup();
            table.search("").draw();
            for (var i=0;i<infoWindows.length;i++) {
                infoWindows[i].close();
            }
            map.setCenter(bounds.getCenter()); 
            map.setZoom(16);
            table.columns( 1 ).search( oid ).draw();
            href_formatted = '<a><span style="font-size: 22px;" onclick="openfromInfowindow()">Report an issue</span></a>'
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
            helper.innerHTML = "This the one?<br/><a onclick='openfromInfowindow()'><font style='color:white;'>Report the issue</font></a>"
            $('#formname').val( facilityname );
            $("#back").show();
          });
    });

    // table item click events
    var clickpolygon = function() {
        var center = $(this).parent().parent().find( "#centerrelay" ).text();
        center = center.replace(/[{()}]/g, '');
        var commaPos = center.indexOf(',');
        var coordinatesLat = parseFloat(center.substring(0, commaPos));
        var coordinatesLong = parseFloat(center.substring(commaPos + 1, center.length));
        var centerPoint = new google.maps.LatLng(coordinatesLat, coordinatesLong)
        map.setCenter(centerPoint); 
        map.setZoom(16);
        href_formatted = '<a><span style="font-size: 22px;" onclick="openfromInfowindow()">Report an issue</span></a>'
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
        helper.innerHTML = "This the one?<br/><a onclick='openfromInfowindow()'><font style='color:white;'>Report the issue</font></a>"
        $('#formname').val( facilityname );
        $("#back").show();
    }
    Array.from(tablebuttons).forEach(function(element) {
        element.addEventListener('click', clickpolygon);
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
    helper.innerHTML = "Describe the issue,<br/> and submit your request"
    $("#form").show();
}

function submititem() {
    if ($("#formdata").valid()) {
        document.getElementById('overlayloader').style.display = 'flex';
        helper.innerHTML = "Sending your request to <br/> someone who can help"
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
}