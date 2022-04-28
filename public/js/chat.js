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
    socket.on('recibir-mensajes',()=>{
      // todo
    })

    socket.on('usuarios-activos',drawUsers)

    socket.on('mensaje-prvado',()=>{
      // todo
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
const main=async()=>{
  await validarJWT();
}
main();

