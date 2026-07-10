let allProducts=[];
const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

fetch("data.json")
.then(res=>res.json())
.then(products=>{
      allProducts = products;
    const product = products.find(item=>item.id===productId);

    displayProduct(product);
    updateCartCount();
    updateWishlistCount();


});

function displayProduct(product){

    if (!product) {
        document.getElementById("productDetails").innerHTML =
            "<h2>Product Not Found</h2>";
        return;
    }

document.getElementById("productDetails").innerHTML=`

<div class="product-page">

<div class="left">

<img src="${product.image}">

</div>

<div class="right">

<h1>${product.name}</h1>

<p>${product.category}</p>

<h2>${product.price}</h2>

<p>⭐⭐⭐⭐⭐</p>

<button class="add-cart" onclick="addToCart(${product.id})">Add To Cart</button>

<button class="buy-now" onclick="buyNow(${product.id})">Buy Now</button>

</div>

</div>

`;

}

//add to cart

function addToCart(id) {

    const product = allProducts.find(item => item.id == id);

    if (!product) {
        alert("Product not found");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => item.id == id);

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

    cart.forEach(item => {
        count += item.quantity;
    });

    document.getElementById("cartCount").innerHTML = `Cart (${count})`;
}


//wishlist

function addToWishlist(id){

    const product = allProducts.find(item=>item.id==id);

    if(!product){
        alert("Product not found");
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(item=>item.id==id);

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

    document.getElementById("wishlistCount").innerHTML = wishlist.length;

}

updateWishlistCount();

//buy now

function buyNow(id){

    const product = allProducts.find(item => item.id == id);

    if(!product){
        alert("Product not found");
        return;
    }

    localStorage.setItem("buyNowProduct", JSON.stringify(product));

    window.location.href = "checkout.html";

}
