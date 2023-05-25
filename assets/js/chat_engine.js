class chatEngine{
    constructor(chatBoxId,userEmail)
    {
        this.chatBoxId=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        this.socket=io.connect('http://3.83.128.21:5000')

        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self  = this;
        this.socket.on('connect',function()
        {
            console.log('Connection establshed using sockets ....!')

            self.socket.emit('join_room',
            {
                user_email:self.userEmail,
                chatroom:'socialcode'
            })
            self.socket.on('user_joined',function(data)
            {
                console.log('a user joined',data)
            })
        })

       

        $('#send-message').click(function()
          {
            let msg = $('#chat-message-input').val();

            if(msg!='')
            {
                self.socket.emit('send_message',
                {
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'socialcode'
                })
            }

          })

          self.socket.on('received_message',function(data)
        {
            console.log('message received',data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail)
            {
                messageType ='self-message'
            }

            newMessage.addClass(messageType);
            newMessage.append($('<span>',{
                'html':data.message
            }))

            $('#chat-messages-list').append(newMessage);
        })
    }
}

          