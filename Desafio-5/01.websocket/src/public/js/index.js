//Iniciar el Socket

const socket = io();

socket.emit('message','Mensaje desde el Front');

socket.on('evento_para_mi',(data)=>{
    console.log(data);
})

socket.on('evento_no_para_mi',(data)=>{
    console.log(data);
})

socket.on('evento_para_todos',(data)=>{
    console.log(data);
})

const chatInput = document.getElementById('chat-input');
chatInput.addEventListener('input',(event)=>{
    socket.emit('input-message',event.target.value)
})


const inputMessage = document.getElementById('input-message')
socket.on('input-message',(data)=>{
    inputMessage.innerText = data;
})

const sendButton = document.getElementById('send-button')
sendButton.addEventListener('click',(event)=>{
    socket.emit('chat-message',chatInput.value);
})

const chatMessages = document.getElementById('chat-messages');
socket.on('chat-messages-update',(data)=>{
    chatMessages.innerHTML = '';
    for(const el of data){
        const li = document.createElement('li');
        li.innerText = `${el.socketId}:${el.message}`
        chatMessages.appendChild(li)
    }
})