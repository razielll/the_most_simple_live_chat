'use strict';
let socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt("enter user name");
appendMsg('You join');
socket.emit('new-user', name)

// socket.on('chat-message', data => {
// })

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMsg(`You: ${message}`);
    socket.emit('send-chat-message', { name, message });
    messageInput.value = ''
});

socket.on('send-message-to-chat', data => {
    appendMsg(`${data.name}: ${data.message}`)
})

socket.on('user-connected', (name) => {
    appendMsg(`${name} Joined!`);
})

socket.on('user-left', (name) => {
    appendMsg(`${name} left chat`)
})

function appendMsg(message) {
    const messageEl = document.createElement('div');
    messageEl.innerText = message;
    messageContainer.append(messageEl)
}
