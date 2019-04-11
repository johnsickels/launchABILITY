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

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    sessionStorage.setItem("user", user);
    console.log(user.displayName);
    // ...
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
