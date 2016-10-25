// Initialize app
var myApp = new Framework7({
      // Enable Material theme
      material: true,
      animatePages: false,
      cache: false,
      preloadPreviousPage: false
    }
);

// To use Framework7s custom DOM library, save it to $$ variable:
var $$ = Dom7;

var image = {
  imageData : null
};

// Add view
var mainView = myApp.addView('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});


myApp.onPageInit('Camera', function (page) {
  ezar.initializeVideoOverlay(
      function () {
        ezar.getBackCamera().start();
      },
      function (err) {
        alert('unable to init ezar: ' + err);
      });

  var pageContainer = $$(page.container);
  pageContainer.find('.button').on('click', function () {
    ezar.snapshot(
        function(base64EncodedImage) {
          image.imageData = base64EncodedImage;
          mainView.router.loadPage({url: 'reviewImage.html'});
        },
        function(error) {
          alert("ezar snapshot failed");
        },
        {encodingType: ezar.ImageEncoding.PNG,
          includeWebView: false,
          saveToPhotoAlbum: false});

  });
});

myApp.onPageInit('login-screen', function (page) {
  var pageContainer = $$(page.container);
  pageContainer.find('.list-button').on('click', function () {
    var username = pageContainer.find('input[name="username"]').val();
    var password = pageContainer.find('input[name="password"]').val();
    // Handle username and password
    myApp.alert('Username: ' + username + ', Password: ' + password, function () {
      mainView.router.loadPage({url: 'menu.html'});
    });
  });
});

myApp.onPageAfterAnimation('Camera', function () {
  $$(".page").css("background-color", "transparent");
  $$('.page-on-left').remove();
});

myApp.onPageAfterAnimation('Camera-review', function () {
  $$('.review-image').attr('src',image.imageData);
  ezar.getBackCamera().stop();
});

