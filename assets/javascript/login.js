console.log("app.js is working");
  
  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyAvp5DXwstL8tSCTh5OtFVSC-XazUNU5_8",
  //   authDomain: "spacex-cc85a.firebaseapp.com",
  //   databaseURL: "https://spacex-cc85a.firebaseio.com",
  //   projectId: "spacex-cc85a",
  //   storageBucket: "spacex-cc85a.appspot.com",
  //   messagingSenderId: "55107665194"
  // };
  // firebase.initializeApp(config);

  // var provider = new firebase.auth.GoogleAuthProvider();

  // firebase.auth().signInWithPopup(provider).then(function(result) {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   var token = result.credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   sessionStorage.setItem("user", user);
  //   console.log(user.displayName);
  //   // ...
  // }).catch(function(error) {
  //   // Handle Errors here.
  //   console.log("error");
  //   console.log(error.message);
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  // });  
var s = Snap(350,600 );
    var fire;
    var fire2;
    var rocket;
    var rocketloaded,fireloaded;

    var loadPromises = [
      // loadSVG("/assets/images/falconheavy.svg"),
      // loadSVG("/assets/images/fire.svg")
      loadSVG("/assets/images/combined3.svg")
    ];

    Promise.all(loadPromises).then(function(results) {
      // results contains the loaded SVGs, in order.
      for (var i = 0; i < results.length; ++i) {
        var svg = results[i];
        // if(i==0){
        //   svg.setAttribute("id","rocket");
        // //   fire=svg;
        // //   s.append(fire);
        //  }
        // else{
        // Your processing of each SVG goes here.
        // var g = svg.select("g");
      
        s.append(svg);
      // }
      }
      
//       var bbox = s.getBBox();
// var viewBox = bbox.x+' '+bbox.y+' '+bbox.width*2+' '+ bbox.height*2;
//   s.attr({
//      viewBox: viewBox
//   })
rocket=s.select("#rocket");
fire=s.select("#test");
fire2=s.select("#test4");
console.log(fire);

  console.log("app.js is still working");
  $("#launch-btn").on("click",function(){
    
// fire.transform("t0,"+rocket.getBBox().height);
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



// fire.animate({opacity:1},500, mina.linear);
// setInterval(flicker(1),100);
flicker();

var y=4;
function fire2flicker(){
 

  var myMatrix = new Snap.Matrix();
  myMatrix.scale(4,2); 

fire.animate({transform: 't100,-1500'},150, mina.linear);
}

// fire2flicker();

  //  s.select("#rocket").animate(
  //    {opacity:0.5},500, min.linear
  //  );


  //  fire.animate({opacity: 50}, 500, mina.linear);
    
    s.animate({transform:'t0,-1500 r0 s0.9'},8000, mina.linear);
    


    });
  });
  

  function loadSVG(url) {
    return new Promise(function(resolve, reject) {
      Snap.load(url, resolve);
    });
  };