function register(){

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    if(name==="" || email==="" || password===""){

        alert("Fill all fields");

        return;

    }

    const exists = users.find(user=>user.email===email);

    if(exists){

        alert("Email already registered");

        return;

    }

    users.push({

        name,

        email,

        password

    });

    localStorage.setItem("users",JSON.stringify(users));

    alert("Registration Successful");

    window.location.href="login.html";

}



function login(){

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const email=document.getElementById("loginEmail").value;

    const password=document.getElementById("loginPassword").value;

    const user=users.find(u=>u.email===email && u.password===password);

    if(!user){

        alert("Please register before proceeding.");

        return;

    }

    localStorage.setItem("loggedInUser",JSON.stringify(user));

    alert("Login Successful");

    window.location.href="index.html";

}



function logout(){

    localStorage.removeItem("loggedInUser");

    window.location.href="login.html";

}
