$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}
try{
console.log(sessionStorage.getItem("user"));
}
catch{console.log("UsernameError")}
console.log($.urlParam('id'));

$.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?fields=location,mission,rocket,windowstart&id="+$.urlParam('id')
}).then(function(response){
    console.log(response);
$("#launch-name").text(response.launches[0].rocket.name);
$("#launch-location").text(response.launches[0].location.name);
$("#launch-start").text(response.launches[0].windowstart);
<<<<<<< HEAD
var launchtime = moment(response.launches[0].windowstart, "YYYY-MM-DD HH:mm:ss");
setInterval(function(){
console.log();
$("#countdown").text(moment().diff(launchtime));
},1000);
=======
console.log(response.launches[0].missions);
$("#payload").text(response.launches[0].missions[0].name);
>>>>>>> 6ef6b1fcb1dabfd60a15147ee2e9b980492cb4f8
});