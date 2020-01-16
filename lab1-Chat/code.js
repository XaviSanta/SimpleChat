// Store The username and room that the user inputs
var server = new SillyClient();
var username;
var my_id;
var roomNumber;
////////////////////////////////////////////

function sendLogin() {
  username = document.getElementById('username-input').value; 
  roomName = document.getElementById('room-input').value;
  
  // TODO: initiate connection with server
  server.connect('wss://tamats.com:55000', roomName);
  server.on_ready = function(id) {
    my_id = id;
    console.log('Hello, your id is: ' + my_id);
    username = 'User_'+ my_id;
  }

  // Change roomNumber
  let chatTitle = document.getElementById('chat-title')
  chatTitle.innerHTML = roomName;
}

////////////////////////////////////////////
let writeMessageInput = document.getElementById('sendMessageInput');
writeMessageInput.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    let msg = getMessage();
    sendMessage(msg);
  }
});

////////////////////////////////////////////
function sendMessage(msg) {
  server.sendMessage(msg);
  appendMessage(my_id, msg);
  clearInput();
}

server.on_message = function(author_id, msg) {
  console.log(author_id);
  console.log(msg);
  appendMessage(author_id, msg);
}

////////////////////////////////////////////
function getMessage() {
  return document.getElementById('sendMessageInput').value;
}

function appendMessage(author_id, text) {
  let messageListContainer = document.getElementById('container-messages');
  let messageContainer = document.createElement('div');
  let usernameDiv = document.createElement('div');
  let textMessageP = document.createElement('p');
  
  usernameDiv.innerHTML = author_id;
  textMessageP.innerHTML = text;
  
  author_id == my_id ? 
    messageContainer.className = 'our message-container' :
    messageContainer.className = 'message-container';
    
  usernameDiv.className = 'message-username';
  
  messageListContainer.append(messageContainer);
  messageContainer.append(usernameDiv);
  messageContainer.append(textMessageP);

  // scroll bottom
  scrollElementToBottom(messageListContainer);
}

function scrollElementToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

function clearInput() {
  document.getElementById('sendMessageInput').value = '';
}
