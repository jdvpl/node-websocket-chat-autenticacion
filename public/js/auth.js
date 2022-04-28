// /referencias
const formulario=document.querySelector('form');
const alerta=document.querySelector('#alerta');


const url = window.location.hostname.includes("localhost")
    ? "http://localhost:4000/api/auth/"
    : "https://jdvpl-rest-server-node.herokuapp.com/api/auth/";



formulario.addEventListener('submit',ev => {
  ev.preventDefault();

  const formData={};
  
  for (let el of formulario) {
    if(el.name.length > 0) {
       formData[el.name] = el.value;
    }
  }
  
  fetch(url+"login",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then(res => res.json())
  .then(({msg,token})=>{
    if(msg){
      alerta.style.display = "block";
      alerta.innerHTML = msg;
      return console.log(msg);
    }
    alerta.style.display = "none";
    localStorage.setItem('token', token);
    window.location='chat.html';
  })
  .catch(err=>{
    console.log(err)
  })

})

function handleCredentialResponse(response) {
  
  //  const tokenGoogle = response.credential;
  //  console.log(tokenGoogle)
  const body = { id_token: response.credential };
  fetch(url+"google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      const boton = (document.getElementById(
        "google_signout"
      ).style.display = "block");
      localStorage.setItem('token',resp.token);
      localStorage.setItem("email", resp.usuario.email);
    })
    .catch(console.warn());
}

const button = document.getElementById("google_signout");

button.onclick = () => {
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
