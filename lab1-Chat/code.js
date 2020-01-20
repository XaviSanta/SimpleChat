function sendLogin() {
  username = document.getElementById('username-input').value; 
  roomName = document.getElementById('room-input').value;
  
  // initiate connection with server
  connectToServer();

  // Change roomNumber
  let chatTitle = document.getElementById('chat-title')
  chatTitle.innerHTML = roomName;
}

////////////////////////////////////////////
let writeMessageInput = document.getElementById('sendMessageInput');
writeMessageInput.addEventListener('keydown', function(e) {
  if(e.key === 'Enter') {
    sendMessage();
  }
});

////////////////////////////////////////////
function getMessage() {
  return document.getElementById('sendMessageInput').value;
}

function appendMessage(msg) {
  let messageListContainer = document.getElementById('container-messages');
  let messageContainer = document.createElement('div');
  let usernameDiv = document.createElement('div');
  let textMessageP = document.createElement('p');
  
  usernameDiv.innerHTML = msg.username;
  textMessageP.innerHTML = msg.text;
  
  msg.id === my_id ? 
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
