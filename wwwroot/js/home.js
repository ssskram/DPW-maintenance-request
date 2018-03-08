// this file contains client side functions for the home page

$(document).ready(function () {
    var status = $('#status').text();
    if ( status == "Success" )
    {
        $( "#dialog" ).dialog();
    }
});