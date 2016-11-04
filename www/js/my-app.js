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
var img = {
  imageData : null,
  cowId : null
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
          img.imageData = base64EncodedImage;
          mainView.router.loadPage({url: 'pages/reviewImage.html'});
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

    $$.ajax({
      url: api + '/user/authenticate',
      method: 'POST',
      data: postdata,
      success: function(data, textStatus, jqXHR) {
        myApp.hideIndicator();
        var returnedData = JSON.parse(data);
        session.auth_token = returnedData.auth_token;
        session.email = returnedData.email;
        session.id = returnedData.id;
        mainView.router.loadPage({url: 'pages/menu.html'});

      },
      error: function(data, textStatus, jqXHR) {
        myApp.hideIndicator();
        myApp.alert('Login was unsuccessful, please try again');
      }
    });
  });
});

myApp.onPageInit('Input', function (page) {
  var pageContainer = $$(page.container);
  pageContainer.find('.button-raised').on('click', function () {
    // Capture Form Data
    var country_code = pageContainer.find('input[name="country_code"]').val();
    var herdmark = pageContainer.find('input[name="herdmark"]').val();
    var check_digit = pageContainer.find('input[name="check_digit"]').val();
    var individual_number = pageContainer.find('input[name="individual_number"]').val();
    // Set current cowId for image upload
    myApp.showIndicator();
    var postdata = {
      country_code : country_code,
      herdmark: herdmark,
      check_digit: check_digit,
      individual_number: individual_number
    };
    var auth_token_ = 'Bearer ' + session.auth_token;
    $$.ajax({
      url: api + '/cattle/new',
      method: 'POST',
      headers: {
        'Authorization': auth_token_
      },
      data: postdata,
      success: function(data, textStatus, jqXHR) {
        myApp.hideIndicator();
        var returnedData = JSON.parse(data);
        var cattle = returnedData.cattle;
        // Set Cowid for image upload
        img.cowId=cattle.id;
        mainView.router.loadPage({url: 'pages/camera.html'});

      },
      error: function(data, textStatus, jqXHR) {
        myApp.hideIndicator();
        myApp.alert(data.responseText + textStatus);
      }
    });
  });
});

myApp.onPageInit('Camera-review', function (page) {
  var pageContainer = $$(page.container);
  pageContainer.find('.button-raised').on('click', function () {
    myApp.showIndicator();
    var auth_token_ = 'Bearer ' + session.auth_token;
    var post_data = {
      data: img.imageData
    };
    $$.ajax({
      url: api + '/cattle/'+img.cowId+'/images/',
      method: 'POST',
      headers: {
        'Authorization': auth_token_
      },
      data: post_data,
      success: function(data, textStatus, jqXHR) {
        myApp.hideIndicator();
        mainView.router.loadPage({url: 'pages/menu.html'});

      },
      error: function(data, textStatus, jqXHR) {
        myApp.hideIndicator();
        myApp.alert(data.responseText + textStatus);
        myApp.alert('Something went wrong');
      }
    });
  });
});

myApp.onPageAfterAnimation('Camera', function () {
  $$(".page").css("background-color", "transparent");
  $$('.page-on-left').remove();
});

myApp.onPageAfterAnimation('Camera-review', function () {
  $$('.review-image').attr('src', img.imageData);
  ezar.getBackCamera().stop();
});

myApp.onPageAfterAnimation('Cattle-view', function () {
  var auth_token_ = 'Bearer ' + session.auth_token;
  myApp.showIndicator();
  $$.ajax({
    method: 'GET',
    url: api + '/cattle',
    cache: false,
    headers: {
        'Authorization': auth_token_
      },
    success: function(data, textStatus, jqXHR){
      myApp.hideIndicator();
      var returnedData = JSON.parse(data);
      var cattle = returnedData.cattle;
      $$.each(cattle, function(i, field){
        var images = null;
        $$.ajax({
              method: 'GET',
              url: api + '/cattle/'+field.id+'/images',
              headers: {
                'Authorization': auth_token_
              },
              async: false,
              success: function (data, textStatus, jqXHR) {
                var returnedData = JSON.parse(data);
                images = returnedData.images;
              }
        });
        var imageHtml = "";
        images.forEach(function(image) {
          imageHtml = imageHtml + '<p>' +
              '<img src="' + image.image_uri + '" width="100%"/>' +
              '</p>';
        });


        $$(".cattle").append('<div class="card cattle-card">'+
        '<div class="card-header">'+
            '<div class="cattle-name">Cow id '+field.id +'</div>' +
        '</div>' +
        '<div class="card-content">' +
            '<div class="card-content-inner">' +
            '<p>Country code:' + field.country_code +'</p>' +
        '<p>Herdmark: ' + field.herdmark+'</p>' +
        '<p>Check digit: '+ field.check_digit +'</p>' +
        '<p>Individual number: ' + field.individual_number +'</p>' +
        imageHtml +
        '</div>' +
        '</div>' +
        '<div class="card-footer">' +
            '<a href="#" class="link edit" "id="' + field.id +'">Edit</a>' +
            '<a href="#" class="link delete-cattle" id="' + field.id
            +'">Delete</a>' +
            '</div>' +
            '</div>');
      });
    },
    error: function (data, textStatus, jqXHR) {
      myApp.hideIndicator();
      alert('Something went wrong');
    }
  });
  $$(".cattle").on('click', '.delete-cattle', function () {
    cattle_id = $$(this).attr('id');
    myApp.showIndicator();
    var auth_token_ = 'Bearer ' + session.auth_token;
    $$.ajax({
      url: api + '/cattle/'+cattle_id,
      method: 'DELETE',
      headers: {
        'Authorization': auth_token_
      },
      success: function(data, textStatus, jqXHR) {
        myApp.hideIndicator();
        mainView.router.loadPage({url: 'pages/menu.html'});
      },
      error: function(data, textStatus, jqXHR) {
        myApp.hideIndicator();
        myApp.alert(data.responseText + textStatus);
        myApp.alert('Something went wrong');
      }
    });
  });
});
