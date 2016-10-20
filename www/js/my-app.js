// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

$$(document).on('click', '.takePictureButton', function () {

    cordova.plugins.camerapreview.takePicture(function onPictureTaken(result, previewPicturePath){
        document.getElementById('originalPicture').src = result[0];//originalPicturePath;
    });
});


var twentyWidth = window.screen.width * 0.2;
var twentyHeight = window.screen.height * 0.2;

myApp.onPageInit('Camera', function (page) {
    cordova.plugins.camerapreview.startCamera({x: 0, y: twentyHeight, width: window.screen.width, height:window.screen.height - (2*twentyHeight)});

});





