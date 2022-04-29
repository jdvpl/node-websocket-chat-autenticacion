// referencias


const txtUid =document.querySelector("#txtUid");
const txtMensaje =document.querySelector("#txtMensaje");
const ulUsers =document.querySelector("#ulUsers");
const ulMensajes =document.querySelector("#ulMensajes");
const btnSalir =document.querySelector("#btnSalir");


const url = window.location.hostname.includes("localhost")
? "http://localhost:4000/api/auth/"
: "https://jdvpl-rest-server-node.herokuapp.com/api/auth/";

let usuario=null;
let socket=null;

// validar el token del ls
const validarJWT=async()=>{
  const token=localStorage.getItem("token") || '';

  if(token.length<=10){
    window.location='index.html';
    throw new Error("No hay toekn en el servidor");
  }

  const resp=await fetch(url,{
    headers: {'x-token': token}
  });

  const {user:userDb,token:tokenDb}=await resp.json();

  localStorage.setItem("token",tokenDb);
  usuario=userDb;
  document.title=usuario.name;

  await conectarSocket();
}

const conectarSocket=async()=>{
    socket=io({
      'extraHeaders': {
        'x-token':localStorage.getItem("token")
      }
    });

    socket.on('connect',()=>{
      console.log("socket online")
    })
    socket.on('disconnect',()=>{
      console.log("socket offline")
    })
    socket.on('recibir-mensajes',drawMessages)

    socket.on('usuarios-activos',drawUsers)

    socket.on('mensaje-privado',(payload)=>{
      console.log(payload)
    })

}



const drawUsers=(users=[])=>{
  let userHtml='';
  users.forEach(({email,name,uid})=>{
    userHtml+=`
      <li>
        <p>
          <h5 class="text-success">${name}</h5>
          
          <span class="fs-6 text-muted">${uid}</span>
          <p class="">${email}</p>
        </p>
      </li>
    `;
  })
  ulUsers.innerHTML=userHtml;
}
// 
const drawMessages=(mensajes=[])=>{
  let messageHtml='';
  mensajes.forEach(({message,name,fecha})=>{
    messageHtml+=`
      <li>
        <p>
          <h6 class="text-primary">${name}</h6>
          <span class="fs-6 text-muted">${fecha}</span>
          <p class="">${message}</p>
        </p>
      </li>
    `;
  })
  ulMensajes.innerHTML=messageHtml;
}


txtMensaje.addEventListener('keyup',({keyCode})=>{

  const mensaje=txtMensaje.value;
  const uid=txtUid.value;

  if(keyCode!==13){return;}
  if(mensaje.trim().length==0){return;}

  socket.emit('enviar-mensaje',{mensaje,uid});

  txtMensaje.value='';
})
const main=async()=>{
  await validarJWT();
}
main();

