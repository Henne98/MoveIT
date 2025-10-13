function showJoinPopup() {
    document.getElementById('joinOverlay').style.display = 'flex';
}

function showOptionsPopup() {
    document.getElementById('optionsOverlay').style.display = 'flex';
}

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}

function createLobby() {
    window.location.href = 'lobby_host';
}

function joinLobby() {
    const inputCode = document.getElementById('joinCodeInput').value.trim().toUpperCase();
    const savedCode = localStorage.getItem('lobbyCode');

    if (inputCode === savedCode) {
        window.location.href = 'lobby';
    } else {
        alert('Ungültiger Lobby-Code!');
    }
}