const room = document.getElementById('room');
const inputData = document.getElementById('inputData');
const sendMessage = document.getElementById('sendMessage');
const chatBox = document.getElementById('chatBox');

const socket = io();

let currentRoom = 'general';
socket.emit('joinRoom', currentRoom);


room.addEventListener('change', () => {
    currentRoom = room.value;
    socket.emit('joinRoom', currentRoom);
})

sendMessage.addEventListener('click', () => {
    let message = inputData.value;
    socket.emit('message', { room: currentRoom, message });
})

socket.on('message', (msg) => {
    const msgElement = document.createElement('p');
    msgElement.textContent = msg;
    chatBox.appendChild(msgElement);
})