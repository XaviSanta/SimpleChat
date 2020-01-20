var messageList = [];

var server = new SillyClient();
var my_id;
var username;
var roomName;

server.on_message = function(author_id, msg) {
  let messageObject = JSON.parse(msg);
  if(messageObject.type === 'message') {
    appendMessage(messageObject);
  }
  
  if(messageObject.type === 'request') {
    let msg = {
      type: 'log',
      messages: messageList,
    }
    msg = JSON.stringify(msg);
    server.sendMessage(msg, author_id);
  }

  if(messageObject.type === 'log') {
    messageObject.messages.forEach(m => {
      appendMessage(m);
    });
  }
}

function connectToServer() {
  server.connect('wss://tamats.com:55000', roomName);
}

server.on_ready = function(id) {
  my_id = id;
  document.getElementById('chat-container').style.display = 'block';
}

server.on_room_info = function(info) {
  let lowestId = Math.min.apply(Math, info.clients);
  if(lowestId != my_id) {
    let room = info.name;
    let msg = {
      type: 'request',
    }
    server.sendMessage(msg, lowestId);
  }
}

function sendMessage() {
  const textMsg = getMessage();

  let msg = {
    type: 'message',
    text: textMsg,
    id: my_id,
    username: username,
  }
  
  appendMessage(msg);
  server.sendMessage(JSON.stringify(msg));
  clearInput();
}

server.on_user_connected = function( user_id ) {
  let messageListContainer = document.getElementById('container-messages');
  let l = document.getElementById('user-list');
  console.log(messageListContainer);
  let c = document.createElement('p');
  c.innerHTML = user_id;
  l.appendChild(c);
  console.log(l);
}