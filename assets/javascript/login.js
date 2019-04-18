console.log("app.js is working");
  
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

  var provider = new firebase.auth.GoogleAuthProvider();
  
var s = Snap(200,500);


    var fire;
    var fire2;
    var rocket;
    var rocketloaded,fireloaded;
    var authenticateduser;
    var loadPromises = [
      loadSVG("./assets/images/combined3.svg")
    ];

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        authenticateduser=user;
      } else {
        // No user is signed in.
      }
    });


    Promise.all(loadPromises).then(function(results) {
      for (var i = 0; i < results.length; ++i) {
        var svg = results[i];
        s.append(svg);
        s.transform("t"+$(window).width()/2+",0");
       
      }
      

rocket=s.select("#rocket");
fire=s.select("#test");
fire2=s.select("#test4");
console.log(fire);

  console.log("app.js is still working");
  $("#launch-btn").on("click",function(){
    

var x=1;
function flicker(){
  if(x==1){
    x=0.8;
          }
  else{
    x=1;
      }
fire.animate({opacity:x},50, mina.linear,flicker);
fire2.animate({opacity:0.8},60, mina.linear,flicker);
fire.attr({width: '100%', height: '100%', viewBox: "0 0 600 600"});
fire.animate({transform:'s1,'+1*x+", "+fire.getBBox().cx+","+fire.getBBox().cy},50, mina.linear,flicker);
fire2.animate({transform:'s'+x*0.95+','+1*x*1.25},40, mina.linear,flicker);
};


flicker();

var y=4;
function fire2flicker(){
 
  var myMatrix = new Snap.Matrix();
  myMatrix.scale(4,2); 


}
// s.transform("t"+$(window).width/2+",0");
    s.animate({transform:"t"+$(window).width()/2+",-1500"},3000, mina.linear, function(){
      
      if(authenticateduser!=null){
        window.location.replace("./settings.html");
      }
      else{
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        
      
        window.location.replace("./settings.html");
        
      }).catch(function(error) {
        // Handle Errors here.
        console.log("error");
        console.log(error.message);
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });  
    }
    
   

    });
  });
    });

  function loadSVG(url) {
    return new Promise(function(resolve, reject) {
      Snap.load(url, resolve);
    });
  };