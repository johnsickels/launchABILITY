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



var s = Snap("#map");

var loadPromises = [
  // loadSVG("/assets/images/falconheavy.svg"),
  // loadSVG("/assets/images/fire.svg")
  loadSVG("./assets/images/map.svg")
];


Promise.all(loadPromises).then(function(results) {
  // results contains the loaded SVGs, in order.
  for (var i = 0; i < results.length; ++i) {
    var svg = results[i];
    s.append(svg);
    // s.attr({viewBox:0+","+0+","+300+","+300});
    
  }


var vandenburgclickCallback = function(event) {
  // alert("CALIFORNIA");
  
  
  $.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?next=5&locationid=100"

  }).then(function (response) {
    console.log(response);
    var rocketDiv = $("<div>");
    response.launches.forEach(function (launch) {

      $(rocketDiv).append($("<p>").html('<input type="checkbox" class="checkbox" value="' + launch.id + '" name=" ' + launch.id + '">' + launch.name + '</input>'));
    });
    // $("#list-content").prepend("<h2>").text
    $("#list-content").empty();
    $("#list-content").prepend(rocketDiv);
    $("#list-content").prepend($("<h3>").text("Vandenburg AFB, CA"));
  });



};

var wallopsclickCallback = function(event) {
  // alert("CALIFORNIA");
  
  
  $.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?next=5&locationid=109"

  }).then(function (response) {
    console.log(response);
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
  // alert("CALIFORNIA");
  
  
  $.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?next=5&locationid=87"

  }).then(function (response) {
    console.log(response);
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


// var bbox = s.getBBox();
//     var viewBox = bbox.x+' '+bbox.y+' '+bbox.width+' '+ bbox.height;
//     s.attr({
//      viewBox: viewBox
//   })


console.log(s.select("#Vandenburg"));
s.select("#vandenburg").click(vandenburgclickCallback);
s.select("#wallops").click(wallopsclickCallback);
s.select("#canaveral").click(canaveralclickCallback);




});







var authenticateduser;


// var querystring = "https://launchlibrary.net/1.4/launch?"
// var location;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    authenticateduser=user;
    // User is signed in.
    console.log(user);
  } else {
    // No user is signed in.
  }
});
// var user = firebase.auth().currentUser;
// // alert(user.displayName);
// console.log(sessionStorage.getItem("user"));
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

      $(rocketDiv).append($("<p>").html('<input type="checkbox" class="checkbox" value="' + launch.id + '" name=" ' + launch.id + '">' + launch.name + '</input>'));
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

      $(rocketDiv).append($("<p>").html('<input type="checkbox" class="checkbox" value="' + launch.id + '" name=" ' + launch.id + '">' + launch.name + '</input>'));
    });
    $("#list-content").prepend(rocketDiv);
    $("#list-content").prepend($("<h3>").text("Wallops Island, VA"));

  });
});


 var rocketIDs = [];
$("#save-btn").on("click", (event) => {
  console.log($(this));
 

  dataRef.ref('/users/' + authenticateduser.uid).once('value').then(function(snapshot) {
    console.log("Getting User Data");
    console.log("SNAPSHOT: "+snapshot.val());
    // var savedrockets= snapshot.val().rocketID;
    var updatedArray;
    // if(snapshot.val().rocketID!=null){
    rocketIDs=snapshot.val().rocketID
    // }

  alert("rocket(s) saved! (change me later)");
  
  });


  $('input:checkbox:checked').each(function (index) {
    console.log("------------------");
    
    // console.log($(this)[0].name)
    rocketIDs.push($(this).val());
    // console.log(removeDuplicates(rocketIDs));
  });
  var fixedarray=[];
  // fixedarray=getPreviousSaves(rocketIDs);
  // rocketIDs=removeDuplicates(rocketIDs);
  // for (i = 0; i < rocketIDs.length; i++) {
    dataRef.ref('/users/'+authenticateduser.uid).set({
      userid: authenticateduser.uid,
      rocketID: rocketIDs
    }
    );
  // };
});




function loadSVG(url) {
  return new Promise(function(resolve, reject) {
    Snap.load(url, resolve);
  });
};


function getPreviousSaves(rockedIDarray){
  
  dataRef.ref('/users/' + authenticateduser.uid).once('value').then(function(snapshot) {
    console.log("Getting User Data");
    console.log("SNAPSHOT: "+snapshot.val());
    // var savedrockets= snapshot.val().rocketID;
    var updatedArray;
    if(snapshot.val().rocketID!=null){
    updatedArray=snapshot.val().rocketID
    }
   else{
     updatedArray=[];
   }
    console.log(updatedArray);
    // updatedArray.concat(rockedIDarray);
    console.log("updated array: "+updatedArray);
    return updatedArray;

  });

}

function removeDuplicates(array){
  var finishedarray=[];
  array=array.sort();
 
 for(var i =0 ; i<array.length;i++){
   if(array[i]!=array[i+1]){
     finishedarray.push(array[i]);
   }
 }
 return finishedarray;
}
