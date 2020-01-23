var messageList = [];
var my_id;
var username;
var roomName;

function sendLogin() {
  username = document.getElementById('username-input').value; 
  roomName = document.getElementById('room-input').value;
  if(validLogin(username, roomName)){
    server.connect(`${config.serverName}:${config.portNumber}`, roomName);
    
    // Set roomName
    let chatTitle = document.getElementById('chat-title');
    chatTitle.innerHTML = 'Room: ' + roomName.bold();
    
    // Clear chat when changing rooms 
    removeChilds('container-messages'); 
    messageList = [];
  }
}

let usernameInput = document.getElementById('username-input');
let roomInput = document.getElementById('room-input');
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

function validLogin(username, roomName) {
  return username !== '' && roomName !== '';
}

let writeMessageInput = document.getElementById('sendMessageInput');
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
      username: username,
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
  
  let messageListContainer = document.getElementById('container-messages');
  let messageContainer = document.createElement('div');
  let usernameDiv = document.createElement('div');
  let textMessageP = document.createElement('p');
  
  usernameDiv.innerHTML = msg.username;
  usernameDiv.style.color = getColorById(msg.id);
  textMessageP.innerHTML = msg.text;
  
  msg.id === my_id ? 
    messageContainer.className = 'our message-container' :
    messageContainer.className = 'message-container';
    
  usernameDiv.className = 'message-username';
  
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