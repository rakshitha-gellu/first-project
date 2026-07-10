let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistItems = document.getElementById("wishlistItems");

displayWishlist();

function displayWishlist(){

    wishlistItems.innerHTML="";

    if(wishlist.length===0){

        wishlistItems.innerHTML="<h2>Your Wishlist is Empty</h2>";

        return;

    }

    wishlist.forEach((product,index)=>{

        wishlistItems.innerHTML+=`

        <div class="wishlist-card">

            <img src="${product.image}">

            <div>

                <h2>${product.name}</h2>

                <p>${product.category}</p>

                <h3>${product.price}</h3>

                <button onclick="moveToCart(${product.id})">
                Add To Cart
                </button>

                <button onclick="removeWishlist(${index})">
                Remove
                </button>

            </div>

        </div>

        `;

    });

}

function removeWishlist(index){

    wishlist.splice(index,1);

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    displayWishlist();

}

function moveToCart(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = wishlist.find(item=>item.id==id);

    const exists = cart.find(item=>item.id==id);

    if(exists){

        exists.quantity++;

    }else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    alert("Added to Cart");

}
