// =====================================
// GAS & GO POS SYSTEM
// SCRIPT.JS PART 1
// =====================================


// ==============================
// PRODUCTS DATABASE
// ==============================

let savedProducts = JSON.parse(
    localStorage.getItem("products")
) || [];

let discountCodeUsed = "";
let products = [
/* =========================
🥤 COLD DRINKS
========================= */

{name:"Water",price:75,category:"Cold Drinks"},
{name:"Milk",price:175,category:"Cold Drinks"},
{name:"Sparkling Water",price:100,category:"Cold Drinks"},
{name:"Soda (Any)",price:175,category:"Cold Drinks"},
{name:"Juice (Any)",price:200,category:"Cold Drinks"},
{name:"Iced Coffee (Any)",price:165,category:"Cold Drinks"},
{name:"Coffee (Any)",price:165,category:"Cold Drinks"},
{name:"Bloxy Cola",price:180,category:"Cold Drinks"},
{name:"Lemonade",price:130,category:"Cold Drinks"},
{name:"Iced Tea",price:120,category:"Cold Drinks"},
{name:"Slurpee (Any)",price:165,category:"Cold Drinks"},

/* =========================
⚡ ENERGY DRINKS
========================= */

{name:"Monster Original Black",price:200,category:"Energy Drinks"},
{name:"Monster Zero Ultra (White)",price:210,category:"Energy Drinks"},
{name:"Monster Ultra Fiesta (Mango)",price:215,category:"Energy Drinks"},
{name:"Monster Ultra Paradise (Tropical Green)",price:215,category:"Energy Drinks"},
{name:"Monster Ultra Watermelon (Red)",price:220,category:"Energy Drinks"},
{name:"Monster Ultra Strawberry Dreams",price:225,category:"Energy Drinks"},
{name:"Monster Pipeline Punch",price:230,category:"Energy Drinks"},
{name:"Monster Mango Loco",price:230,category:"Energy Drinks"},
{name:"Monster Pacific Punch",price:235,category:"Energy Drinks"},
{name:"Monster Lewis Hamilton Edition",price:250,category:"Energy Drinks"},
{name:"Monster VR46 Valentino Rossi",price:250,category:"Energy Drinks"},

{name:"Red Bull Original",price:200,category:"Energy Drinks"},
{name:"Red Bull",price:210,category:"Energy Drinks"},
{name:"Red Bull Tropical",price:220,category:"Energy Drinks"},
{name:"Rockstar Original",price:190,category:"Energy Drinks"},
{name:"Rockstar Fruit Punch",price:200,category:"Energy Drinks"},


/* =========================
🍟 SNACKS
========================= */

{name:"Lays Classic",price:110,category:"Snacks"},
{name:"Lays Sour Cream & Onion",price:110,category:"Snacks"},
{name:"Lays Paprika",price:120,category:"Snacks"},
{name:"Doritos Nacho Cheese",price:130,category:"Snacks"},
{name:"Doritos Cool Ranch",price:130,category:"Snacks"},
{name:"Doritos Sweet Chili",price:140,category:"Snacks"},

{name:"Cakes (Chips)",price:125,category:"Snacks"},
{name:"Smarts (Chips)",price:140,category:"Snacks"},

{name:"Cheetos (Any)",price:140,category:"Snacks"},
{name:"Cheetos Cheese Puffs (Cheese)",price:145,category:"Snacks"},
{name:"Cheetos Flamin Hot",price:150,category:"Snacks"},

{name:"Taxis (Any)",price:150,category:"Snacks"},
{name:"Taxis Regular (Red)",price:150,category:"Snacks"},
{name:"Taxis Blue Heat (Blue)",price:175,category:"Snacks"},
{name:"Taxis Zombie (Greenk)",price:200,category:"Snacks"},
{name:"Taxis Waves",price:235,category:"Snacks"},
{name:"Taxis Chippz",price:285,category:"Snacks"},

{name:"Pringles Original",price:125,category:"Snacks"},
{name:"Pringles Sour Cream",price:130,category:"Snacks"},
{name:"Pringles Hot & Spicy",price:140,category:"Snacks"},

{name:"Oreos",price:75,category:"Snacks"},
{name:"Snickers",price:85,category:"Snacks"},
{name:"Twix",price:85,category:"Snacks"},
{name:"KitKat",price:90,category:"Snacks"},
{name:"M&Ms",price:100,category:"Snacks"},
{name:"Skittles Original",price:100,category:"Snacks"},
{name:"Skittles Tropical",price:110,category:"Snacks"},
{name:"Sour Patch Kids",price:115,category:"Snacks"},
{name:"Gummy Worms (Any)",price:175,category:"Snacks"},
{name:"Gummy (Any)",price:125,category:"Snacks"},

{name:"Pup Cup",price:25,category:"Snacks"},
{name:"Whip Cream",price:125,category:"Snacks"},
{name:"Beef Jerky",price:225,category:"Snacks"},
{name:"Hershey's Chocolate Bar",price:125,category:"Snacks"},
{name:"Feastables Chocolate Bar",price:150,category:"Snacks"},
{name:"Luxury Chocolate Bar",price:150,category:"Snacks"},

{name:"Ice Cream Cup (Any)",price:75,category:"Snacks"},
{name:"Ice Cream Cone (Any)",price:125,category:"Snacks"},
{name:"Ice Cream Waffle (Any)",price:175,category:"Snacks"},
{name:"Cake (Real Cake)",price:375,category:"Snacks"},
{name:"Boiled Peanuts",price:100,category:"Snacks"},
{name:"Protien Bar",price:75,category:"Snacks"},
{name:"Donut (Any)",price:50,category:"Snacks"},
{name:"3 Donut Box (Any)",price:150,category:"Snacks"},
{name:"6 Donut Box (Any)",price:300,category:"Snacks"},
{name:"9 Donut Box (Any)",price:450,category:"Snacks"},
{name:"Dozen Donut (Any)",price:600,category:"Snacks"},


/* =========================
🌭 HOT FOOD
========================= */

{name:"Hot Dog",price:250,category:"Hot Food"},
{name:"Sausage Roll",price:275,category:"Hot Food"},
{name:"Nachos",price:300,category:"Hot Food"},
{name:"Pizza Slice",price:235,category:"Hot Food"},
{name:"Chicken Tenders (3pc)",price:325,category:"Hot Food"},
{name:"Loaded Fries",price:450,category:"Hot Food"},
{name:"Chili Cheese Dog",price:290,category:"Hot Food"},
{name:"Breakfast Sandwich",price:265,category:"Hot Food"},


/* =========================
➕ EXTRAS
========================= */

{name:"Gum",price:50,category:"Extras"},
{name:"Mints",price:65,category:"Extras"},
{name:"Energy Shot",price:150,category:"Extras"},
{name:"Protein Shake",price:225,category:"Extras"},
{name:"Ice Bag",price:100,category:"Extras"},
{name:"Ice Cream Toppings (Any)",price:25,category:"Extras"},

/* =========================
⛽ GAS
========================= */

{name:"Regular Fuel",price:379,category:"Gas"},
{name:"Plus Fuel (Diesel)",price:419,category:"Gas"},
{name:"Premium Fuel",price:479,category:"Gas"},
{name:"Exclusive Fuel",price:625,category:"Gas"},

/* =========================
⛽ Electric
========================= */
{name:"Regular Electric Charge",price:319,category:"Gas"},
{name:"Plus Electric Charge",price:379,category:"Gas"},
{name:"Premium Electric Charge",price:419,category:"Gas"},
{name:"Exclusive Electric Charge",price:469,category:"Gas"},

/* =========================
🚗 CAR WASH
========================= */

{name:"Normal Car Wash (Outside)",price:325,category:"Gas"},
{name:"Deluxe Car Wash (Inside + Outside)",price:625,category:"Gas"}
];


products = [
    ...products,
    ...savedProducts.filter(saved =>
        !products.some(product =>
            product.name === saved.name
        )
    )
];

console.log(products.length);

// ==============================
// CART
// ==============================


let cart = [];

let currentCategory = "Cold Drinks";

let paymentMethod = "None";

let discount = 0;
let discountType = "none"; // "none", "preset", "code"
let discountReason = "";




// ==============================
// DISPLAY PRODUCTS & Search
// ==============================
function searchProducts(){

    let search =
    document.getElementById("productSearch")
    .value
    .toLowerCase();


    if(search === ""){
        displayProducts();
        return;
    }


    let box =
    document.getElementById("products");


    box.innerHTML="";


    products
    .filter(product =>

        product.name
        .toLowerCase()
        .includes(search)

        ||

        search
        .split(" ")
        .some(word =>
            product.name
            .toLowerCase()
            .includes(word)
        )

    )
    .forEach(product=>{


        let button =
        document.createElement("button");


        button.className="product";


        button.innerHTML =

        `
        ${product.name}
        <br>
        $${product.price}
        `;


        button.onclick=function(){

            addToCart(product);

            let items =
            document.querySelectorAll(".product");


            items.forEach(item=>{


                if(
                item.innerText
                .includes(product.name)
                ){


                    item.scrollIntoView({
                        behavior:"smooth",
                        block:"center"
                    });


                    item.classList.add(
                        "highlight-product"
                    );


                    setTimeout(()=>{

                        item.classList.remove(
                        "highlight-product"
                        );

                    },5000);


                }


            });

        };


        box.appendChild(button);


    });


}

// display

function displayProducts(){


    let box =
    document.getElementById(
        "products"
    );


    if(!box)
    return;



    box.innerHTML="";



   products
.filter(product => 
    product.category === currentCategory
)
.forEach((product,index)=>{


        let button =
        document.createElement("button");



        button.className="product";



        button.innerHTML=

        `

        ${product.name}

        <br>

        $${product.price}

        `;



        button.onclick=function(){

            addToCart(product);

        };



        box.appendChild(button);



    });



}

function changeCategory(category){

    currentCategory = category;

    displayProducts();


    document
    .querySelectorAll(".category-panel button")
    .forEach(btn=>{
        btn.classList.remove("active-category");
    });

    document
    .querySelectorAll(".category-panel button")
    .forEach(btn=>{
        if(btn.innerText.includes(category)){
            btn.classList.add("active-category");
        }
    });

}

// ==============================
// CART FUNCTIONS
// ==============================


function addToCart(product){



    let existing =

    cart.find(
        item =>
        item.name === product.name
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


    let box = document.getElementById("cart");


    if(!box)
    return;



    box.innerHTML="";


    let subtotal=0;



    cart.forEach((item,index)=>{


        subtotal += item.price * item.quantity;



        let div = document.createElement("div");


        div.className="cart-item";



        div.innerHTML = `


        <b>
        ${item.name}
        </b>


        <br>


        Price:
        $${item.price}



        <br><br>



        <button onclick="decreaseQuantity(${index})">

        -

        </button>



        <span style="padding:10px">

        ${item.quantity}

        </span>



        <button onclick="increaseQuantity(${index})">

        +

        </button>



        <br><br>



        Subtotal:
        $${item.price * item.quantity}



        <br><br>



        <button onclick="removeItem(${index})">

        🗑 Remove

        </button>



        `;



        box.appendChild(div);



    });


let discountAmount = 0;
let total = subtotal;

if(discount > 0){
    discountAmount = Math.round(subtotal * discount / 100);
    total = subtotal - discountAmount;
}

let subtotalElement = document.getElementById("subtotal");
let topSubtotalElement = document.getElementById("topSubtotal");
let discountElement = document.getElementById("topDiscount");
let topTotalElement = document.getElementById("topTotal");
let cartTotalElement = document.getElementById("total");


if(subtotalElement){
    subtotalElement.innerText = subtotal;
}

if(topSubtotalElement){
    topSubtotalElement.innerText = subtotal;
}

if(discountElement){
    discountElement.innerText = discountAmount || 0;
}

if(topTotalElement){
    topTotalElement.innerText = Math.round(total);
}

if(cartTotalElement){
    cartTotalElement.innerText = Math.round(total);
}



}
// =====================================
// GAS & GO POS SYSTEM
// SCRIPT.JS PART 2
// CHECKOUT + RECEIPTS + HISTORY + DISCOUNTS
// =====================================


function increaseQuantity(index){

    cart[index].quantity++;

    updateCart();

}




function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }
    else{

        cart.splice(index,1);

    }


    updateCart();

}


// ==============================
// REMOVE ITEM
// ==============================


function removeItem(index){


    cart.splice(index,1);


    updateCart();


}




// ==============================
// CLEAR CART
// ==============================


function clearCart(){


    cart=[];
    discount = 0;
    discountType = "none";
    discountReason = "";


    updateCart();
    updateDiscountDisplay();


}




// ==============================
// PAYMENT
// ==============================


function setPayment(method){


    paymentMethod = method;


    let display =
    document.getElementById(
        "paymentMethod"
    );


    if(display){

        display.innerText = method;

    }


}




// ==============================
// CHANGE CALCULATOR
// ==============================


function calculateChange(){



    let total =

    Number(

    document.getElementById(
        "total"
    ).innerText

    );



    let cash =

    Number(

    document.getElementById(
        "cashInput"
    ).value

    );



    let change = cash - total;



    if(change < 0){

        change = 0;

    }



    document.getElementById(
        "change"
    ).innerText = change;



}




let cashBox =
document.getElementById(
"cashInput"
);



if(cashBox){


cashBox.addEventListener(
"input",
calculateChange
);


}


// ==============================
// DISCOUNT SYSTEM
// ==============================
function applyCustomDiscountCode(){

    let code = prompt("Enter Discount Code");

    if(!code){
        return;
    }

    code = code.trim().toUpperCase();

    let codes =
    JSON.parse(
        localStorage.getItem("discountCodes")
    ) || [];

    let found =
    codes.find(c => c.code === code);

    if(!found){

        alert("❌ Invalid discount code.");

        return;

    }

    if(!found.active){

        alert("❌ This discount code has been disabled.");

        return;

    }

    if(found.uses >= found.maxUses){

        alert("❌ This discount code has already been used.");

        return;

    }

    let subtotal = 0;

    cart.forEach(item=>{

        subtotal += item.price * item.quantity;

    });

    if(subtotal < found.minimumPurchase){

        alert(
            "Minimum purchase is $" +
            found.minimumPurchase
        );

        return;

    }

    discountType = "code";

    discountReason = found.code;

    if(found.type === "percent"){

        discount = found.value;

    }

    else{

        discount = 0;

        discountAmount = found.value;

    }

    found.uses++;

    if(found.uses >= found.maxUses){

        found.active = false;

    }

    localStorage.setItem(

        "discountCodes",

        JSON.stringify(codes)

    );

    updateCart();

    updateDiscountDisplay();

    alert("✅ Discount Applied!");

}

function updateDiscountDisplay(){

    let discountDisplay = document.getElementById("discountDisplay");

    if(!discountDisplay) return;

    

    if(discount > 0){

        discountDisplay.innerHTML = `

            <b>💰 Discount Applied: ${discount}% (${discountReason})</b><br>

            <button onclick="clearDiscount()">Remove Discount</button>

        `;

    }

    else{

        discountDisplay.innerHTML = "";

    }

}



function clearDiscount(){

    if(discountType === "code"){

        let discountCodes =
        JSON.parse(localStorage.getItem("discountCodes")) || [];

        let code =
        discountCodes.find(c => c.code === discountCodeUsed);

        if(code){

            code.uses = Math.max(0, code.uses - 1);
            
            code.active = true;

            localStorage.setItem(
                "discountCodes",
                JSON.stringify(discountCodes)
            );

        }

        discountCodeUsed = "";

    }

    discount = 0;
    discountType = "none";
    discountReason = "";

    updateCart();
    updateDiscountDisplay();

}
// ==============================
// ORDERS
// ==============================


let orders = JSON.parse(

localStorage.getItem(
"orders"

)

) || [];




// ==============================
// FINISH ORDER
// ==============================

function finishOrder(){

    if(cart.length===0){

        alert("Cart is empty!");
        return;

    }


    let username =
    document.getElementById("customerUsername").value.trim();

    let customerID =
    document.getElementById("customerID").value.trim();

let proofFile =
document.getElementById("proofImage").files[0];

let proofName =
proofFile ? proofFile.name : "No Proof Provided";


if(username===""){

    alert("Customer username is required.");
    return;

}


    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

let discountAmount = 0;
let total = subtotal;

if(discount > 0){
    discountAmount = Math.round(subtotal * discount / 100);
    total = subtotal - discountAmount;
}

total = Math.round(total);

    let cash = Number(
        document.getElementById("cashInput").value
    );


    if(
        paymentMethod==="Cash"
        &&
        cash < total
    ){

        alert("Not enough cash!");
        return;

    }


    let order = {

        id:Date.now(),

        customerUsername:username,

        customerID:customerID,
        
        proof:proofName,
        
        items:JSON.parse(
            JSON.stringify(cart)
        ),
        subtotal: subtotal,
        
        discount: discount,
        
        discountAmount: discountAmount,
        
        discountReason: discountReason,
        
        total: total,

        payment:paymentMethod,

        cash:cash,

        change:cash-total,

        date:new Date().toLocaleString()

    };


    orders.push(order);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

// Update custom discount code usage

if (discountType === "code") {

    let discountCodes = JSON.parse(localStorage.getItem("discountCodes")) || [];

    let code = discountCodes.find(c => c.code === discountCodeUsed);

    if (code) {

        code.uses = Math.max(0, (code.uses || 0) - 1);

        code.active = code.uses < code.maxUses;

        localStorage.setItem(
            "discountCodes",
            JSON.stringify(discountCodes)
        );

    }

    discountCodeUsed = "";

}

    showReceipt(order);


    cart=[];
    discount = 0;
    discountType = "none";
    discountReason = "";

    updateCart();
    updateDiscountDisplay();


    document.getElementById("cashInput").value="";
    document.getElementById("customerUsername").value="";
    document.getElementById("customerID").value="";
    document.getElementById("proofImage").value="";

    paymentMethod="None";
    document.getElementById("paymentMethod").innerText="None";

}



function setPresetDiscount(percentage, reason){

    discount = percentage;
    discountType = "preset";
    discountReason = reason;

    updateCart();
    updateDiscountDisplay();

}

// ==============================
// RECEIPT
// ==============================

function showReceipt(order){

    let text =

`GAS & GO STORE

--------------------

Customer:
${order.customerUsername}

Customer ID:
${order.customerID || "None"}

--------------------

`;


    order.items.forEach(item=>{

        text +=
`${item.name}

${item.quantity} x $${item.price}

`;

    });


    text +=

`--------------------

Subtotal:
$${order.subtotal}

`;

    if(order.discount > 0){
        text += `Discount: -${order.discount}% (${order.discountReason})
$${Math.round(order.subtotal * order.discount / 100)}

`;
    }

    text +=

`TOTAL:
$${order.total}

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

`--------------------

Proof:
${order.proof}

Thank you!`;


    document.getElementById("receipt").innerText=text;

    document.getElementById("receiptModal").style.display="block";

}




function closeReceipt(){

    document.getElementById(
        "receiptModal"
    ).style.display="none";

}




// ==============================
// ORDER HISTORY
// ==============================

function openHistory(){

    let box =
    document.getElementById("historyList");

    box.innerHTML="";


    orders
    .slice()
    .reverse()
    .forEach(order=>{

        let div =
        document.createElement("div");

        div.className="cart-item";

        div.innerHTML=

`

<b>Order #${order.id}</b>

<br>

${order.date}

<br><br>

<b>Customer:</b>
${order.customerUsername}

<br>

<b>User ID:</b>
${order.customerID || "None"}

<br>

<b>Items:</b>

${order.items.map(item=>item.name).join(", ")}

<br>

<b>Subtotal:</b>
$${order.subtotal}

${order.discount > 0 ? `<br><b>Discount:</b> -${order.discount}% (${order.discountReason})<br>` : ""}

<b>Total:</b>
$${order.total}

<br>

<b>Payment:</b>
${order.payment}

<br>

<b>Proof:</b>
${order.proof}

<br><br>

`;

        box.appendChild(div);

    });


    document.getElementById(
        "historyModal"
    ).style.display="block";

}




function closeHistory(){

    document.getElementById(
        "historyModal"
    ).style.display="none";

}


// =====================================
// GAS & GO POS SYSTEM
// SCRIPT.JS PART 3
// FUEL + BACKUP + SETTINGS
// =====================================



// ==============================
// FUEL CALCULATOR
// ==============================


function openFuel(){


    let modal =
    document.getElementById(
    "fuelModal"
    );


    if(modal){

        modal.style.display="block";

    }


}




function closeFuel(){


    let modal =
    document.getElementById(
    "fuelModal"
    );


    if(modal){

        modal.style.display="none";

    }


}




function addFuel(){



    let fuelType =

    Number(

    document.getElementById(
    "fuelType"
    ).value

    );



    let gallons =

    Number(

    document.getElementById(
    "gallons"
    ).value

    );




    if(gallons <= 0){


        alert(
        "Enter gallons"
        );


        return;


    }




    let fuelNames = {


        749:
        "Regular Fuel",


        829:
        "Plus Fuel",


        949:
        "Premium Fuel",


        1250:
        "Exclusive Fuel"



    };




    cart.push({


        name:

        fuelNames[fuelType]
        +
        " "
        +
        gallons
        +
        " gal",



        price:fuelType,


        quantity:gallons



    });




    updateCart();



    closeFuel();



}




// ==============================
// EXPORT BACKUP
// ==============================


function exportData(){



    let backup = {


        products:products,


        orders:orders



    };




    let file = new Blob(


    [

    JSON.stringify(
    backup,
    null,
    2
    )

    ],


    {


    type:
    "application/json"


    }


    );




    let link =
    document.createElement(
    "a"
    );



    link.href =
    URL.createObjectURL(file);



    link.download =
    "gas-go-backup.json";



    link.click();



}




// ==============================
// IMPORT BACKUP
// ==============================


function importData(event){



    let file =
    event.target.files[0];



    if(!file)
    return;




    let reader =
    new FileReader();




    reader.onload=function(e){



        let data =

        JSON.parse(
        e.target.result
        );




        if(data.products){


            products =
            data.products;


        }




        if(data.orders){


            orders =
            data.orders;


        }




        localStorage.setItem(

        "products",

        JSON.stringify(products)

        );




        localStorage.setItem(

        "orders",

        JSON.stringify(orders)

        );




        alert(
        "Backup imported!"
        );



        location.reload();



    };




    reader.readAsText(file);



}




// ==============================
// STORE SETTINGS
// ==============================


let storeName =

localStorage.getItem(
"storeName"
)

||

"Gas & Go";




function changeStoreName(){



    let name =

    prompt(

    "New store name:",

    storeName

    );




    if(name){



        storeName=name;



        localStorage.setItem(

        "storeName",

        storeName

        );



        alert(
        "Store name updated!"
        );


    }


}




// ==============================
// PRINT RECEIPT
// ==============================


function printReceipt(){



    let receipt =

    document.getElementById(
    "receipt"
    );



    if(!receipt)
    return;




    let printWindow =

    window.open(
    "",
    "",
    "width=400,height=600"
    );




    printWindow.document.write(

    receipt.innerHTML

    );




    printWindow.print();



}




// ==============================
// ADMIN DASHBOARD LINK
// ==============================


function openAdminDashboard(){


    window.location.href =
    "admin.html";


}




// ==============================
// CLOSE MODALS
// ==============================


window.onclick=function(event){



    let modals =

    document.querySelectorAll(
    ".modal"
    );




    modals.forEach(modal=>{



        if(event.target===modal){


            modal.style.display="none";


        }



    });



}

// =====================================
// GAS & GO POS SYSTEM
// SCRIPT.JS PART 4
// STARTUP + FINAL FIXES
// =====================================



// ==============================
// SALES STATISTICS
// ==============================


function getSalesStats(){


    let revenue = 0;



    orders.forEach(order=>{


        revenue += order.total;


    });



    return {


        orders:
        orders.length,


        revenue:
        revenue



    };


}




function showStats(){



    let stats =
    getSalesStats();



    alert(

`📊 SALES REPORT


Orders:
${stats.orders}


Revenue:
$${stats.revenue}


`

    );


}




// ==============================
// KEYBOARD SHORTCUTS
// ==============================


document.addEventListener(

"keydown",

function(event){



    // F1 = Admin

    if(event.key==="F1"){



        openAdminDashboard();



    }



    // ESC = close modals

    if(event.key==="Escape"){



        document
        .querySelectorAll(".modal")
        .forEach(modal=>{


            modal.style.display="none";


        });



    }



}

);

// ==============================
// START SYSTEM
// ==============================


function startup(){


    displayProducts();

    updateCart();

}

startup();
