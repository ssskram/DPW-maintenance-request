// show overlay spinner on network activity
// just add class "overlaytrigger" to buttons for this to pop off
var classname = document.getElementsByClassName('overlaytrigger');
var overlay = function() {
    document.getElementById('overlayloader').style.display = 'flex';
};
Array.from(classname).forEach(function(element) {
    element.addEventListener('click', overlay);
});