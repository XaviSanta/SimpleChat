var messageList = [];
var my_id;
var my_username;

// Send Login
var usernameInput = document.getElementById('username-input');
var roomInput = document.getElementById('room-input');
usernameInput.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    sendLogin();
  }
});

roomInput.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    sendLogin();
  }
});

function sendLogin() {
  let username = document.getElementById('username-input').value; 
  let roomName = document.getElementById('room-input').value;
  if(isValidLogin(username, roomName)){
    my_username = username;
    server.connect(`${config.serverName}:${config.portNumber}`, `${config.prefix}${roomName}`);
    
    // Set roomName
    let chatTitle = document.getElementById('chat-title');
    chatTitle.innerHTML = 'Room: ' + roomName.bold();
    
    // Clear chat when changing rooms 
    removeChilds('container-messages'); 
    messageList = [];
  }
}

// Rules for valid username and Roomname to avoid clients inject code
function isValidLogin(username, roomName) {
  return isValidString(username) && isValidString(roomName) ? username !== '' && roomName !== '' : false;
}

function isValidString(str) {
  var arr = ['<', '>', '+', ',', '.', "'", '_', '-', '&', '='];
  for (var i = arr.length - 1; i >= 0; --i) {
    if (str.indexOf(arr[i]) != -1) {
      alert(`The character ${arr[i]} is not allowed`); 
      return false;
    }
  }

  return true;
}

// Send Message
var writeMessageInput = document.getElementById('sendMessageInput');
writeMessageInput.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const textMsg = getMessage();
  if(textMsg !== '') {
    let msg = {
      type: 'message',
      text: textMsg,
      id: my_id,
      username: my_username,
    }
  
    appendMessage(msg);
    server.sendMessage(JSON.stringify(msg));
    clearInput();
  }
  
  setFocusMessageInput();
}

function getMessage() {
  return document.getElementById('sendMessageInput').value;
}

function appendMessage(msg) {
  messageList.push(msg);
  
  // Create the elements to append a message
  let messageListContainer = document.getElementById('container-messages');
  let messageContainer = document.createElement('div');
  let usernameDiv = document.createElement('div');
  let textMessageP = document.createElement('p');
  
  // Set the attributes
  usernameDiv.innerHTML = msg.username;
  usernameDiv.style.color = getColorById(msg.id);
  textMessageP.innerHTML = msg.text;
  
  // If its my message -> set class to our message, else set class to message
  msg.id === my_id ? 
    messageContainer.className = 'our message-container' :
    messageContainer.className = 'message-container';
    
  usernameDiv.className = 'message-username';
  
  // Append the elements
  messageListContainer.appendChild(messageContainer);
  messageContainer.appendChild(usernameDiv);
  messageContainer.appendChild(textMessageP);

  // scroll bottom
  scrollElementToBottom(messageListContainer);
}

var colors = [
  'red',
  'chocolate',
  'gold',
  'fuchsia', 
  'darkorange', 
  'lightgreen',
  'salmon',
  'yellowGreen',
  'snow',
  'tomato'
] ; 
function getColorById(id) {
  return colors[id % colors.length];
}

function scrollElementToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

function clearInput() {
  document.getElementById('sendMessageInput').value = '';
}

function removeChilds(elementId) {
  const element = document.getElementById(elementId);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function setFocusMessageInput(){
  document.getElementById("sendMessageInput").focus();
}