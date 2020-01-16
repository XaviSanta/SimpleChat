// Store The username and room that the user inputs
var username;
var roomNumber;

////////////////////////////////////////////

function sendLogin() {
  username = document.getElementById('username-input').value; 
  roomNumber = document.getElementById('room-input').value;
  
  // TODO: initiate connection with server
  
  // Enter room:
  // Change roomNumber
  let chatTitle = document.getElementById('chat-title')
  chatTitle.innerHTML = 'Room ' + roomNumber;
}

////////////////////////////////////////////
let writeMessageInput = document.getElementById('sendMessageInput');
writeMessageInput.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    sendMessage();
  }
});

////////////////////////////////////////////
function sendMessage() {
  let textMessage = getMessage();
  appendMessage(textMessage);
  clearInput();
}

////////////////////////////////////////////
function getMessage() {
  return document.getElementById('sendMessageInput').value;
}

function appendMessage(text) {
  let messageListContainer = document.getElementById('container-messages');
  let messageContainer = document.createElement('div');
  let usernameDiv = document.createElement('div');
  let textMessageP = document.createElement('p');
  
  usernameDiv.innerHTML = username;
  textMessageP.innerHTML = text;
  
  messageContainer.className = 'our message-container';
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
