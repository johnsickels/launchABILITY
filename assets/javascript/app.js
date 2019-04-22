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

  $.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?next=5&locationid=84&locationid=87"

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
