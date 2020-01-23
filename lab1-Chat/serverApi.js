var server = new SillyClient();

server.on_message = function(author_id, msg) {
  let messageObject = JSON.parse(msg);
  if(messageObject.type === 'message') {
    appendMessage(messageObject);
  }
  
  if(messageObject.type === 'request') {
    let msg = {
      type: 'log',
      messages: messageList,
    }
    msg = JSON.stringify(msg);
    server.sendMessage(msg, author_id);
  }

  if(messageObject.type === 'log') {
    messageObject.messages.forEach(m => {
      appendMessage(m);
    });
  }
}

server.on_ready = function(id) {
  my_id = id;
  document.getElementById('chat-container').style.display = 'block';
  setFocusMessageInput();
}

server.on_room_info = function(info) {
  let lowestId = Math.min.apply(Math, info.clients);
  if(lowestId != my_id) {
    let msg = {
      type: 'request',
    }

    server.sendMessage(msg, lowestId);
  }
}