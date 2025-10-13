const $$$ = {
    // Speichert die aktuelle URL als Serveradresse
    server: window.location.href,

    // Initialisiert die Socket-Verbindung zum Server
    socket: (server => {
        server ? this.server = server : ""; // Optional: Serveradresse setzen
        return io.connect(server); // Verbindung mit Socket.IO herstellen
    })(),

    // Allgemeine Methode zum Senden von Nachrichten an die Lobby
    all: function (event, data) {
        return new Promise((resolve, reject) => {
            this.socket.emit("emit_lobby", { event, data, id: data.id }, (err, msg) => {
                err ? reject({ err, msg }) : resolve(msg); // Antwort behandeln
            });
        });
    },

    // Lobby verlassen
    leave: function (id) {
        return new Promise((resolve, reject) => {
            this.socket.emit("leave_lobby", { id }, (err, msg) => {
                err ? reject({ err, msg }) : resolve(msg);
            });
        });
    },

    // Spieler als „bereit“ markieren
    join: function (id) {
        return new Promise((resolve, reject) => {
            this.socket.emit("join", { id }, (err, msg) => {
                err ? reject({ err, msg }) : resolve(msg);
            });
        });
    },

    // Lobby beitreten mit einem bestimmten Code
    enter: function (id, code) {
        return new Promise((resolve, reject) => {
            this.socket.emit("join_lobby", { id, code }, (err, msg) => {
                err ? reject({ err, msg }) : resolve(msg);
            });
        });
    },

    // Neue Lobby erstellen
    create: function (id) {
        return new Promise((resolve, reject) => {
            this.socket.emit("create_lobby", { id }, (err, msg) => {
                err ? reject({ err, msg }) : resolve(msg);
            });
        });
    },

    // Lobby-Code abrufen
    code: function (id) {
        return new Promise((resolve, reject) => {
            this.socket.emit("code", { id }, (err, msg) => {
                err ? reject({ err, msg }) : resolve(msg);
            });
        });
    },

    // Benutzerinformationen über HTTP abrufen
    getUser: (id) => new Promise(async (resolve, reject) => {
        try {
            let data = await fetch(server + "user?id=" + id); // Anfrage an Server
            let user = await data.json(); // Antwort als JSON parsen
            resolve(user); // Benutzer zurückgeben
        }
        catch (err) {
            reject(err); // Fehler behandeln
        }
    }),

    // Liste der Spieler in der Lobby abrufen
    people: function (id) {
        return new Promise((resolve, reject) => {
            this.socket.emit("get_people", { id }, (err, msg) => {
                err ? reject(err, msg) : resolve(msg); // Antwort behandeln
            });
        });
    },

}