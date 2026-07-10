let allMobiles = [];

// Fetch JSON Data
fetch("mobile.json")
    .then(response => response.json())
    .then(data => {
        allMobiles = data;
        displayMobile(allMobiles);
    })
    .catch(error => console.log(error));

// Display Products
function displayMobile(mobiles) {

    const container = document.querySelector("#mobiles");
    container.innerHTML = "";

    mobiles.forEach(mobile => {

        container.innerHTML += `
            <div class="card" onclick="openProduct(${mobile.id})">
            
                <img src="${mobile.image}" alt="${mobile.name}">
                <h3>${mobile.name}</h3>
                <p>${mobile.category}</p>
                <span>${mobile.price}</span>
                
                <p>⭐ ${mobile.rating}</p>
                <p>Stock: ${mobile.stock}</p>
                <button class="btn-add-cart">View Details</button>
            </div>
        `;
    });
}
//<div class="wishlist-icon" onclick="addToWishlist(${mobile.id})">♡</div>

// Search Function
function searchMobiles() {

    let searchValue = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();
      if(searchValue === ""){
        displayMobile(allMobiles)
        return;
      }
    let filteredMobiles = allMobiles.filter(mobile =>{
        return(
        mobile.name.toLowerCase().includes(searchValue) ||
        mobile.category.toLowerCase().includes(searchValue) ||
        mobile.id.toString().includes(searchValue) ||
        mobile.price.toString().includes(searchValue) ||
        mobile.rating.toString().includes(searchValue) ||
        mobile.stock.toString().includes(searchValue)
        );
        });

        if(filteredMobiles.length === 0){
            document.querySelector("#mobiles").innerHTML = 
            "<h2>No Product Found</h2>"
        }else{
            displayMobile(filteredMobiles)
        }


}

// Search Button
document.getElementById("searchBtn").addEventListener("click", searchMobiles);

// Search While Typing
document.getElementById("searchInput").addEventListener("keyup", function (e) {

    

    if (e.key === "Enter") {
        searchMobiles();
    }
    if(this.value.trim() === ""){
        displayMobile(allMobiles);
    }

});

//product details
function openProduct(id) {

    window.location.href = `mob.html?id=${id}`;

}
