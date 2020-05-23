

const socket =  io()
let name ; 
let textarea = document.getElementById('textarea')
let messageArea = document.querySelector('.message__area')
do{
   name= prompt('Plaese enter your name')
}
while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user:name,
        message:message.trim()
    }

    //append message 
    appendMessage(msg,'outgoing')
    textarea.value=''
    ScrollBottom()
    socket.emit('message',msg)



}

function appendMessage(msg,type){
    let mainDiv =  document.createElement('div')
    let className= type
    mainDiv.classList.add(type,'message')
    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markUp
    messageArea.appendChild(mainDiv)

}

// recieve message
socket.on('message',(msg)=>{
    // console.log(msg)
    appendMessage(msg,'incoming')
    ScrollBottom()
})


function ScrollBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}