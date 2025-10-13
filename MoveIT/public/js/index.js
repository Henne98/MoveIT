function showJoinPopup() {
    // Popup für den Lobby-Beitrit
    document.getElementById('joinOverlay').style.display = 'flex';
}

function showOptionsPopup() {
    // Popup für die Optionen
    document.getElementById('optionsOverlay').style.display = 'flex';
}

function closePopup(id) {
    // Funktion um Popups zu schließen
    document.getElementById(id).style.display = 'none';
}

function createLobby() {
    // Funktion um Lobby zu erstellen
    window.location.href = 'lobby_host';
}

function joinLobby() {
    // Funktion um Lobby beizutreten
    const inputCode = document.getElementById('joinCodeInput').value.trim().toUpperCase();
    const savedCode = localStorage.getItem('lobbyCode');

    if (inputCode === savedCode) {
        window.location.href = 'lobby';
    } else {
        alert('Ungültiger Lobby-Code!');
    }
}