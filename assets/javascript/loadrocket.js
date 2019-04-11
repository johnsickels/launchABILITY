$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}
try{
alert("Welcome "+sessionStorage.getItem("user").displayName);}
catch{console.log("UsernameError")}
console.log($.urlParam('id'));

$.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?id="+$.urlParam('id')
}).then(function(response){
$("#launch-name").text(response.launches[0].name);
$("#launch-start").text(response.launches[0].windowstart);
});