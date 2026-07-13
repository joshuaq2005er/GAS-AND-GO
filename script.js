// ==============================
// GAS & GO POS SYSTEM
// SCRIPT PART 1
// ==============================


// ADMIN PASSWORD
const ADMIN_PASSWORD = "gasandgorihandy27";


// CART DATA
let cart = [];

let currentCategory = "Cold Drinks";

let paymentMethod = "None";




// ==============================
// PRODUCTS DATABASE
// ==============================


let products = JSON.parse(localStorage.getItem("products")) || [

/* COLD DRINKS */

{name:"Water",price:150,category:"Cold Drinks"},
{name:"Sparkling Water",price:200,category:"Cold Drinks"},
{name:"Soda (Any)",price:250,category:"Cold Drinks"},
{name:"Juice (Any)",price:275,category:"Cold Drinks"},
{name:"Iced Coffee",price:350,category:"Cold Drinks"},
{name:"Bloxy Cola",price:380,category:"Cold Drinks"},
{name:"Lemonade",price:260,category:"Cold Drinks"},
{name:"Iced Tea",price:240,category:"Cold Drinks"},



/* ENERGY DRINKS */

{name:"Monster Original Black",price:400,category:"Energy Drinks"},
{name:"Monster Zero Ultra White",price:420,category:"Energy Drinks"},
{name:"Monster Ultra Fiesta Mango",price:430,category:"Energy Drinks"},
{name:"Monster Ultra Paradise Tropical",price:430,category:"Energy Drinks"},
{name:"Monster Ultra Watermelon",price:440,category:"Energy Drinks"},
{name:"Monster Ultra Strawberry Dreams",price:450,category:"Energy Drinks"},
{name:"Monster Pipeline Punch",price:460,category:"Energy Drinks"},
{name:"Monster Mango Loco",price:460,category:"Energy Drinks"},
{name:"Monster Pacific Punch",price:470,category:"Energy Drinks"},
{name:"Monster Lewis Hamilton Edition",price:500,category:"Energy Drinks"},
{name:"Monster VR46 Valentino Rossi",price:500,category:"Energy Drinks"},


{name:"Red Bull Original",price:400,category:"Energy Drinks"},
{name:"Red Bull",price:420,category:"Energy Drinks"},
{name:"Red Bull Tropical",price:450,category:"Energy Drinks"},
{name:"Rockstar Original",price:380,category:"Energy Drinks"},
{name:"Rockstar Fruit Punch",price:400,category:"Energy Drinks"},




/* SNACKS */

{name:"Lays Classic",price:225,category:"Snacks"},
{name:"Lays Paprika",price:240,category:"Snacks"},
{name:"Doritos Nacho Cheese",price:260,category:"Snacks"},
{name:"Doritos Cool Ranch",price:260,category:"Snacks"},
{name:"Doritos Sweet Chili",price:275,category:"Snacks"},
{name:"Pringles Original",price:250,category:"Snacks"},
{name:"Pringles Sour Cream",price:260,category:"Snacks"},
{name:"Pringles Hot & Spicy",price:275,category:"Snacks"},


{name:"Snickers",price:175,category:"Snacks"},
{name:"Twix",price:175,category:"Snacks"},
{name:"KitKat",price:180,category:"Snacks"},
{name:"B&Bs",price:200,category:"Snacks"},
{name:"Skittles Original",price:200,category:"Snacks"},
{name:"Skittles Tropical",price:220,category:"Snacks"},
{name:"Sour Patch Kids",price:230,category:"Snacks"},


{name:"Beef Jerky",price:450,category:"Snacks"},
{name:"Luxury Chocolate Bar",price:300,category:"Snacks"},




/* HOT FOOD */

{name:"Hot Dog",price:500,category:"Hot Food"},
{name:"Sausage Roll",price:550,category:"Hot Food"},
{name:"Nachos",price:600,category:"Hot Food"},
{name:"Pizza Slice",price:475,category:"Hot Food"},
{name:"Chicken Tenders 3pc",price:650,category:"Hot Food"},
{name:"Loaded Fries",price:700,category:"Hot Food"},
{name:"Chili Cheese Dog",price:575,category:"Hot Food"},
{name:"Breakfast Sandwich",price:525,category:"Hot Food"},




/* EXTRAS */

{name:"Gum",price:100,category:"Extras"},
{name:"Mints",price:125,category:"Extras"},
{name:"Energy Shot",price:300,category:"Extras"},
{name:"Protein Shake",price:450,category:"Extras"},
{name:"Ice Bag",price:200,category:"Extras"},




/* GAS */

{name:"Regular Fuel (1 Gallon)",price:749,category:"Gas"},
{name:"Plus Fuel (1 Gallon)",price:829,category:"Gas"},
{name:"Premium Fuel (1 Gallon)",price:949,category:"Gas"},
{name:"Exclusive Fuel (1 Gallon)",price:1250,category:"Gas"},

{name:"Normal Car Wash",price:650,category:"Gas"},
{name:"Deluxe Car Wash",price:1250,category:"Gas"}

];




// SAVE PRODUCTS

function saveProducts(){

localStorage.setItem(
"products",
JSON.stringify(products)
);

}

// ==============================
// DISPLAY PRODUCTS
// ==============================


function showCategory(category){

    currentCategory = category;

    document.getElementById("categoryTitle").innerText = category;

    displayProducts();

}




function displayProducts(){

    let list = document.getElementById("productList");

    list.innerHTML = "";


    let search =
    document.getElementById("search").value.toLowerCase();



    products
    .filter(product =>
        product.category === currentCategory
    )
    .filter(product =>
        product.name.toLowerCase().includes(search)
    )
    .forEach(product => {



        let div = document.createElement("div");

        div.className = "product";


        div.innerHTML = `

        <span class="product-name">
        ${product.name}
        </span>

        <span class="product-price">
        $${product.price}
        </span>

        `;



        div.onclick = function(){

            addToCart(product);

        };


        list.appendChild(div);


    });


}






// ==============================
// SEARCH
// ==============================


document
.getElementById("search")
.addEventListener(
"input",
displayProducts
);






// ==============================
// CART SYSTEM
// ==============================



function addToCart(product){


    let existing =
    cart.find(
        item => item.name === product.name
    );



    if(existing){

        existing.quantity++;

    }
    else{


        cart.push({

            name:product.name,

            price:product.price,

            quantity:1

        });


    }


    updateCart();


}






function updateCart(){


    let cartDiv =
    document.getElementById("cartItems");


    cartDiv.innerHTML="";


    let total = 0;



    if(cart.length === 0){


        cartDiv.innerHTML =
        "<p>No items added</p>";


    }



    cart.forEach((item,index)=>{


        let itemTotal =
        item.price * item.quantity;


        total += itemTotal;



        let div =
        document.createElement("div");


        div.className =
        "cart-item";



        div.innerHTML = `


        <b>${item.name}</b>


        <br>


        $${item.price}
        x
        ${item.quantity}


        <br>


        <button onclick="changeQuantity(${index},1)">
        +
        </button>


        <button onclick="changeQuantity(${index},-1)">
        -
        </button>


        <button onclick="removeItem(${index})">
        Remove
        </button>


        `;



        cartDiv.appendChild(div);



    });



    document
    .getElementById("total")
    .innerText = total;



    calculateChange();


}







// ==============================
// QUANTITY CONTROLS
// ==============================


function changeQuantity(index,amount){


    cart[index].quantity += amount;



    if(cart[index].quantity <=0){

        cart.splice(index,1);

    }



    updateCart();


}





function removeItem(index){

    cart.splice(index,1);

    updateCart();

}







// ==============================
// CLEAR ORDER
// ==============================


function clearCart(){


    cart=[];

    updateCart();


}







// ==============================
// PAYMENT
// ==============================


function setPayment(method){


    paymentMethod = method;


    document
    .getElementById("paymentMethod")
    .innerText = method;


}





// ==============================
// CHANGE CALCULATOR
// ==============================


document
.getElementById("cashInput")
.addEventListener(
"input",
calculateChange
);



function calculateChange(){


    let total =
    Number(
    document.getElementById("total").innerText
    );


    let cash =
    Number(
    document.getElementById("cashInput").value
    );



    let change = cash-total;


    if(change < 0){

        change=0;

    }



    document
    .getElementById("change")
    .innerText =
    change;



}





// LOAD DEFAULT CATEGORY

displayProducts();

// ==============================
// ORDER HISTORY SYSTEM
// ==============================


let orders = JSON.parse(
    localStorage.getItem("orders")
) || [];






// ==============================
// FINISH ORDER
// ==============================


function finishOrder(){


    if(cart.length === 0){

        alert("Cart is empty!");

        return;

    }



    let total =
    Number(
        document.getElementById("total").innerText
    );



    let cash =
    Number(
        document.getElementById("cashInput").value
    );



    if(paymentMethod === "Cash" && cash < total){

        alert("Not enough cash!");

        return;

    }




    let order = {


        id:
        Date.now(),


        items:
        JSON.parse(JSON.stringify(cart)),


        total:total,


        payment:
        paymentMethod,


        cash:cash,


        change:
        cash-total,


        date:
        new Date().toLocaleString()


    };




    orders.push(order);



    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );




    showReceipt(order);



    cart=[];


    document
    .getElementById("cashInput")
    .value="";



    paymentMethod="None";


    document
    .getElementById("paymentMethod")
    .innerText="None";



    updateCart();



    showSaleMessage();



}







// ==============================
// RECEIPTS
// ==============================



function showReceipt(order){



    let receipt =
    document.getElementById("receipt");



    let text = "";



    text +=
`GAS & GO STORE

`;



    text +=
"----------------------\n";



    order.items.forEach(item=>{


        text +=

        `${item.name}
${item.quantity} x $${item.price}

`;


    });



    text +=
"----------------------\n";


    text +=

`TOTAL: $${order.total}

Payment:
${order.payment}

`;



    if(order.payment==="Cash"){

        text +=

`Cash:
$${order.cash}

Change:
$${order.change}

`;

    }



    text +=

`
Thank you!
`;



    receipt.innerText=text;



    document
    .getElementById("receiptModal")
    .style.display="block";


}






function closeReceipt(){


    document
    .getElementById("receiptModal")
    .style.display="none";


}







// ==============================
// ORDER HISTORY VIEW
// ==============================


function openHistory(){



    let box =
    document.getElementById("historyList");



    box.innerHTML="";



    if(orders.length===0){


        box.innerHTML =
        "<p>No previous orders</p>";


    }




    orders
    .slice()
    .reverse()
    .forEach(order=>{


        let div =
        document.createElement("div");


        div.className =
        "cart-item";



        div.innerHTML=`

        <b>
        Order #${order.id}
        </b>

        <br>

        ${order.date}

        <br>

        Total:
        $${order.total}

        <br>

        Payment:
        ${order.payment}

        <br><br>

        <button onclick="deleteOrder(${order.id})">
        Delete
        </button>

        `;



        box.appendChild(div);



    });



    document
    .getElementById("historyModal")
    .style.display="block";



}






function closeHistory(){


    document
    .getElementById("historyModal")
    .style.display="none";


}





function deleteOrder(id){


    orders =
    orders.filter(
        order=>order.id!==id
    );



    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );



    openHistory();


}







// ==============================
// SALE MESSAGE
// ==============================


function showSaleMessage(){


    let msg =
    document.getElementById("saleMessage");


    msg.style.display="block";


    setTimeout(()=>{


        msg.style.display="none";


    },3000);



}

