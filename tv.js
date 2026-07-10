let allTvs=[];
const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

fetch("tvs.json")
.then(res=>res.json())
.then(data=>{
      allTvs = data;
    const product = data.find(tv=>tv.id===productId);

    displayProduct(product);
    updateCartCount();
    updateWishlistCount();


});

function displayProduct(tv){

    if (!tv) {
        document.getElementById("productDetails").innerHTML =
            "<h2>Product Not Found</h2>";
        return;
    }

document.getElementById("productDetails").innerHTML=`

<div class="product-page">

<div class="left">

<img src="${tv.image}">

</div>

<div class="right">

<h1>${tv.name}</h1>

<p>${tv.category}</p>

<h2>${tv.price}</h2>

<p>⭐⭐⭐⭐⭐</p>

<button class="add-cart" onclick="addToCart(${tv.id})">Add To Cart</button>

<button class="buy-now" onclick="buyNow(${tv.id})">Buy Now</button>

</div>

</div>

`;

}

//add to cart

function addToCart(id) {

    const product = allTvs.find(tv => tv.id == id);

    if (!product) {
        alert("Product not found");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(tv => tv.id == id);

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

    cart.forEach(tv => {
        count += tv.quantity;
    });

    document.getElementById("cartCount").innerHTML = `Cart (${count})`;
}


//wishlist

function addToWishlist(id){

    const product = allTvs.find(tv=>tv.id==id);

    if(!product){
        alert("Product not found");
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(tv=>tv.id==id);

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

    const product = allTvs.find(tv => tv.id == id);

    if(!product){
        alert("Product not found");
        return;
    }

    localStorage.setItem("buyNowProduct", JSON.stringify(product));

    window.location.href = "checkout.html";

}
