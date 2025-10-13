window.onload = () => {
  const popup = document.getElementById("popup");
  const lobbyView = document.getElementById("lobby");
  const joinButton = document.getElementById("join_button");
  const lobbyCodeInput = document.getElementById("lobby_code_input");

  // Referenzen auf Lobby-Elemente
  const ready = document.getElementById("ready");
  const leaveLobby = document.getElementById("leave_lobby");
  const msgCon = document.getElementById("msgs-con");
  const codeView = document.getElementById("lobby-code-view");
  const peopleCon = document.getElementById("people");
  const send = document.getElementById("send");
  const msgBody = document.getElementById("msg-body");

  let id = Math.floor(Math.random() * 100);
  console.log("ID is", id);

  joinButton.onclick = async () => {
    try {
      const code = lobbyCodeInput.value;
      const a = await $$$.enter(id, code);
      actionReport("", a, msgCon);
      codeView.innerHTML = code;

      const people = await $$$.people(id);
      viewPeople(people, peopleCon);

      popup.style.display = "none";
      lobbyView.style.display = "block";
    } catch (err) {
      console.log(err);
      errorReport("", err.msg, msgCon);
    }
  };

  send.onclick = () => {
    if (msgBody.value) {
      $$$.all("msg", { id, msg: msgBody.value });
      msgBody.value = "";
    }
  };

  leaveLobby.onclick = async () => {
    try {
      const a = await $$$.leave(id);
      actionReport("", "You have left the lobby " + a.code, msgCon);
      codeView.innerHTML = "N/A";
      peopleCon.innerHTML = "";
      lobbyView.style.display = "none";
      popup.style.display = "block";
    } catch (err) {
      console.log(err);
      errorReport("", err.msg, msgCon);
    }
  };

  ready.onclick = async () => {
    try {
      const a = await $$$.join(id);
      actionReport("", a, msgCon);
    } catch (err) {
      console.log(err);
      errorReport("", err.msg, msgCon);
    }
  };

  $$$.socket.on("new_entry", (data) => {
    actionReport("", data.msg, msgCon);
    peopleCon.innerHTML += `<div class="player" id="i${data.id}">${data.id}</div>`;
  });

  $$$.socket.on("left", (data) => {
    actionReport("", data.msg, msgCon);
    document.getElementById("i" + data.id)?.remove();
  });

  $$$.socket.on("msg", (data) => {
    chatMessage(data.id, data.msg, msgCon);
  });
};