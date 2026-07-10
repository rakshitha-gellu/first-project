let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

displayCart();

function displayCart() {

    cartItems.innerHTML = "";

    if(cart.length === 0){
       cartItems.innerHTML = `
<h2 class="empty-cart">🛒 Your Cart is Empty</h2>`;
        totalPrice.innerHTML = "";
        return;
    }

    let total = 0;

    cart.forEach((product,index)=>{
       /*
        const price = Number(
            product.price.replace("$","").replace(",","")
        );*/
        const price = Number(product.price);

        total += price * product.quantity;

        cartItems.innerHTML += `

        <div class="cart-card">

            <img src="${product.image}" width="150">

            <div>

                <h2>${product.name}</h2>

                <p>${product.category}</p>

                <h3>${product.price}</h3>

                <p>Quantity : ${product.quantity}</p>

                <button onclick="increase(${index})">+</button>

                <button onclick="decrease(${index})">-</button>

                <button onclick="removeItem(${index})">Remove</button>

            </div>

        </div>

        <hr>

        `;

    });

   
    totalPrice.innerHTML = "Total : ₹" + total.toFixed(2);

}

function increase(index){

    cart[index].quantity++;

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

function decrease(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}