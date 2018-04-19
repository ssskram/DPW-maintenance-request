// show overlay spinner on network activity
var classname = document.getElementsByClassName('overlaytrigger');
var overlay = function() {
    document.getElementById('overlayloader').style.display = 'flex';
};
Array.from(classname).forEach(function(element) {
    element.addEventListener('click', overlay);
});