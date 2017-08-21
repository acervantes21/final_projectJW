/* $(function() {

$('#buy').on('click', function() {
  event.preventDefault();
    alert('Alert');
    console.log('TEST')
});
}); */


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD7IqUyZZgA4A1JFeGVD9o3pB0iKar9o64",
    authDomain: "tlgc-8564d.firebaseapp.com",
    databaseURL: "https://tlgc-8564d.firebaseio.com",
    projectId: "tlgc-8564d",
    storageBucket: "tlgc-8564d.appspot.com",
    messagingSenderId: "444256991482"
  };
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
    $('#inlineFormInput').val('')

    // create a section for messages data in your db
    var messagesReference = database.ref('inlineFormInput');

    // use the set method to save data to the messages
    messagesReference.push({
      message: message
    })
  })

  // instagram shit
  window.open("https://api.instagram.com/oauth/authorize/?client_id=60c4b769d25b4491a3c30a58f3383daf&redirect_uri=https://blooming-woodland-28032.herokuapp.com/callback.html&response_type=token&scope=public_content");


  window.handleCallbackResponse = function(response) {
    $('#inlineFormInput').val('test');
    jQuery.ajax({
      type: 'get',
      url: "https://api.instagram.com/v1/users/636390097/media/recent/?count=6&access_token="+response,
      dataType: "jsonp",
      success: function( data ) {
        data.data.forEach(function(post) {
          $("#instagram").append('<img src="' + post.images.standard_resolution.url +'" class="image"/>');
        })
      }
    });
  }
});
