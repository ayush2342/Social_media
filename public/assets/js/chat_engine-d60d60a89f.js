class chatEngine{constructor(e,s){this.chatBoxId=$(`#${e}`),this.userEmail=s,this.socket=io.connect("http://3.83.128.21:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("Connection establshed using sockets ....!"),e.socket.emit("join_room",{user_email:e.userEmail,chatroom:"socialcode"}),e.socket.on("user_joined",(function(e){console.log("a user joined",e)}))})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"socialcode"})})),e.socket.on("received_message",(function(s){console.log("message received",s.message);let o=$("<li>"),t="other-message";s.user_email==e.userEmail&&(t="self-message"),o.addClass(t),o.append($("<span>",{html:s.message})),$("#chat-messages-list").append(o)}))}}