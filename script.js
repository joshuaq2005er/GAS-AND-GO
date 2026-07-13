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

// ==============================
// ADMIN LOGIN SYSTEM
// ==============================



document
.getElementById("adminButton")
.onclick=function(){

    document
    .getElementById("adminLogin")
    .style.display="block";

};






function loginAdmin(){


    let password =
    document
    .getElementById("adminPassword")
    .value;



    if(password === ADMIN_PASSWORD){



        document
        .getElementById("adminLogin")
        .style.display="none";



        document
        .getElementById("adminPanel")
        .style.display="block";



        loadAdminProducts();



    }
    else{


        alert("Wrong password!");

    }



}






function closeAdmin(){


    document
    .getElementById("adminLogin")
    .style.display="none";


}






function closeAdminPanel(){


    document
    .getElementById("adminPanel")
    .style.display="none";


}








// ==============================
// ADMIN PRODUCT LIST
// ==============================



function loadAdminProducts(){


    let box =
    document.getElementById("adminProducts");



    box.innerHTML="";




    products.forEach((product,index)=>{


        let div =
        document.createElement("div");



        div.className =
        "admin-product";



        div.innerHTML = `


        <span class="admin-name">

        ${product.name}

        <br>

        Category:
        ${product.category}

        </span>



        <input
        type="number"
        value="${product.price}"
        id="price-${index}"
        >



        <button onclick="changePrice(${index})">

        Save

        </button>



        <button onclick="deleteProduct(${index})">

        Delete

        </button>



        `;



        box.appendChild(div);



    });



}








// ==============================
// CHANGE PRICE
// ==============================


function changePrice(index){


    let newPrice =

    Number(

    document
    .getElementById(
        "price-"+index
    )
    .value

    );



    if(newPrice<=0){

        alert("Invalid price");

        return;

    }




    products[index].price=newPrice;



    saveProducts();


    displayProducts();


    loadAdminProducts();



    alert("Price updated!");



}








// ==============================
// DELETE PRODUCT
// ==============================



function deleteProduct(index){


    let confirmDelete =
    confirm(
        "Delete this product?"
    );



    if(confirmDelete){


        products.splice(index,1);



        saveProducts();



        displayProducts();



        loadAdminProducts();


    }



}








// ==============================
// ADD PRODUCT
// ==============================



function addProduct(){



    let name =

    document
    .getElementById("newProductName")
    .value;



    let price =

    Number(

    document
    .getElementById("newProductPrice")
    .value

    );



    let category =

    document
    .getElementById("newProductCategory")
    .value;





    if(
        name===""
        ||
        price<=0
    ){


        alert(
        "Enter valid information"
        );


        return;


    }





    products.push({


        name:name,

        price:price,

        category:category


    });





    saveProducts();



    displayProducts();



    loadAdminProducts();





    document
    .getElementById("newProductName")
    .value="";



    document
    .getElementById("newProductPrice")
    .value="";



    alert(
    "Product added!"
    );



}

// ==============================
// FUEL CALCULATOR
// ==============================


function openFuel(){


    document
    .getElementById("fuelModal")
    .style.display="block";


}





function closeFuel(){


    document
    .getElementById("fuelModal")
    .style.display="none";


}







function addFuel(){



    let price =

    Number(

    document
    .getElementById("fuelType")
    .value

    );



    let gallons =

    Number(

    document
    .getElementById("gallons")
    .value

    );




    if(gallons<=0){


        alert(
        "Enter gallons"
        );


        return;


    }





    let fuelNames = {

        749:"Regular Fuel",

        829:"Plus Fuel",

        949:"Premium Fuel",

        1250:"Exclusive Fuel"

    };





    let name =

    fuelNames[price]

    ||

    "Fuel";





    cart.push({


        name:

        `${name} (${gallons} gal)`,



        price:

        price,



        quantity:

        gallons



    });





    updateCart();



    closeFuel();



    document
    .getElementById("gallons")
    .value="";



}







// ==============================
// ADMIN DATA TOOLS
// ==============================



function resetProducts(){


    let confirmReset =

    confirm(
    "Reset all products?"
    );



    if(confirmReset){



        localStorage.removeItem(
        "products"
        );


        location.reload();



    }


}







function clearHistory(){



    let confirmClear =

    confirm(
    "Delete all orders?"
    );



    if(confirmClear){


        orders=[];



        localStorage.removeItem(
        "orders"
        );



        alert(
        "History cleared"
        );



    }


}







// ==============================
// EXPORT DATA
// ==============================



function exportData(){



    let data = {


        products:products,


        orders:orders


    };



    let file =

    new Blob(

    [
        JSON.stringify(
        data,
        null,
        2
        )
    ],

    {
        type:"application/json"
    }

    );



    let link =
    document.createElement("a");



    link.href =
    URL.createObjectURL(file);



    link.download =
    "gas-go-backup.json";



    link.click();



}






// ==============================
// IMPORT DATA
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


            products=data.products;


        }



        if(data.orders){


            orders=data.orders;


        }





        saveProducts();



        localStorage.setItem(

        "orders",

        JSON.stringify(orders)

        );



        location.reload();



    };




    reader.readAsText(file);



}








// ==============================
// CLOSE MODALS WHEN CLICKING OUTSIDE
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

// ==============================
// SALES STATISTICS
// ==============================


function getSalesStats(){


    let totalSales = 0;

    let totalOrders = orders.length;



    orders.forEach(order=>{


        totalSales += order.total;


    });



    return {


        orders:
        totalOrders,


        revenue:
        totalSales



    };


}







function showStats(){



    let stats =
    getSalesStats();



    alert(

`📊 SALES STATISTICS

Orders:
${stats.orders}

Revenue:
$${stats.revenue}

Average Order:
$${

stats.orders > 0

?

Math.round(
stats.revenue / stats.orders
)

:

0

}

`

    );



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
    "Enter store name:",
    storeName
    );



    if(name){


        storeName=name;



        localStorage.setItem(
        "storeName",
        storeName
        );



        alert(
        "Store name changed"
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
    ).innerHTML;



    let windowPrint =
    window.open(
    "",
    "",
    "width=400,height=600"
    );



    windowPrint.document.write(

    `

    <html>

    <body>

    ${receipt}

    </body>

    </html>

    `

    );



    windowPrint.print();



    windowPrint.close();



}







// ==============================
// KEYBOARD SHORTCUTS
// ==============================



document.addEventListener(
"keydown",
function(event){



    // F1 opens admin

    if(event.key==="F1"){


        document
        .getElementById(
        "adminLogin"
        )
        .style.display="block";


    }




    // ESC closes windows

    if(event.key==="Escape"){


        document
        .querySelectorAll(
        ".modal"
        )
        .forEach(
        modal=>{

            modal.style.display="none";

        });


    }



});








// ==============================
// STARTUP LOAD
// ==============================



function startup(){



    saveProducts();



    displayProducts();



    updateCart();



}



startup();

function openAdminDashboard(){

    window.location.href = "admin.html";

}
