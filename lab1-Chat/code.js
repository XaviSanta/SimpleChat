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
  let username = document.createElement('div');
  let textMessageElement = document.createElement('p');
  
  username.innerHTML = 'Xavi';
  textMessageElement.innerHTML = text;
  
  messageContainer.className = 'message-container';
  username.className = 'message-username';
  
  messageListContainer.append(messageContainer);
  messageContainer.append(username);
  messageContainer.append(textMessageElement);

  // scroll bottom
  scrollElementToBottom(messageListContainer);
}

function scrollElementToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

function clearInput() {
  document.getElementById('sendMessageInput').value = '';
}
