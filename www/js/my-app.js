// API SERVER ADDRESS
var api = 'http://146.169.46.166';

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

// Global Variables

// Session Token
var session = {
  id: null,
  auth_token: null,
  email: null
};

// Captured Image
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
    // Capture email and password
    var email = pageContainer.find('input[name="email"]').val();
    var password = pageContainer.find('input[name="password"]').val();
    myApp.showIndicator();
    var postdata = {
      email : email,
      password: password
    };

    // $$.ajax({
    //       url: api + '/health',
    //       type: "GET",
    //       success: function (data, textStatus, jqXHR) {
    //         myApp.hideIndicator();
    //         alert('success ' + data);
    //       },
    //       error: function (data, textStatus, jqXHR) {
    //         myApp.hideIndicator();
    //         alert('fail ' + data + textStatus);
    //       }
    //     }
    // );

    $$.ajax({
      url: api + '/user/authenticate',
      type: "POST",
      data: postdata,
      success: function(data, textStatus, jqXHR) {
        myApp.hideIndicator();
        var returnedData = JSON.parse(data);
        session.auth_token = returnedData.auth_token;
        session.email = returnedData.email;
        session.id = returnedData.id;
        mainView.router.loadPage({url: 'menu.html'});

      },
      error: function(data, textStatus, jqXHR) {
        myApp.hideIndicator();
        myApp.alert('Login was unsuccessful, please try again');
      }
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

