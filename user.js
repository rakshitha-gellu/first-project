const user = JSON.parse(localStorage.getItem("loggedInUser"));

const userName=document.getElementById("userName");

if(user){

    userName.innerHTML=user.name;

    userName.href="#";

}