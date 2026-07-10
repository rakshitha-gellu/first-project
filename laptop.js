let allLaptops = [];

// Fetch JSON Data
fetch("laptop.json")
    .then(response => response.json())
    .then(data => {
        allLaptops = data;
        displayLaptops(allLaptops);
    })
    .catch(error => console.log(error));

// Display Products
function displayLaptops(laptops) {

    const laptopGrid = document.getElementById("laptopGrid");
    laptopGrid.innerHTML = "";

    if (laptops.length === 0) {
        laptopGrid.innerHTML = "<h2>No Laptop Found</h2>";
        return;
    }

    laptops.forEach(laptop => {

        laptopGrid.innerHTML += `
            <div class="card" onclick="openProduct(${laptop.id})">
            <div class="wishlist-icon" onclick="addToWishlist(${laptop.id})">♡</div>

                <img src="${laptop.image}" alt="${laptop.name}">
                <h2>${laptop.name}</h2>
                <p>${laptop.price}</p>
                <button class="btn-add-cart">View Details</button>
            </div>
        `;
    });
}

// Search Function
function searchLaptops() {

    const searchValue = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const filteredLaptops = allLaptops.filter(laptop =>
        laptop.name.toLowerCase().includes(searchValue)
    );

    displayLaptops(filteredLaptops);
}

// Search Button
document.getElementById("searchBtn").addEventListener("click", searchLaptops);

// Search While Typing
document.getElementById("searchInput").addEventListener("keyup", function (e) {

    searchLaptops();

    if (e.key === "Enter") {
        searchLaptops();
    }

});
//product details
function openProduct(id) {

    window.location.href = `lap.html?id=${id}`;

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
