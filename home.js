
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
console.log(productId);
fetch("product.json")
.then(res => res.json())
.then(products => {
    console.log(products)
    allProducts = products;

    const product = products.find(item => item.id === productId);
       console.log(products)
    displayProduct(product);

});

function displayProduct(product){

    if(!product){

        document.getElementById("productDetails").innerHTML +=
        "<h2>Product Not Found</h2>";

        return;
    }

    document.getElementById("productDetails").innerHTML = `

    <div class="product-page">
       
       <div class="left">
        <img src="${product.image}" width="350">
         </div>
        <div class="right">
        <h1>${product.name}</h1>

        <h3>${product.category}</h3>

        <h2>$${product.price}</h2>

        <p>⭐ ${product.rating}</p>

        <p>Stock : ${product.stock}</p>
        <button class="add-cart" onclick="addToCart(${product.id})"> Add To Cart</button>
        <button class="buy-now" onclick="buyNow(${product.id})">
            Buy Now
        </button>
    </div>
    </div>
   </div>
    `;
}

function addToCart(id) {

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const product = allProducts.find(item => item.id == id);

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

    alert("Product added to cart!");

    updateCartCount();
}
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        let total = 0;

        cart.forEach(item => {
            total += item.quantity;
        });

        cartCount.textContent = `Cart (${total})`;
    }
}
function buyNow(id) {

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const product = allProducts.find(item => item.id == id);

    if (!product) {
        alert("Product not found");
        return;
    }

    localStorage.setItem("buyNowProduct", JSON.stringify(product));

    window.location.href = "checkout.html";
}

