
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
    const socket=io({
      'extraHeaders': {
        'x-token':localStorage.getItem("token")
      }
    });

}


const main=async()=>{
  await validarJWT();
}
main();

