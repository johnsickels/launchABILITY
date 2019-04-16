$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
try {
    console.log(sessionStorage.getItem("user"));
}
catch{ console.log("UsernameError") }
console.log($.urlParam('id'));

var now, launchTime, countdown;

// function displayClock(inputSeconds) {
//     const sec_num = parseInt(inputSeconds.toString(), 10);
//     const hours = Math.floor(sec_num / 3600);
//     const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
//     const seconds = sec_num - (hours * 3600) - (minutes * 60);
//     let hoursString = '';
//     let minutesString = '';
//     let secondsString = '';
//     hoursString = (hours < 10) ? "0" + hours : hours.toString();
//     minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
//     secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
//     return hoursString + ':' + minutesString + ':' + secondsString;
// }

now = moment().format('MMMM D, YYYY HH:mm:ss');
console.log(now);
nowX = moment(now).format('X');
console.log(nowX);
launchTimeX = moment(launchTime).format('X');
console.log(launchTimeX);

countdown = moment(now).diff(launchTime);
console.log(countdown);
// countdown = moment().to(launchTime, "MMMM D YYYY HH:mm").fromNow();

function timer() {
    $('#countdown').html((countdown));
}

setInterval(timer, 1000);

$.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?fields=location,mission,rocket,windowstart&id=" + $.urlParam('id')
}).then(function (response) {
    console.log(response);
    console.log(response.launches[0].rocket.imageURL);

    launchTime = (response.launches[0].windowstart);
    console.log(launchTime);



    $("#countdown").text(countdown);
    $("#launch-name").text(response.launches[0].rocket.name);
    $("#launch-location").text(response.launches[0].location.name);
    $("#launch-start").text(response.launches[0].windowstart);
    $("#rocket-image").attr("src", response.launches[0].rocket.imageURL);
    $("#payload").text(response.launches[0].missions[0].description);



});

