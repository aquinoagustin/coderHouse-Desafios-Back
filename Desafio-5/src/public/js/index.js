//Iniciar el Socket

const socket = io();

socket.emit('message','Msg desde el front')


socket.on('evento_solo_para_mi',(data)=>console.log(data))
socket.on('evento_no_para_mi',(data)=>console.log(data))

const chatInput = document.getElementById('chat-input');


/*
chatInput.addEventListener('input',(event)=>{
    socket.emit('input-message',event.target.value)
})*/
 
/*
const inputMessage = document.getElementById('input-message')
socket.on('input-message',(data)=>{
    inputMessage.innerText = data;
})
*/



// TAREA

const inputMessage = document.getElementById('input-message')

const chatMessages = document.getElementById('chat-messages');

socket.on('evento_para_todos',(data)=>{
        chatMessages.innerHTML = ''
        data.map((item)=>{
            const li = document.createElement('li');
            li.innerText = `${item.id}:${item.title} US$ ${item.price}`
            chatMessages.appendChild(li)
        }
        )
    
})







/*
const sendButton = document.getElementById('send-button')
sendButton.addEventListener('click',(event)=>{
    socket.emit('chat-message',chatInput.value);
})


socket.on('chat-messages-update',(data)=>{
    chatMessages.innerHTML = '';
    for(const el of data){
        const li = document.createElement('li');
        li.innerText = `${el.socketId}:${el.message}`
        chatMessages.appendChild(li)
    }
})

*/