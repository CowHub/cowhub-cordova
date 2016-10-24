// Initialize app
var myApp = new Framework7({
      // Enable Material theme
      material: true,
      animatePages: false,
      cache: false,
      preloadPreviousPage: false
    }
);

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});


// var twentyWidth = window.screen.width * 0.2;
// var twentyHeight = window.screen.height * 0.2;

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
        null,null,
        {encodingType: ezar.ImageEncoding.PNG,
          includeWebView: false,
          saveToPhotoAlbum: true});
    myApp.alert('Photo taken');
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

myApp.onPageAfterAnimation('Input', function () {
  $$('.page-on-left').remove();
});

myApp.onPageAfterAnimation('Camera', function () {
  $$('.page-on-left').remove();
});

myApp.onPageAfterAnimation('Menu', function () {
  $$('.page-on-left').remove();
});

