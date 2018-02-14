(function() {      //(() => {
  const socket = io();

//variable stack
  let messageList = document.querySelector('ul'),
  chatForm = document.querySelector('form'),
  nameInput = document.querySelector('.nickname'),
  nickName = null;
  chatMessage = chatForm.querySelector('.message');

  function setNickname(){
    //debugger;
    nickName = this.value;
  }

  function handleSendMessage(e){
    e.preventDefault(); //prevent default behaviour - a submit triggers a page reload, which we don't want
    nickName = (nickName && nickName.length > 0) ? nickName : 'user'; //this is a ternary statement (like an if else statement all in one)
    //it checks to see if the variable exists, and handle if it doesn't, or if it doesn't. true is left of the colon, false is to the right
    //if a user enters a nicknamename, their nickname  shows //if there is no user name (false) user shows

   //grab the text from the input field
    msg = `${nickName} says ${chatMessage.value}`;

    //emit a chat event so that we can pass it through to the server (and everyone else)
    socket.emit('chat message', msg);
    chatMessage.value = '';
    return false;
  }

    function appendMessage(msg){
      //debugger;
      let newMsg = `<li>${msg.message}</li>`;
      messageList.innerHTML += newMsg;
    }

    function appendDMessage(msg){
      //debugger;
      let newMsg = `<li>${msg}</li>`;
      messageList.innerHTML += newMsg;
    }


  nameInput.addEventListener('change', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDMessage, false);
})();
