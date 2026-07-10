let allAudio = [];

// Fetch JSON Data
fetch("audio.json")
    .then(response => response.json())
    .then(data => {
        allAudio = data;
        displayAudio(allAudio);
    })
    .catch(error => console.log(error));

// Display Products
function displayAudio(audios) {

    const container = document.querySelector("#audio");
    container.innerHTML = "";

    audios.forEach(audio => {

        container.innerHTML += `
            <div class="card" onclick="openProduct(${audio.id})">
            <div class="wishlist-icon" onclick="addToWishlist(${audio.id})">♡</div>
                <img src="${audio.image}" alt="${audio.name}">
                <h3>${audio.name}</h3>
                <p>${audio.category}</p>
                <span class="price">${audio.price}</span>
                <p>⭐ ${audio.rating}</p>
                <p>Stock: ${audio.stock}</p>
                <button class="btn-add-cart">View Details</button>
            </div>
        `;
    });
}

// Search Function
function searchAudio() {

    let searchValue = document.getElementById("searchInput").value
        .toLowerCase()
        .trim();
      if(searchValue === ""){
        displayAudio(allAudio)
        return;
      }
    let filteredAudio = allAudio.filter(audio =>{
        return(
        audio.name.toLowerCase().includes(searchValue) ||
        audio.category.toLowerCase().includes(searchValue) ||
        audio.id.toString().includes(searchValue) ||
        audio.price.toString().includes(searchValue) ||
        audio.rating.toString().includes(searchValue) ||
        audio.stock.toString().includes(searchValue)
        );
        });

        if(filteredAudio.length === 0){
            document.querySelector(".audio").innerHTML = 
            "<h2>No Product Found</h2>"
        }else{
            displayAudio(filteredAudio)
        }


}

// Search Button
document.getElementById("searchBtn").addEventListener("click", searchAudio);

// Search While Typing
document.getElementById("searchInput").addEventListener("keyup", function (e) {

    

    if (e.key === "Enter") {
        searchAudio();
    }
    if(this.value.trim() === ""){
        displayAudio(allAudio);
    }

});

//accordian
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {

    header.addEventListener("click", () => {

        const item = header.parentElement;

        document.querySelectorAll(".accordion-item").forEach(acc => {

            if(acc !== item){
                acc.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});
//product details
function openProduct(id) {

    window.location.href = `aud.html?id=${id}`;

}