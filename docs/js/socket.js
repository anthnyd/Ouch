/* Handles all interactions with the server
 * through web sockets
 * socket.js
 */

var keepConnectionOpen =  setTimeout(checkOpen(), 3000); //900000

//TODO keep connection open, close after a certain amount of time and when connection is closed
function checkOpen() {
    console.log("I'm called");
    if(here) {
        console.log("I am sending data");
        //connection.send("");
        keepConnectionOpen;
    } else {
        //connection.close();
        console.log("I am not here");
        clearTimeout(keepConnectionOpen);
    }
};

//I am here
document.onmousemove = function(){here=true;};
document.onkeydown = function(){here=true;};

function play() {

    connection = new WebSocket(url);

    //On connection open
    connection.onopen = () => {
        switchState();
        document.getElementById("indicator").classList.toggle("connected");

        document.getElementById('user-input').value = "";
        document.getElementById('user-input').placeholder = "enter command or message";
        keepConnectionOpen;
    };

    //If  there is an  error
    connection.onerror = error => {
        //create error message
        alert(`WebSocket error: ${error}`);
    };

    //On message received from socket
    connection.onmessage = e => {

        //parse the socket data
        var JSONdata = JSON.parse(e.data);
        //parse JSONdata.data
        var parsedData = JSON.parse(JSONdata.data);

        //Check if datatype us INIT
        if (JSONdata.dataType === "INIT") {
            //Save init data to usr in case needed later
            usr = parsedData;

            //Update level with data received
            document.getElementById("level").innerHTML = nickname + '<span id="world-value" style="font-weight: normal;"> '
                + parsedData.existence.initialQuidity.ouch.degree + '</span>';
            //Set existence ID
            document.getElementById("world-value").innerHTML = parsedData.existence._id;

            //load in quids in leaderboard
            var usersArray = parsedData.existence.quidities;

            //Add quids to leaderboard
            for (var quid in usersArray) {
                leaderboard.innerHTML += '<div class="data-leaderboard-cont"><p class="data-leaderboard ' + usersArray[quid].id +
                    '">' + usersArray[quid].name +
                    ' <span class="normal">' + usersArray[quid].ouch.degree +
                    '</span></p></div>';
            }

        }

        //if chat then add items
        else if (JSONdata.dataType === "CHAT") {
            //if message is from current user
            if (parsedData.authorName === nickname) {
                addChat("", parsedData.content, "user");
                scrollBottom();
            }
            //if message is from new user
            else {
                addChat(parsedData.authorName, parsedData.content, "other");
                scrollBottom();
            }

            //New user has entered
        } else if (JSONdata.dataType === "ENTER") {
            //Add new user to leaderboard
            leaderboard.innerHTML += '<div class="data-leaderboard-cont"><p class="data-leaderboard ' + parsedData.id + '">' + parsedData.name + ' <span class="normal">' + parsedData.ouch.degree + '</span></p></div>';

            addChat(parsedData.name, "has joined the Existence.", "system");
            scrollBottom();

        } else if (JSONdata.dataType === "EXIT") {
            var quidleaderboard = document.getElementsByClassName(parsedData.id)[0]
            quidleaderboard.parentNode.removeChild(quidleaderboard);
            addChat(parsedData.name, "has left the Existence.", "system");
            scrollBottom();
        }

        //Some unknown dataType
        else {
            console.log("Unknown dataType");
            console.log(e.data);
        }
    };

    connection.onclose = (closeEvent) => {
        //switch back to login
        reset();
        switch (closeEvent.code) {
            case close_code.ER_NO_NAME:
                //document.getElementById('user-input').placeholder = "Must provide a name";
                break;
            case close_code.ER_BAD_ID:
                document.getElementById('exist-input').value = "";
                document.getElementById('exist-input').placeholder = "Unknown ID";
                document.getElementById('user-input').value = nickname;
                shake(exist_input);
                break;
            case close_code.ER_INTERNAL_GENERIC:
                alert("Sorry, an internal error occurred. Please try again");
                break;
            default:
                alert("You disconnected from the Existence.");
                // TODO nicify this
                break;
        }
        connection = null;
        here = false;
    }
}

//disconnect from server on page close or refresh
window.onbeforeunload = function () {
    connection.close();
}
