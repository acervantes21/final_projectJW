/* $(function() {

$('#buy').on('click', function() {
  event.preventDefault();
    alert('Alert');
    console.log('TEST')
});
}); */


// Initialize Firebase
firebase.initializeApp(config);

// connect to your Firebase application using your reference URL
var database = firebase.database()

// ----------------------------------------------------------------------------

$(document).ready(function () {
  $('#form-inline').submit(function (event) {
    // by default a form submit reloads the DOM which will subsequently reload all our JS
    // to avoid this we preventDefault()
    event.preventDefault()

    // grab user message input
    var message = $('#inlineFormInput').val()

    // clear message input (for UX purposes)
    $('#inlineFormInput').val('thanks! we got your email')

    // create a section for messages data in your db
    var messagesReference = database.ref('inlineFormInput');

    // use the set method to save data to the messages
    messagesReference.push({
      message: message
    })
  })

  // instagram
  window.open("https://api.instagram.com/oauth/authorize/?client_id=60c4b769d25b4491a3c30a58f3383daf&redirect_uri=https://blooming-woodland-28032.herokuapp.com/callback.html&response_type=token&scope=public_content");


  window.handleCallbackResponse = function(response) {
    jQuery.ajax({
      type: 'get',
      url: "https://api.instagram.com/v1/users/636390097/media/recent/?count=8&access_token="+response,
      dataType: "jsonp",
      success: function( data ) {
        data.data.forEach(function(post) {
          $("#instagram").append('<img src="' + post.images.standard_resolution.url +'" class="img-responsive"/>');
        })
      }
    });
  }
});
