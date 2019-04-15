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

  var authenticateduser;


// var querystring = "https://launchlibrary.net/1.4/launch?"
// var location;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    authenticateduser=user;
    // User is signed in.
    console.log(user);

  var starCountRef = dataRef.ref('/users/' + user.uid);
starCountRef.on('value', function(snapshot) {
  console.log(snapshot.val().rocketID);


querystring="https://launchlibrary.net/1.4/launch?fields=rocket,location,windowstart,name&id="
snapshot.val().rocketID.forEach(function(element){
querystring+=element+'&id=';
});

querystring=querystring.slice(0,querystring.length-4);
console.log("querystring: "+querystring);
  $.ajax({
    type: 'GET',
    url: querystring
}).then(function(response){
console.log(response);

response.launches.forEach(function(launch){
var newcard=$("<div>");
newcard.attr("class", "card");
newcard.data("launchid", launch.id);
var image=$("<img>")
var imgstring=launch.rocket.imageURL;
imgstring=imgstring.replace("1920", "640");
image.attr("src", imgstring);
image.attr("class","card-img-top");

var cardbody=$("<div>");
cardbody.attr("classs", "card-body")

var launchinfo=$("<h3>");
launchinfo.text(launch.name);
launchinfo.attr("class", "card-title");

var location=$("<h5>");
location.attr("class", "card-text");
location.text("Location: "+launch.location.name);

var datetime=$("<h5>");
datetime.attr("class", "card-text");
datetime.text(launch.windowstart);

cardbody.append(launchinfo);
cardbody.append(location);
cardbody.append(datetime);

newcard.append(image);
newcard.append(cardbody);
$(".card-deck").append(newcard);

newcard.on("click", function(){
    console.log("clicked");
   window.location.replace("./dashboard.html?id="+$(this).data("launchid"))
});

})


});







});
  } else {
    // No user is signed in.
  }



});