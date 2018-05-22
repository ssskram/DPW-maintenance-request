/// globals

// helper container
var helper = document.getElementById('helper');

// map stuff
var map;
var infoWindows = [];
var infoWindow;

// issue type collections
var windowsType = [];
windowsType.push("window");
windowsType.push("stuff");
windowsType.push("here");
var gasType = [];
gasType.push("gas");
gasType.push("stuff");
gasType.push("here");

// get em
function usersitems() {
    helper.innerHTML = "Your requests"
    var aWidth = $(window).width();
    if (aWidth > 1000) {
        var Width = aWidth * 0.6;
    } else if (aWidth > 800) {
        var Width = aWidth * 0.8;
    } else if (aWidth < 800) {
        var Width = aWidth * .98;
    }
    $("#dialog").dialog({
        width: Width,
        height: 'auto',
        modal: true,
        close: function () {
            helper.innerHTML = "Select a facility from the map, <br/> or search the table"
        }
    });
}
// if existent, throw user user's items on startup
var items = $('#items').text();
if (items > 0) {
    usersitems();
}

// do that map thang
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.445982,
            lng: -79.997847
        },
        zoom: 13,
        clickableIcons: false,
        mapTypeControl: false
    });

    // push things where they need to be
    var card = document.getElementById('tablecontainer');
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(card);
    var header = document.getElementById('helpercontainer');
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(header);
    var frm = document.getElementById('form');
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(frm);

    // add shapes
    var arr = new Array();
    var shapes = $('#shapes').text()
    var shapesObject = $.parseJSON(shapes);
    shapesObject.forEach(function (points, i) {
        var oid = points[0].oid;
        arr = [];
        points.forEach(function (point, j) {
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
            fillColor: 'rgb(44, 62, 80)',
            fillOpacity: 0.2
        });
        shape.setMap(map);

        // Create the bounds object
        var bounds = new google.maps.LatLngBounds();
        for (i = 0; i < arr.length; i++) {
            if (i > 0) {
                bounds.extend(arr[i]);
            }
        }
        // Associate bounds with OID p/ table item
        var center = bounds.getCenter();
        var relays = document.getElementsByClassName('centerrelay');
        Array.from(relays).forEach(function (element, i) {
            if (element.innerHTML == oid) {
                element.innerHTML = center;
            }
        });

        // polygon click events
        shape.addListener('click', function () {
            $('#search').val(null);
            $('#search').keyup();
            table.search("").draw();
            for (var i = 0; i < infoWindows.length; i++) {
                infoWindows[i].close();
            }
            map.setCenter(bounds.getCenter());
            map.setZoom(16);
            table.columns(1).search(oid).draw();
            href_formatted = '<a><span style="font-size: 22px;" onclick="openfromInfowindow()">Report an issue</span></a>'
            facilityname = $("td").eq(1).find("#name").text();
            neighborhood = $("td").eq(2).find("#neighborhood").text();
            image = $("td").eq(2).find("#link").text();
            var content = "<div class='text-center'><img style='width:300px; border-radius: 10px 10px 10px 10px;' src=" + image + "><br/><br/><b>" + facilityname + "</b> <br/>" + neighborhood + "<br/>" + href_formatted + "</div>";
            var infoWindow = new google.maps.InfoWindow({
                content: content,
                center: bounds.getCenter(),
                position: bounds.getCenter()
            });
            infoWindows.push(infoWindow);
            infoWindow.open(map);
            helper.innerHTML = "Not the one?<br/><a onclick='back()'><font style='color:white;'>Click here to start over</font></a>"
            $('#formname').val(facilityname);
        });
    });
}

// auto expand textarea height to fit contents
function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25 + o.scrollHeight) + "px";
}

// form validation
$("#formdata").validate({
    messages: {
        Issue: 'This field is required'
    }
});
var validator = $("#formdata").validate();
$("#Issue").change(function () {
    validator.element("#Issue");
});

// make things draggable
$("#form").draggable();

// add event listeners for overlay trigger, networked activity
var classname = document.getElementsByClassName('overlaytrigger');
var overlay = function () {
    document.getElementById('overlayloader').style.display = 'flex';
};
Array.from(classname).forEach(function (element) {
    element.addEventListener('click', overlay);
});

// add datatables
var table = $("#dt").DataTable({
    searching: true,
    paging: false,
    ordering: false,
    order: [
        [0, "desc"]
    ],
    bLengthChange: false,
});
new $.fn.dataTable.Responsive(table, {});
$.fn.dataTable.moment('MM/DD/YYYY HH:mm');
var othertable = $("#dtui").DataTable({
    pageLength: 5,
    searching: true,
    paging: true,
    pagingType: "simple",
    ordering: true,
    order: [
        [0, "desc"]
    ],
    bLengthChange: false,
    columnDefs: [{
            orderable: false,
            targets: 2
        },
        {
            orderable: false,
            targets: 3
        }
    ],
    language: {
        emptyTable: "You have not submitted any maintenance requests"
    }
});
new $.fn.dataTable.Responsive(othertable, {});

// add event listeners for table buttons 
var tablebuttons = document.getElementsByClassName('tablebutton');
var getfacilityname = function () {
    // set facility name in form
    var name = $(this).parent().parent().find("#name").text();
    $('#formname').val(name);
    table.columns(1).search(name).draw();
};
// table item click events
var clickpolygon = function () {
    var center = $(this).parent().parent().find("#centerrelay").text();
    center = center.replace(/[{()}]/g, '');
    var commaPos = center.indexOf(',');
    var coordinatesLat = parseFloat(center.substring(0, commaPos));
    var coordinatesLong = parseFloat(center.substring(commaPos + 1, center.length));
    var centerPoint = new google.maps.LatLng(coordinatesLat, coordinatesLong)
    map.setCenter(centerPoint);
    map.setZoom(16);
    href_formatted = '<a><span style="font-size: 22px;" onclick="openfromInfowindow()">Report an issue</span></a>'
    facilityname = $("td").eq(1).find("#name").text();
    neighborhood = $("td").eq(2).find("#neighborhood").text();
    image = $("td").eq(2).find("#link").text();
    var content = "<div class='text-center'><img style='width:300px; border-radius: 10px 10px 10px 10px;' src=" + image + "><br/><br/><b>" + facilityname + "</b> <br/>" + neighborhood + "<br/>" + href_formatted + "</div>";
    var infoWindow = new google.maps.InfoWindow({
        content: content,
        center: centerPoint,
        position: centerPoint
    });
    infoWindows.push(infoWindow);
    infoWindow.open(map);
    helper.innerHTML = "Not the one?<br/><a onclick='back()'><font style='color:white;'>Click here to start over</font></a>"
    $('#formname').val(facilityname);
}
Array.from(tablebuttons).forEach(function (element) {
    element.addEventListener('click', getfacilityname);
    element.addEventListener('click', clickpolygon);
});


// filter table on search
$("#search").keyup(function () {
    table.search(this.value).draw();
});

// back function
var back = function () {
    table.columns(1).search("").draw();
    for (var i = 0; i < infoWindows.length; i++) {
        infoWindows[i].close();
    }
    $('#search').val(null);
    $('#search').keyup();
    table.search("").draw();
    $("#form").hide();
    table.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
    helper.innerHTML = "Select a facility from the map, <br/> or search the table"
    map.setCenter({
        lat: 40.445982,
        lng: -79.997847
    });
    map.setZoom(13);
};

// instantiate helper container
function openfromInfowindow() {
    helper.innerHTML = "Describe the issue,<br/> and submit your request"
    $("#form").show();
}

// for each issue type, populate issues dropdown respectively
function populateissues() {

    // destroy existing options
    var select = document.getElementById("Issue");
    var i;
    for (i = select.options.length - 1 ; i >= 0 ; i--) {
        select.remove(i);
    }

    // get and process new type
    var item = $('#IssueType').val();
    index = 0;
    switch (item) {
        case 'Broken Window':
            for (val of windowsType) {
                var opt = document.createElement("option");
                opt.value = index;
                opt.innerHTML = val;
                select.add(opt);
                index++;
            }
            break;
        case 'Gas Odor':
            for (val of gasType) {
                var opt = document.createElement("option");
                opt.value = index;
                opt.innerHTML = val;
                select.add(opt);
                index++;
            }
    }
    $('.selectpicker').selectpicker('refresh');
}

// for certain issues, throw contact information
function throwcontacts() {
    var item = $('#Issue').val();
    prompt = document.getElementById('alternativeprompt');
    if (item == "Pest Control" || item == "Elevators") {
        prompt.innerHTML = "Please contact John Sibbet at <br><b>412-600-6106</b>"
        $('#alternativeprompt').show();
        $('#formfields').hide();
    } else if (item == "Tree Issues") {
        prompt.innerHTML = "Please contact DPW Forestry at <br><b>412-665-3625</b>"
        $('#alternativeprompt').show();
        $('#formfields').hide();
    } else if (item == "Masonry/Concrete Work") {
        prompt.innerHTML = "Please contact DPW Construction at <br><b>412-782-7631</b>"
        $('#alternativeprompt').show();
        $('#formfields').hide();
    } else if (item == "Landscape Maintenance (Snow or Leaves)") {
        prompt.innerHTML = "Please contact the DPW Parks division that services your area:<br><b><a href='http://pittsburghpa.gov/dpw/park-maintenance/index.html'>Maintenance Regions</a></b>"
        $('#alternativeprompt').show();
        $('#formfields').hide();
    } else if (item == "Door Name Lettering") {
        prompt.innerHTML = "Please contact DOMI Sign Shop at <br><b>412-255-2872</b>"
        $('#alternativeprompt').show();
        $('#formfields').hide();
    } else if (item == "Office Renovation") {
        prompt.innerHTML = "Please contact Chris Hornstein at <br><b>412-255-2498</b> or at<br>chirs.hornstein@pittsburghpa.gov"
        $('#alternativeprompt').show();
        $('#formfields').hide();
    } else {
        $('#alternativeprompt').hide();
        $('#formfields').show();
    }
}

function submititem() {
    if ($("#formdata").valid()) {
        document.getElementById('overlayloader').style.display = 'flex';
        helper.innerHTML = "Sending your request to <br/> someone who can help"
        var data = $('#formdata').serialize();
        var cleandata = data.replace(/\'/g, '');
        $.ajax({
            url: "/Home/Submit",
            type: 'POST',
            data: cleandata,
            success: function (result) {
                location.reload(true);
            },
            error: function (result) {
                alert("Failed to post.  Please try again.");
            }
        });
    }
}

$("#mystuff").click(function (e) {
    back();
});