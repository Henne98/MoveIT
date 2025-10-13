// Zeigt eine Fehlermeldung im Chat an
const errorReport = (title, msg, chat, container) => {
    chat.innerHTML += `<p class='error-report'>${msg}</p>`; // Fügt eine Fehlermeldung hinzu
    chat.scrollTop = chat.scrollHeight; // Scrollt automatisch zum neuesten Eintrag
}

// Zeigt eine Aktionsmeldung im Chat an (z. B. „Lobby erstellt“)
const actionReport = (title, msg, chat, container) => {
    chat.innerHTML += `<p class='action-report'>${msg}</p>`; // Fügt eine Aktionsmeldung hinzu
    chat.scrollTop = chat.scrollHeight;
}

// Zeigt eine normale Chatnachricht mit Absendernamen
const chatMessage = (title, msg, chat, container) => {
    chat.innerHTML += `<p class='chat-message'><span class='chat-title'>${title}:</span>${msg}</p>`; // Nachricht mit Titel
    chat.scrollTop = chat.scrollHeight;
}

// Zeigt alle Personen in der Lobby mit einem Bild an
const viewPeople = (people_, container) => {
    let i = 0;
    container.innerHTML = ""; // Container leeren
    people_.forEach(person => {
        console.log(person) // Debug-Ausgabe
        container.innerHTML += `<div class='person' id='i${person}'>
                        <img src='../img/demo/${i}.jpg' width="200px">
                    </div>`;
        i++; // Bildindex erhöhen
    })
}

window.onload = () => {
    // Referenzen auf HTML-Elemente holen
    let createLobby = document.getElementById("create_lobby");
    let ready = document.getElementById("ready");
    let lobbyCode = document.getElementById("lobby_code");
    let joinLobby = document.getElementById("join_lobby");
    let leaveLobby = document.getElementById("leave_lobby");
    let msgCon = document.getElementById("msgs-con");
    let getPeople = document.getElementById("get_people");
    let codeView = document.getElementById("lobby-code-view");
    let peopleCon = document.getElementById("people");
    let send = document.getElementById("send");
    let msgBody = document.getElementById("msg-body");

    // Nachricht senden
    send.onclick = () => {
        msgBody.value ?
            $$$.all("msg", { id, msg: msgBody.value }) : ""; // Nachricht an Server senden
        msgBody.value = ""; // Eingabefeld leeren
    }

    // Zufällige Spieler-ID generieren
    let id = Math.floor(Math.random() * 100);
    console.log("ID is", id);

    // Spieler abrufen
    getPeople.onclick = async () => {
        try {
            let a = await $$$.people(id); // Spieler vom Server abrufen
            console.log(a);
        } catch (err) {
            console.log(err); // Fehler ausgeben
        }
    }

    // Lobby beitreten
    joinLobby.onclick = async () => {
        try {
            let code = lobbyCode.value; // Code aus Eingabefeld holen
            let a = await $$$.enter(id, code); // Lobby beitreten
            actionReport("", a, msgCon); // Erfolgsmeldung anzeigen
            codeView.innerHTML = code; // Code anzeigen
            let people = await $$$.people(id); // Spieler abrufen
            viewPeople(people, peopleCon); // Spieler anzeigen
        } catch (err) {
            console.log(err);
            errorReport("", err.msg, msgCon); // Fehlermeldung anzeigen
        }
    }

    // Spieler als „bereit“ markieren
    ready.onclick = async () => {
        try {
            let a = await $$$.join(id); // Spieler als bereit registrieren
            actionReport("", a, msgCon);
        } catch (err) {
            console.log(err);
            errorReport("", err.msg, msgCon);
        }
    }

    // Neue Lobby erstellen
    createLobby.onclick = async () => {
        try {
            let a = await $$$.create(id); // Neue Lobby erstellen
            actionReport("", "Lobby code is: " + a.code, msgCon); // Code anzeigen
            codeView.innerHTML = a.code;
        } catch (err) {
            console.log(err);
            errorReport("", err.msg, msgCon);
        }
    }

    // Lobby verlassen
    leaveLobby.onclick = async () => {
        try {
            let a = await $$$.leave(id); // Lobby verlassen
            actionReport("", "You have left the lobby " + a.code, msgCon);
            codeView.innerHTML = "N/A"; // Code zurücksetzen
            people.innerHTML = ""; // Spieleranzeige leeren
        } catch (err) {
            console.log(err);
            errorReport("", err.msg, msgCon);
        }
    }

    // Socket-Event: neuer Spieler tritt bei
    $$$.socket.on("new_entry", (data) => {
        actionReport("", data.msg, msgCon); // Nachricht anzeigen
        document.getElementById("people").innerHTML += `
            <div class='person' id='i${data.id}'>
                <img src='../img/demo/${data.index}.jpg'  </div>
        `;
    });

    // Socket-Event: Spieler verlässt Lobby
    $$$.socket.on("left", (data) => {
        actionReport("", data.msg, msgCon); // Nachricht anzeigen
        document.getElementById("i" + data.id).remove(); // Spieler entfernen
    });

    // Socket-Event: neue Chatnachricht
    $$$.socket.on("msg", (data) => {
        chatMessage(data.id, data.msg, msgCon); // Nachricht anzeigen
    });

    // Automatisch „bereit“ klicken
    ready.click();
}