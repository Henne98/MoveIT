const errorReport = (title, msg, chat, container) => {
    chat.innerHTML += `<p class='error-report'>${msg}</p>`;
    chat.scrollTop = chat.scrollHeight;
}

const actionReport = (title, msg, chat, container) => {
    chat.innerHTML += `<p class='action-report'>${msg}</p>`;
    chat.scrollTop = chat.scrollHeight;
}

const chatMessage = (title, msg, chat, container) => {
    chat.innerHTML += `<p class='chat-message'><span class='chat-title'>${title}:</span>${msg}</p>`;
    chat.scrollTop = chat.scrollHeight;
}

const viewPeople = (people_, container) => {
    let i = 0;
    container.innerHTML = "";
    people_.forEach(person => {
        console.log(person)
        container.innerHTML += `<div class='player' id='i${person}'>
                        Spieler ${i + 1}
                        <button class='remove-btn' onclick='removePlayer(this, false)'>Entfernen</button>
                    </div>`;
        i++;
    })
}

window.onload = async () => {
    let createLobby = document.getElementById("create_lobby");
    let ready = document.getElementById("ready");
    let lobbyCode = document.getElementById("lobby_code");
    let joinLobby = document.getElementById("join_lobby");
    let leaveLobby = document.getElementById("leave_lobby");
    let getPeople = document.getElementById("get_people");
    let codeView = document.getElementById("lobbyCode");
    let peopleCon = document.getElementById("playerList");
    let send = document.getElementById("send");
    let msgBody = document.getElementById("chatInput");
    let msgCon = document.getElementById("chatMessages");

    send.onclick = () => {
        msgBody.value ?
            $$$.all("msg", { id, msg: msgBody.value })
            : "";
        msgBody.value = "";
    }

    let id = Math.floor(Math.random() * 100);
    console.log("ID is", id);

    getPeople.onclick = async () => {
        try {
            let a = await $$$.people(id);
            console.log(a);
        }
        catch (err) {
            console.log(err);
        }
    }

    joinLobby.onclick = async () => {
        try {
            let code = lobbyCode.value;
            let a = await $$$.enter(id, code);
            actionReport("", a, msgCon);
            codeView.innerHTML = code;
            let people = await $$$.people(id);
            viewPeople(people, peopleCon);
        }
        catch (err) {
            console.log(err)
            errorReport("", err.msg, msgCon);
        }
    }

    ready.onclick = async () => {
        try {
            let a = await $$$.join(id);
            actionReport("", a, msgCon);
        }
        catch (err) {
            console.log(err);
            errorReport("", err.msg, msgCon);
        }
    }

    createLobby.onclick = async () => {
        try {
            let a = await $$$.create(id);
            actionReport("", "Lobby code is: " + a.code, msgCon);
            codeView.innerHTML = a.code;
        }
        catch (err) {
            console.log(err)
            errorReport("", err.msg, msgCon);
        }
    }

    leaveLobby.onclick = async () => {
        try {
            let a = await $$$.leave(id);
            actionReport("", "You have left the lobby " + a.code, msgCon);
            codeView.innerHTML = "---";
            peopleCon.innerHTML = "";
            window.location.href = "/"
        }
        catch (err) {
            console.log(err)
            errorReport("", err.msg, msgCon);
        }
    }

    $$$.socket.on("new_entry", (data) => {
        actionReport("", data.msg, msgCon);
        document.getElementById("playerList").innerHTML += `
                    <div class='player' id='i${data.id}'>
                        Spieler ${data.index + 1}
                        <button class='remove-btn' onclick='removePlayer(this, false)'>Entfernen</button>
                    </div>
                `;
    });

    $$$.socket.on("left", (data) => {
        actionReport("", data.msg, msgCon);
        document.getElementById("i" + data.id).remove();
    });

    $$$.socket.on("msg", (data) => {
        chatMessage(data.id, data.msg, msgCon);
    });

    // Automatisch die Buttons drücken
    ready.click();
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 Sekunde warten
    createLobby.click();
}

const removePlayer = (button, isHost) => {
    let playerDiv = button.parentElement;
    playerDiv.remove();
    if (isHost) {
        // Host spezifische Logik
    }
}

const sendMessage = () => {
    let msgBody = document.getElementById("chatInput");
    msgBody.value ?
        $$$.all("msg", { id, msg: msgBody.value })
        : "";
    msgBody.value = "";
}

const startGame = () => {
    // Spiel starten Logik
}

const leaveLobby = () => {
    // Lobby verlassen Logik
}
