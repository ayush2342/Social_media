
module.exports.chatSockets = function(socketServer){

    let io = require('socket.io')(socketServer, {
        cors: {
          origin: 'http://3.83.128.21:8000',
          methods: ['GET', 'POST'],
          allowedHeaders: ['Content-Type'],
          credentials: true,
        },
      });
    

    io.sockets.on('connection',function(socket)
    {
        console.log('New connection received',socket.id)

        socket.on('disconnect',function(socket)
        {
            console.log('Socket disconnected')
        })

        socket.on('join_room',function(data)
        {
            console.log('Joining Request Received...',data)

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        })

        socket.on('send_message',function(data)
        {
            io.in(data.chatroom).emit('received_message',data);
        })
    })
}