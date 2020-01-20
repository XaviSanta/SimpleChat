var messageList = [];

var server = new SillyClient();
var my_id;
var username;
var roomName;

server.on_message = function(author_id, msg) {
  let messageObject = JSON.parse(msg);
  if(messageObject.type === 'message'){
    appendMessage(messageObject);
  }
  // if(messageObject.type === '')
}

function connectToServer() {
  server.connect('wss://tamats.com:55000', roomName);
  
  server.on_ready = function(id) {
    my_id = id;
    console.log('Hello, your id is: ' + my_id);
    // server.getRoomInfo(roomName, function(room_info) {
    //   console.log(room_info);
    // });
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

  messageList.push(msg);
  appendMessage(msg);
  server.sendMessage(JSON.stringify(msg));
  clearInput();
}

server.on_user_connected = function( user_id ) {
  for (let i = 0; i < messageList.length; i++) {
    console.log(messageList[i].text);
    server.sendMessage(messageList[i], user_id);
  }
  // let m = {
  //   type: 'roomMessages'

  // }
}