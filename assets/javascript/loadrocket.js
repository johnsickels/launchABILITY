$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
try {
    console.log(sessionStorage.getItem("user"));
}
catch{ console.log("UsernameError") }
console.log($.urlParam('id'));

var countdown, distance, launchTime;

// Update the count down every 1 second
var x = setInterval(function () {
    now = moment().format('MMMM D, YYYY HH:mm:ss');
    nowX = moment(now).format('X');
    launchTimeX = moment(launchTime).format('X');
    distance = Math.floor((launchTimeX - nowX) * 1000);

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    $("#countdown").html(days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ");

    // If the count down is finished, write some text 
    if (distance < 0) {
        clearInterval(x);
        $("#countdown").html("LAUNCHED");
    }

}, 1000);

$.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?fields=location,mission,rocket,windowstart&id=" + $.urlParam('id')
}).then(function (response) {
    console.log(response);

    launchTime = (response.launches[0].windowstart);

    // $("#countdown").text(countdown);
    $("#launch-name").text(response.launches[0].rocket.name);
    $("#launch-location").text(response.launches[0].location.name);
    $("#launch-start").text(response.launches[0].windowstart);
    $("#rocket-image").attr("src", response.launches[0].rocket.imageURL);
    $("#payload").text(response.launches[0].missions[0].description);

});