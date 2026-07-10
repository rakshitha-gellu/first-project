let allMobiles=[];
const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

fetch("mobile.json")
.then(res=>res.json())
.then(data=>{
      allMobiles = data;
    const product = data.find(mobile=>mobile.id===productId);

    displayProduct(product);
    updateCartCount();
    updateWishlistCount();


});

function displayProduct(mobile){

    if (!mobile) {
        document.getElementById("productDetails").innerHTML =
            "<h2>Product Not Found</h2>";
        return;
    }

document.getElementById("productDetails").innerHTML=`

<div class="product-page">

<div class="left">

<img src="${mobile.image}">

</div>

<div class="right">

<h1>${mobile.name}</h1>

<p>${mobile.category}</p>

<h2>${mobile.price}</h2>

<p>⭐⭐⭐⭐⭐</p>

<button class="add-cart" onclick="addToCart(${mobile.id})">Add To Cart</button>

<button class="buy-now" onclick="buyNow(${mobile.id})">Buy Now</button>

</div>

</div>

`;

}

//add to cart
/*
function addToCart(id) {

    const product = allMobiles.find(mobile => mobile.id == id);

    if (!product) {
        alert("Product not found");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(mobile => mobile.id == id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product Added Successfully");
}

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(mobile => {
        count += mobile.quantity;
    });

    document.getElementById("cartCount").innerHTML = `Cart (${count})`;
}*/

// Add To Cart
function addToCart(id) {

    const product = allMobiles.find(mobile => mobile.id == id);

    if (!product) {
        alert("Product not found");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => item.id == id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product Added to Cart");
}

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });
const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = `Cart (${count})`;
    }
}
    /*document.getElementById("cartCount").textContent = `Cart (${count})`;
}*/
//wishlist

function addToWishlist(id){

    const product = allMobiles.find(mobile=>mobile.id==id);

    if(!product){
        alert("Product not found");
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(mobile=>mobile.id==id);

    if(exists){

        alert("Already in Wishlist");
        return;

    }

    wishlist.push(product);

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    updateWishlistCount();

    alert("Added to Wishlist");

}

function updateWishlistCount(){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    document.getElementById("wishlistCount").textContent = wishlist.length;

}

updateWishlistCount();

//buy now

function buyNow(id){

    const product = allMobiles.find(mobile => mobile.id == id);

    if(!product){
        alert("Product not found");
        return;
    }

    localStorage.setItem("buyNowProduct", JSON.stringify(product));

    window.location.href = "checkout.html";

}
