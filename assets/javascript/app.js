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

var s = Snap("#map");

var loadPromises = [
  loadSVG("./assets/images/map.svg")
];


Promise.all(loadPromises).then(function(results) {
  // results contains the loaded SVGs, in order.
  for (var i = 0; i < results.length; ++i) {
    var svg = results[i];
    s.append(svg);
  }


var vandenburgclickCallback = function(event) {

  $.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?next=5&locationid=100"

  }).then(function (response) {
    
    var rocketDiv = $("<div>");
    response.launches.forEach(function (launch) {

      $(rocketDiv).append($("<p>").html('<input type="checkbox" class="checkbox" value="' + launch.id + '" name=" ' + launch.id + '">' + launch.name + '</input>'));
    });
    $("#list-content").empty();
    $("#list-content").prepend(rocketDiv);
    $("#list-content").prepend($("<h3>").text("Vandenburg AFB, CA"));
  });
};

var wallopsclickCallback = function(event) {

  $.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?next=5&locationid=109"

  }).then(function (response) {
    var rocketDiv = $("<div>");
    response.launches.forEach(function (launch) {

      $(rocketDiv).append($("<p>").html('<input type="checkbox" class="checkbox" value="' + launch.id + '" name=" ' + launch.id + '">' + launch.name + '</input>'));
    });
    $("#list-content").empty();
    $("#list-content").prepend(rocketDiv);
    $("#list-content").prepend($("<h3>").text("Wallops Island, VA"));

  });

};

var canaveralclickCallback = function(event) {

  $.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?next=5&locationid=84&locationid=87"

  }).then(function (response) {
    var rocketDiv = $("<div>");
    response.launches.forEach(function (launch) {

      $(rocketDiv).append($("<p>").html('<input type="checkbox" class="checkbox" value="' + launch.id + '" name=" ' + launch.id + '">' + launch.name + '</input>'));

    });
    $("#list-content").empty();
    $("#list-content").prepend(rocketDiv);
    $("#list-content").prepend($("<h3>").text("Cape Canaveral, FL"));
  });


};

s.select("#canaveral").mouseover(function(){

  this.transform("s2");
}).mouseout(function(){
  this.attr({ transform: 's1' });
});

s.select("#wallops").mouseover(function(){

  this.transform("s2");
}).mouseout(function(){
  this.attr({ transform: 's1' });
});

s.select("#vandenburg").mouseover(function(){

  this.transform("s2");
}).mouseout(function(){
  this.attr({ transform: 's1' });
});

s.select("#vandenburg").click(vandenburgclickCallback);
s.select("#wallops").click(wallopsclickCallback);
s.select("#canaveral").click(canaveralclickCallback);
});

var authenticateduser;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    authenticateduser=user;
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

var rocketIDs = [];
$("#save-btn").on("click", (event) => {
 
  

  dataRef.ref('/users/' + authenticateduser.uid).once('value').then(function(snapshot) {
  
    var updatedArray;

    rocketIDs=snapshot.val().rocketID
    

  });


  $('input:checkbox:checked').each(function (index) {
    rocketIDs.push($(this).val());
  });
  var fixedarray=[];

    dataRef.ref('/users/'+authenticateduser.uid).set({
      userid: authenticateduser.uid,
      rocketID: rocketIDs
    }
    );
});




function loadSVG(url) {
  return new Promise(function(resolve, reject) {
    Snap.load(url, resolve);
  });
};



