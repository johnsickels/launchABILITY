$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
try {
    console.log(sessionStorage.getItem("user"));
}
catch{ console.log("UsernameError") }
console.log($.urlParam('id'));

// var now, timeToExpire;

// function updateTime() {
//     now = moment();
//     console.log(now);
    
// }

// function timer() {
//     updateTime();
//     $('#countdown').html(`Expires in: ${displayClock(timeToExpire)}`)
// }

// setInterval(timer, 1000);

$.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?fields=location,mission,rocket,windowstart&id=" + $.urlParam('id')
}).then(function (response) {
    console.log(response);
    console.log(response.launches[0].rocket.imageURL);

    // timeToExpire = (response.launches[0].windowstart).diff(now, 'seconds');
    // console.log(timeToExpire);


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
    $("#countdown").text(countdown);
    $("#launch-name").text(response.launches[0].rocket.name);
    $("#launch-location").text(response.launches[0].location.name);
    $("#launch-start").text(response.launches[0].windowstart);
    $("#rocket-image").attr("src", response.launches[0].rocket.imageURL);
    $("#payload").text(response.launches[0].missions[0].description);



});

