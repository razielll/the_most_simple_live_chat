const io = require('socket.io')(3000);

const users = {}

io.on('connection', (socket) => {
    console.log('new connection');
    // socket.emit('chat-message', 'Hello World');

    // client sends msg
    socket.on('send-chat-message', ({ name, message }) => {
        // console.log('client send msg ', { message, name: users[socket.id] });

        // send to all BUT the sender
        socket.broadcast.emit('send-message-to-chat', { name, message });
        // this makes the msg visible to the sender
        // io.emit('send-message-to-chat', { message, name: users[socket.id] })
    });

    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name)
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-left', users[socket.id]);
        delete users[socket.id]
    })

});
