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
    case 'hello':
      processHello(author_id, messageObject);
      break;
    case 'hello2':
      processHello2(author_id, messageObject);
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

function processHello(author_id, msg) {
  let id = author_id;
  let username = msg.username;
  userDict[id] = username; // Add new entry to our 'dictionary'
  console.log(id + '  ' + userDict[id]);
  let hello2 = {
    type: 'hello2',
    username: my_username,
  }

  hello2 = JSON.stringify(hello2);
  server.sendMessage(hello2, id);
}

function processHello2(author_id, msg) {
  let id = author_id;
  let username = msg.username;
  userDict[id] = username; // Add new entry to our 'dictionary'

  // Show user has joined the room in the screen
  username = username.fontcolor(getColorById(id));
  let notification = username.bold() + ' has joined the room.';
  appendNotification(notification);
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

    msg = JSON.stringify(msg);
    server.sendMessage(msg, lowestId);
  }
}

// When new user connected we want to know the username of that id and print it in screen
// so first we will say hello to the new user and wait the response containing the username
server.on_user_connected = function (user_id) {
  let msg = {
    type: 'hello',
    username: my_username,
  }

  msg = JSON.stringify(msg);
  server.sendMessage(msg, user_id);
}

// When user disconnects we want to notify the other ones that this user left the chat
server.on_user_disconnected = function (user_id) {
  let username = userDict[user_id];
  username = username.fontcolor(getColorById(user_id));
  let notification = username.bold() + ' has left the room.';
  appendNotification(notification);
}