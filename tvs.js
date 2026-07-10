let allTvs = [];

// Fetch JSON Data
fetch("tvs.json")
    .then(response => response.json())
    .then(data => {
        allTvs = data;
        displayTvs(allTvs);
    })
    .catch(error => console.log(error));

// Display Products
function displayTvs(tvs) {

    const container = document.querySelector("#tvs");
    container.innerHTML = "";

    tvs.forEach(tv => {

        container.innerHTML += `
            <div class="card" onclick="openProduct(${tv.id})">
            <div class="wishlist-icon" onclick="addToWishlist(${tv.id})">♡</div>
                <img src="${tv.image}" alt="${tv.name}">
                <h3>${tv.name}</h3>
                <p>${tv.category}</p>
                <span class="price">${tv.price}</span>
                <p>⭐ ${tv.rating}</p>
                <p>Stock: ${tv.stock}</p>
                <button class="btn-add-cart">View Details</button>
            </div>
        `;
    });
}

// Search Function
function searchTvs() {

    let searchValue = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();
      if(searchValue === ""){
        displayTvs(allTvs)
        return;
      }
    let filteredTvs = allTvs.filter(tv =>{
        return(
        tv.name.toLowerCase().includes(searchValue) ||
        tv.category.toLowerCase().includes(searchValue) ||
        tv.id.toString().includes(searchValue) ||
        tv.price.toString().includes(searchValue) ||
        tv.originalPrice.toString().includes(searchValue) ||
        tv.rating.toString().includes(searchValue) ||
        tv.stock.toString().includes(searchValue)
        );
        });

        if(filteredTvs.length === 0){
            document.querySelector("#tvs").innerHTML = 
            "<h2>No Product Found</h2>"
        }else{
            displayTvs(filteredTvs)
        }


}

// Search Button
document.getElementById("searchBtn").addEventListener("click", searchTvs);

// Search While Typing
document.getElementById("searchInput").addEventListener("keyup", function (e) {

    

    if (e.key === "Enter") {
        searchTvs();
    }
    if(this.value.trim() === ""){
        displayTvs(allTvs);
    }

});

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

    document.getElementById("wishlistCount").innerHTML = wishlist.length;

}

updateWishlistCount();

//product details
function openProduct(id){

    window.location.href = `tv.html?id=${id}`;

}
//banner
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

function showSlide(i){

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");
}

next.addEventListener("click",()=>{

    index++;

    if(index>=slides.length){
        index=0;
    }

    showSlide(index);

});

prev.addEventListener("click",()=>{

    index--;

    if(index<0){
        index=slides.length-1;
    }

    showSlide(index);

});

dots.forEach((dot,i)=>{

    dot.addEventListener("click",()=>{

        index=i;
        showSlide(index);

    });

});

setInterval(()=>{

    index++;

    if(index>=slides.length){
        index=0;
    }

    showSlide(index);

},4000);