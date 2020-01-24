var server = new SillyClient();

// When receiving a message, process the message depending the type of message
server.on_message = function(author_id, msg) {
  let messageObject = JSON.parse(msg);
  switch (messageObject.type) {
    case 'message':
      appendMessage(messageObject);
      break;
    case 'request':
      processRequest(author_id);
      break;
    case 'log':
      processLog(messageObject);
      break;
    default:
      break;
  }
}

// type request: Is a request for the log of messages from: the new user, to: the oldest in the room
// The oldest now will send a msg type log to the new user
function processRequest(author_id) {
  let msg = {
    type: 'log',
    messages: messageList,
  }
  msg = JSON.stringify(msg);
  server.sendMessage(msg, author_id);
}

// The new user receives the log (list of messages) and add them into the interface
function processLog(msg) {
  msg.messages.forEach(m => {
    appendMessage(m);
  });
}

server.on_ready = function(id) {
  my_id = id;
  document.getElementById('chat-container').style.display = 'block';   // Show chat
  document.getElementById('user-icon').style.color = getColorById(id); // Change icon color
  setFocusMessageInput();
}

// Get the lowestId in the room and request for the log of messages
server.on_room_info = function(info) {
  let lowestId = Math.min.apply(Math, info.clients);
  if(lowestId != my_id) {
    let msg = {
      type: 'request',
    }

    server.sendMessage(msg, lowestId);
  }
}