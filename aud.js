let allAudio=[];
const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

fetch("audio.json")
.then(res=>res.json())
.then(data=>{
      allAudio = data;
    const product = data.find(audio=>audio.id===productId);

    displayProduct(product);
    updateCartCount();
    updateWishlistCount();


});

function displayProduct(audio){

    if (!audio) {
        document.getElementById("productDetails").innerHTML =
            "<h2>Product Not Found</h2>";
        return;
    }

document.getElementById("productDetails").innerHTML=`

<div class="product-page">

<div class="left">

<img src="${audio.image}">

</div>

<div class="right">

<h1>${audio.name}</h1>

<p>${audio.category}</p>

<h2>${audio.price}</h2>

<p>⭐⭐⭐⭐⭐</p>

<button class="add-cart" onclick="addToCart(${audio.id})">Add To Cart</button>

<button class="buy-now" onclick="buyNow(${audio.id})">Buy Now</button>

</div>

</div>

`;

}

//add to cart

function addToCart(id) {

    const product = allAudio.find(audio => audio.id == id);

    if (!product) {
        alert("Product not found");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(audio => audio.id == id);

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

    cart.forEach(audio => {
        count += audio.quantity;
    });

    document.getElementById("cartCount").innerHTML = `Cart (${count})`;
}


//wishlist

function addToWishlist(id){

    const product = allAudio.find(audio=>audio.id==id);

    if(!product){
        alert("Product not found");
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(audio=>audio.id==id);

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

    const product = allAudio.find(audio => audio.id == id);

    if(!product){
        alert("Product not found");
        return;
    }

    localStorage.setItem("buyNowProduct", JSON.stringify(product));

    window.location.href = "checkout.html";

}
