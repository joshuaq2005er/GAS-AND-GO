// =====================================
// GAS & GO POS SYSTEM
// SCRIPT.JS PART 1
// =====================================


// ==============================
// PRODUCTS DATABASE
// ==============================

let products = JSON.parse(
    localStorage.getItem("products")
) || [

/* =========================
🥤 COLD DRINKS
========================= */

{name:"Water",price:150,category:"Cold Drinks"},
{name:"Sparkling Water",price:200,category:"Cold Drinks"},
{name:"Soda (Any)",price:250,category:"Cold Drinks"},
{name:"Juice (Any)",price:275,category:"Cold Drinks"},
{name:"Iced Coffee",price:350,category:"Cold Drinks"},
{name:"Bloxy Cola",price:380,category:"Cold Drinks"},
{name:"Lemonade",price:260,category:"Cold Drinks"},
{name:"Iced Tea",price:240,category:"Cold Drinks"},


/* =========================
⚡ ENERGY DRINKS
========================= */

{name:"Monster Original Black",price:400,category:"Energy Drinks"},
{name:"Monster Zero Ultra (White)",price:420,category:"Energy Drinks"},
{name:"Monster Ultra Fiesta (Mango)",price:430,category:"Energy Drinks"},
{name:"Monster Ultra Paradise (Tropical Green)",price:430,category:"Energy Drinks"},
{name:"Monster Ultra Watermelon (Red)",price:440,category:"Energy Drinks"},
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


/* =========================
🍟 SNACKS
========================= */

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


/* =========================
🌭 HOT FOOD
========================= */

{name:"Hot Dog",price:500,category:"Hot Food"},
{name:"Sausage Roll",price:550,category:"Hot Food"},
{name:"Nachos",price:600,category:"Hot Food"},
{name:"Pizza Slice",price:475,category:"Hot Food"},
{name:"Chicken Tenders (3pc)",price:650,category:"Hot Food"},
{name:"Loaded Fries",price:700,category:"Hot Food"},
{name:"Chili Cheese Dog",price:575,category:"Hot Food"},
{name:"Breakfast Sandwich",price:525,category:"Hot Food"},


/* =========================
➕ EXTRAS
========================= */

{name:"Gum",price:100,category:"Extras"},
{name:"Mints",price:125,category:"Extras"},
{name:"Energy Shot",price:300,category:"Extras"},
{name:"Protein Shake",price:450,category:"Extras"},
{name:"Ice Bag",price:200,category:"Extras"},


/* =========================
⛽ GAS
========================= */

{name:"Regular Fuel",price:749,category:"Gas"},
{name:"Plus Fuel",price:829,category:"Gas"},
{name:"Premium Fuel",price:949,category:"Gas"},
{name:"Exclusive Fuel",price:1250,category:"Gas"},


/* =========================
🚗 CAR WASH
========================= */

{name:"Normal Car Wash (Outside)",price:650,category:"Gas"},
{name:"Deluxe Car Wash (Inside + Outside)",price:1250,category:"Gas"}

];




// ==============================
// CART
// ==============================


let cart = [];

let currentCategory = "Cold Drinks";

let paymentMethod = "None";





// ==============================
// DISPLAY PRODUCTS
// ==============================


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


    currentCategory=category;


    displayProducts();


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


    let total=0;



    cart.forEach((item,index)=>{


        total += item.price * item.quantity;



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




    document.getElementById("total").innerText = total;



}
// =====================================
// GAS & GO POS SYSTEM
// SCRIPT.JS PART 2
// CHECKOUT + RECEIPTS + HISTORY
// =====================================



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


    updateCart();


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


        alert(
        "Cart is empty!"
        );


        return;


    }




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




    if(
    paymentMethod==="Cash"
    &&
    cash < total
    ){


        alert(
        "Not enough cash!"
        );


        return;


    }






    let order = {


        id:
        Date.now(),


        items:
        JSON.parse(
        JSON.stringify(cart)
        ),


        total:total,


        payment:
        paymentMethod,


        cash:cash,


        change:
        cash-total,


        date:
        new Date()
        .toLocaleString()



    };







    orders.push(order);




    localStorage.setItem(

    "orders",

    JSON.stringify(orders)

    );





    showReceipt(order);




    cart=[];


    updateCart();




    document.getElementById(
    "cashInput"
    ).value="";



    paymentMethod="None";



}









// ==============================
// RECEIPT
// ==============================


function showReceipt(order){



    let text =

`GAS & GO STORE

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

TOTAL:
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

"Thank you!";





    let receipt =

    document.getElementById(
    "receipt"
    );



    if(receipt){


        receipt.innerText=text;


    }



    let modal =

    document.getElementById(
    "receiptModal"
    );



    if(modal){


        modal.style.display="block";


    }



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

    document.getElementById(
    "historyList"
    );



    if(!box)
    return;



    box.innerHTML="";




    orders
    .slice()
    .reverse()
    .forEach(order=>{



        let div =
        document.createElement(
        "div"
        );



        div.className="cart-item";



        div.innerHTML=

`

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


<button onclick="deleteOrder(${order.id})">

Delete

</button>


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






function deleteOrder(id){


    orders =

    orders.filter(
    order =>
    order.id !== id
    );



    localStorage.setItem(

    "orders",

    JSON.stringify(orders)

    );



    openHistory();


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
// START SYSTEM
// ==============================


function startup(){



    saveProducts();



    displayProducts();



    updateCart();



}



startup();
