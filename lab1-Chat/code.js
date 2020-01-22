function sendLogin() {
  username = document.getElementById('username-input').value; 
  roomName = document.getElementById('room-input').value;
  if(validLogin(username, roomName)){

    // initiate connection with server
    connectToServer();
    
    // Change roomNumber
    let chatTitle = document.getElementById('chat-title')
    chatTitle.innerHTML = 'Room name: ' + roomName.bold();
    
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

function getColorById(id) {
  let i = id.substring(id.length - 1)

  let r = (id*(i+0)*7) % 225 + 30;
  let g = (id*(i+1)*9) % 225 + 30;
  let b = (id*(i+2)*11) % 225 + 30;

  console.log(id + ' ' + `rgb(${r},${g},${b})`)
  return `rgb(${r},${g},${b})`;
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