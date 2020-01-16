var server = new SillyClient();
var my_id;
var username;
var roomNumber;

server.on_message = function(author_id, msg) {
  console.log(author_id);
  console.log(msg);
  appendMessage(author_id, msg);
}

function connectToServer() {
  server.connect('wss://tamats.com:55000', roomName);
  
  server.on_ready = function(id) {
    my_id = id;
    console.log('Hello, your id is: ' + my_id);
    username = 'User_'+ my_id;
  }
}

function sendMessage(msg) {
  server.sendMessage(msg);
  appendMessage(my_id, msg);
  clearInput();
}