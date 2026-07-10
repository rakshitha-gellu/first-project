let allProducts = [];

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        displayProducts(allProducts);
    })
    .catch(error => console.log(error));

    document.getElementById("searchBtn").addEventListener("click", searchProducts);

document.getElementById("searchInput").addEventListener("keyup", function(e) {

    if (e.key === "Enter") {
        searchProducts();
    }

    if (this.value.trim() === "") {
        displayProducts(allProducts);
    }

});

function displayProducts(products) {

    const items = document.querySelector(".items");
    items.innerHTML = "";

    products.forEach(product => {

        items.innerHTML += `
        <div class="card" onclick="openProduct(${product.id})">
           <div class="wishlist-icon" onclick="addToWishlist(${product.id})">♡</div>
            <img src="${product.image}" alt="${product.name}">
             <h2>${product.name}</h2>
           
            <p>${product.category}</p>
            
            <p class="price">
             <p class="offer">${product.discount}% OFF</p>
            <span class="old-price">₹${product.oldPrice}</span>
            <span class="new-price">₹${product.price}</span>
           
            </p>
            <p>⭐ ${product.rating}</p>
            <p>Stock: ${product.stock}</p>
            <button class="btn-add-cart" onclick="window.location.href='product-details.html?id=${product.id}'">View Details</button>
        </div>
        `;

    });

}

//
function searchProducts() {

    let searchValue = document.getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    if (searchValue === "") {
        displayProducts(allProducts);
        return;
    }

    let filteredProducts = allProducts.filter(product => {

        return (
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue) ||
            product.id.toString().toLowerCase().includes(searchValue)
        );

    });

    if (filteredProducts.length === 0) {

        document.querySelector(".items").innerHTML =
            "<h2>No Products Found</h2>";

    } else {

        displayProducts(filteredProducts);

    }

}


//filter
//checkbox
function applyFilters() {

    let filtered = [...allProducts];

    // Category Filter
    const selectedCategories = [...document.querySelectorAll(".categoryFilter:checked")]
        .map(item => item.value.toLowerCase());

    if (selectedCategories.length > 0) {

        filtered = filtered.filter(product =>
            selectedCategories.includes(product.category.toLowerCase())
        );

    }

    // Price Filter
    const maxPrice = Number(document.getElementById("priceRange").value);

    filtered = filtered.filter(product =>
        Number(product.price) <= maxPrice
    );

    displayProducts(filtered);

}
    

document.querySelectorAll(".categoryFilter").forEach(checkbox => {
    checkbox.addEventListener("change", applyFilters);
});

document.querySelectorAll(".priceFilter").forEach(radio => {
    radio.addEventListener("change", applyFilters);
});

//price filter
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

priceRange.addEventListener("input", function () {

    priceValue.innerHTML = "$" + this.value;

    applyFilters();

});
document.querySelectorAll(".categoryFilter").forEach(check => {
    check.addEventListener("change", applyFilters);
});
//product details
function openProduct(id){

    window.location.href = `product-details.html?id=${id}`;

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
