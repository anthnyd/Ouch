var login = false; //Current state being displayed
var action;

//HTML elemnts
var exist_input = document.getElementById("exist-input");
var user_input = document.getElementById("user-input");

var leaderboard =     document.getElementsByClassName("leaderboard")[0];

function switchState() {
    document.getElementById("submit-button").classList.toggle("hidden");
    document.getElementById("box").classList.toggle("opacity");
    document.getElementById("user-input").classList.toggle("login");
    document.getElementById("exist-input").classList.toggle("login");
    document.getElementById("header").classList.toggle("login");
    document.getElementById("exist-input").classList.toggle("opacity");
    document.getElementById("exist-input").classList.toggle("disappear");
    document.getElementById("level").classList.toggle("opacity");
    document.getElementsByClassName("leaderboard")[0].classList.toggle("opacity");
    login = !login;
}

function switchSearch() {
    document.getElementById("search").classList.toggle("opacity");
    document.getElementById("search").classList.toggle("disappear");
    document.getElementById("chat").classList.toggle("opacity");
    document.getElementById("chat").classList.toggle("disappear");
}

function switchDark() {
    document.getElementById("ouch").classList.toggle("dark");
    document.getElementById("header").classList.toggle("dark");

    //TODO update all chat to dark
}

function togglePopUp() {
    document.getElementById("help").classList.toggle("opacity");
    setTimeout(function () {
        document.getElementById("help").classList.toggle("hidden");
    }, 1000);
}

document.getElementsByClassName("close")[0].onclick = function() {
    togglePopUp();
};