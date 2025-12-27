// Store users in localStorage
function signUp(e){
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(users.find(u => u.username === username)) return alert("User exists!");
    users.push({username,password,images:[]});
    localStorage.setItem("users",JSON.stringify(users));
    alert("Account created!");
    location.href="login.html";
}

function login(e){
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")||"[]");
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    let user = users.find(x => x.username===u && x.password===p);
    if(!user) return alert("Invalid credentials");
    localStorage.setItem("currentUser",u);
    location.href="profile.html";
}

function logout(){
    localStorage.removeItem("currentUser");
    location.href="index.html";
}

function loadProfile(){
    let user = localStorage.getItem("currentUser");
    if(!user) location.href="login.html";

    let users = JSON.parse(localStorage.getItem("users"));
    let me = users.find(u=>u.username===user);

    let gallery = document.getElementById("myGallery");
    me.images.forEach(img=>{
        let i=document.createElement("img"); i.src=img;
        gallery.appendChild(i);
    });
}

function uploadImage(){
    let file = document.getElementById("imageUpload").files[0];
    let reader = new FileReader();
    reader.onload = function(){
        let users = JSON.parse(localStorage.getItem("users"));
        let user = localStorage.getItem("currentUser");
        let me = users.find(u=>u.username===user);
        me.images.push(reader.result);
        localStorage.setItem("users",JSON.stringify(users));
        location.reload();
    };
    reader.readAsDataURL(file);
}

// Public user gallery
function loadPublicUser(){
    let username = new URLSearchParams(location.search).get("u");
    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find(u=>u.username===username);

    document.getElementById("userTitle").innerText=username+"'s Gallery";
    let gallery=document.getElementById("publicGallery");
    user.images.forEach(i=>{
        let img=document.createElement("img"); img.src=i;
        gallery.appendChild(img);
    });
}

// Landing page random images
function loadLandingImages(){
    let gallery=document.getElementById("gallery");
    let users=JSON.parse(localStorage.getItem("users")||"[]");
    let all=[];
    users.forEach(u=>all.push(...u.images));
    all.sort(()=>0.5-Math.random()).slice(0,9).forEach(img=>{
        let i=document.createElement("img"); i.src=img;
        gallery.appendChild(i);
    });
}
