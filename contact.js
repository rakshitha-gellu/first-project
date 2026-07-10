document.getElementById("contactForm").addEventListener("submit", function(e){

e.preventDefault();

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const subject=document.getElementById("subject").value;
const message=document.getElementById("message").value;

let contacts=JSON.parse(localStorage.getItem("contacts")) || [];

contacts.push({

name,
email,
subject,
message,
date:new Date().toLocaleString()

});

localStorage.setItem("contacts",JSON.stringify(contacts));

alert("Your message has been sent successfully!");

this.reset();

});