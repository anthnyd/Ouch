function switchState() {
    document.getElementById("submit-button").classList.toggle("hidden");
    document.getElementById("search").classList.toggle("opacity");
    document.getElementById("user-input").classList.toggle("login");
    document.getElementById("exist-input").classList.toggle("login");
    document.getElementById("header").classList.toggle("login");
    document.getElementById("exist-input").classList.toggle("opacity");
    document.getElementById("exist-input").classList.toggle("disappear");
}

function switchDark() {
    document.getElementById("ouch").classList.toggle("dark");
    document.getElementById("header").classList.toggle("dark");
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

document.getElementById("submit-button").onclick = function() {
    alert("Hello\nHow are you?");
};