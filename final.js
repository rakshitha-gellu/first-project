  let allProducts = [];

fetch("product.json")
    .then(response => response.json())
    .then(products => {
        allProducts = products;
        displayProducts(allProducts);
    })
    .catch(error => console.error(error));

function displayProducts(products) {

    const cards = document.getElementById("cards");

    cards.innerHTML = "";

    products.forEach(product => {

        cards.innerHTML += `
        <div class="card"  onclick="openProduct(${product.id})">
            <div class="wishlist-icon" onclick="addToWishlist(${product.id})">♡</div>
            <div class="image-box">

        ${product.trending ? `<span class="badge">Trending</span>` : ""}

       
            <img src="${product.image}">
             </div>
            <h2>${product.name}</h2>
           
            <p>${product.category}</p>
            <p class="price">
             <p class="offer">${product.discount}% OFF</p>
            <span class="old-price">₹${product.oldPrice}</span>
            <span class="new-price">₹${product.price}</span>
           
            </p>
              <p>Rating: ⭐${product.rating}</p>
            <p>Stock : ${product.stock}</p>

            <button class="btn-add-cart" onclick="viewCart(${product.id})">View Details</button>
           
        </div>
        `;

    });

}
//search
document.getElementById("searchBtn").addEventListener("click", searchProduct);

document.getElementById("searchInput").addEventListener("keyup", function(e){

if(e.key==="Enter"){

searchProduct();

}
if(this.value.trim() === ""){
    displayProducts(allProducts)
}

});

function searchProduct(){

let value=document.getElementById("searchInput").value.toLowerCase();

let filtered=allProducts.filter(product=>{

return product.name.toLowerCase().includes(value) ||

product.category.toLowerCase().includes(value);

});

if(filtered.length === 0){
            document.querySelector("cards").innerHTML = 
            "<h2>No Product Found</h2>"
        }else{
            displayProducts(filtered)
        }

}

//product details
function openProduct(id) {

    window.location.href = `details.html?id=${id}`;

}
//add to cart
/*
function addToCart(id) {

    // Check login
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("Please login to add products to your cart.");
        window.location.href = "login.html";
        return;
    }

    const product = allProducts.find(item => item.id == id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(item => item.id == id);

    if (exists) {
        exists.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Added To Cart");
}
function updateCartCount(){

let cart=JSON.parse(localStorage.getItem("cart")) || [];

let count=0;

cart.forEach(item=>{

count+=item.quantity;

});

document.getElementById("cartCount").innerHTML=`Cart (${count})`;

}

updateCartCount();*/

//wishlist
function addToWishlist(id) {

    // Check login
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("Please login to add products to your wishlist.");
        window.location.href = "login.html";
        return;
    }

    const product = allProducts.find(product => product.id == id);

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(product => product.id == id);

    if (exists) {
        alert("Already in Wishlist");
        return;
    }

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistCount();

    alert("Added to Wishlist");
}
function updateWishlistCount(){

let wishlist=JSON.parse(localStorage.getItem("wishlist")) || [];

document.getElementById("wishlistCount").innerHTML=`Wishlist (${wishlist.length})`;

}

updateWishlistCount();

//
function toggleCategory(){

    const list = document.getElementById("categoryList");

    if(list.style.display === "block"){

        list.style.display = "none";

    }else{

        list.style.display = "block";

    }

}

// Close when clicking outside
document.addEventListener("click", function(e){

    const closee = document.querySelector(".filter-box");

    if(!closee.contains(e.target)){

        document.getElementById("categoryList").style.display="none";

    }

});

//
