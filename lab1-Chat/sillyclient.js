var server = new SillyClient();

// Connect to the server roomname = CHAT
server.connect("location.host" + ":55000", "CHAT");

//Change the text in the website
$("#server_info").html("Connecting...");

server.on_message = function( user_id, msg ){
  console.log("ASF");
}