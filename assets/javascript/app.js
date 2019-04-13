// console.log("app.js is working");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAvp5DXwstL8tSCTh5OtFVSC-XazUNU5_8",
  authDomain: "spacex-cc85a.firebaseapp.com",
  databaseURL: "https://spacex-cc85a.firebaseio.com",
  projectId: "spacex-cc85a",
  storageBucket: "spacex-cc85a.appspot.com",
  messagingSenderId: "55107665194"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

//   var provider = new firebase.auth.GoogleAuthProvider();

//   firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;

//     console.log(user.displayName);
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     console.log("error");
//     console.log(error.message);
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });  

// var querystring = "https://launchlibrary.net/1.4/launch?"
// var location;

$("#pad-select-1").on("click", function () {
  // location="&next=5&locationid=87";
  // querystring+=location;
  // console.log(querystring);

  $.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?next=5&locationid=87"

  }).then(function (response) {
    console.log(response);
    var rocketDiv = $("<div>");
    response.launches.forEach(function (launch) {

      $(rocketDiv).append($("<p>").html('<input type="checkbox" class="checkbox" value="' + launch.id + '" name=" ' + launch.id + '">' + launch.name + '</input>'));

    });
    $("#list-content").prepend(rocketDiv);
    $("#list-content").prepend($("<h3>").text("Cape Canaveral, FL"));
  });
});
$("#pad-select-2").on("click", function () {
  // location="&next=5&locationid=87";
  // querystring+=location;
  // console.log(querystring);

  $.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?next=5&locationid=166"

  }).then(function (response) {
    console.log(response);
    var rocketDiv = $("<div>");
    response.launches.forEach(function (launch) {

      $(rocketDiv).append($("<p>").html('<input type="checkbox" name=" ' + launch.id + '">' + launch.name + '</input>'));
    });
    // $("#list-content").prepend("<h2>").text
    $("#list-content").prepend(rocketDiv);
    $("#list-content").prepend($("<h3>").text("Onenui Station, Mahia Peninsula, New Zealand"));
  });
});
$("#pad-select-3").on("click", function () {
  // location="&next=5&locationid=87";
  // querystring+=location;
  // console.log(querystring);

  $.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?next=5&locationid=109"

  }).then(function (response) {
    console.log(response);
    var rocketDiv = $("<div>");
    response.launches.forEach(function (launch) {

      $(rocketDiv).append($("<p>").html('<input type="checkbox" name=" ' + launch.id + '">' + launch.name + '</input>'));
    });
    $("#list-content").prepend(rocketDiv);
    $("#list-content").prepend($("<h3>").text("Wallops Island, VA"));

  });
});

var rocketIDs = [];

$("#save-btn").on("click", (event) => {
  console.log($(this));

  $('input:checkbox:checked').each(function (index) {
    console.log("------------------");

    console.log($(this)[0].name)
    rocketIDs.push($(this).val());
  });
  for (i = 0; i < rocketIDs.length; i++) {
    dataRef.ref().push({
      rocketID: rocketIDs
    });
  };
});

// $.ajax({
// url:"https://api.twitter.com/oauth2/token?grant_type=client_credentials",
// type:"POST",
// grant_type:'client_credentials'
// }).then(function(response){
// console.log("Twitter Token Response "+response);
// });






// //Add Auth
//   });
