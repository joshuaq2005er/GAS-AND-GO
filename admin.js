// =======================================
// GAS & GO ADMIN DASHBOARD V2
// =======================================


const ADMIN_PASSWORD = "gasandgorishandy27";



let products =
JSON.parse(localStorage.getItem("products")) || [];


let orders =
JSON.parse(localStorage.getItem("orders")) || [];

let discountCodes =
JSON.parse(localStorage.getItem("discountCodes")) || [];


// Pre-set staff discounts
const presetDiscounts = [
  { name: "Florida Highway Patrol", discount: 15 },
  { name: "Hillsborough County Sheriff's Office", discount: 15 },
  { name: "Tampa Police Department", discount: 20 },
  { name: "Fire Department / EMS", discount: 20 },
  { name: "Employee", discount: 25 }
];




// =======================================
// LOGIN
// =======================================


function adminLogin(){


    let password =
    document.getElementById("password").value;



    if(password === ADMIN_PASSWORD){


        document.getElementById("loginScreen")
        .style.display="none";


        document.getElementById("dashboard")
        .style.display="block";


        loadDashboard();


    }
    else{


        document.getElementById("loginError")
        .innerText =
        "❌ Wrong password";


    }

}




function logoutAdmin(){


    location.reload();


}




// =======================================
// TABS
// =======================================


function openTab(tab){



    document
    .querySelectorAll(".admin-tab")
    .forEach(section=>{


        section.style.display="none";


    });



    document
    .getElementById(tab)
    .style.display="block";



    if(tab==="productsTab"){

        loadProducts();

    }



    if(tab==="ordersTab"){

        loadOrders();

    }



    if(tab==="discountsTab"){

        loadDiscounts();

    }



    if(tab==="analyticsTab"){

        loadAnalytics();

    }



}




// =======================================
// DASHBOARD
// =======================================


function loadDashboard(){


    document
    .getElementById("totalOrders")
    .innerText =
    orders.length;



    let revenue=0;


    orders.forEach(order=>{

        revenue += order.total;

    });



    document
    .getElementById("totalRevenue")
    .innerText =
    "$"+revenue;



    document
    .getElementById("totalProducts")
    .innerText =
    products.length;


}




// =======================================
// PRODUCTS
// =======================================


function saveProducts(){


    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );


}




function loadProducts(){


    let box =
    document.getElementById(
    "adminProductList"
    );


    box.innerHTML="";



    let search =

    document
    .getElementById("productSearch")
    .value
    .toLowerCase();




    products

    .filter(product=>

    product.name
    .toLowerCase()
    .includes(search)

    )


    .forEach((product,index)=>{



        let div =
        document.createElement("div");



        div.className =
        "admin-product";



        div.innerHTML = `


        <div>

        <b>
        ${product.name}
        </b>

        <br>

        Category:
        ${product.category}

        </div>



        <input
        id="editPrice${index}"
        type="number"
        value="${product.price}"
        >



        <button onclick="savePrice(${index})">

        Save

        </button>



        <button onclick="deleteProduct(${index})">

        Delete

        </button>



        `;



        box.appendChild(div);


    });



}




document
.addEventListener(
"input",
function(e){


    if(e.target.id==="productSearch"){


        loadProducts();


    }


});




function addAdminProduct(){


    let name =
    document
    .getElementById("productName")
    .value;



    let price =
    Number(
    document
    .getElementById("productPrice")
    .value
    );



    let category =
    document
    .getElementById("productCategory")
    .value;




    if(
    !name ||
    price<=0
    ){

        alert(
        "Invalid information"
        );

        return;

    }




    products.push({

        name:name,

        price:price,

        category:category

    });



    saveProducts();



    loadProducts();



    loadDashboard();


}




function savePrice(index){



    let price =

    Number(

    document
    .getElementById(
    "editPrice"+index
    )
    .value

    );



    products[index].price =
    price;



    saveProducts();


    loadProducts();


}




function deleteProduct(index){



    if(confirm(
    "Delete this product?"
    )){


        products.splice(
        index,
        1
        );


        saveProducts();


        loadProducts();


        loadDashboard();


    }


}




// =======================================
// ORDERS
// =======================================

function loadOrders(){

    let box =
    document.getElementById("orders");

    box.innerHTML = "";

    let searchBox =
    document.getElementById("orderSearch");

    let search = "";

    if(searchBox){
        search = searchBox.value.toLowerCase();
    }

    orders
    .slice()
    .reverse()
    .filter(order=>{

        return (

            (order.customerUsername || "")
            .toLowerCase()
            .includes(search)

            ||

            (order.customerID || "")
            .toLowerCase()
            .includes(search)

            ||

            order.items.some(item=>

                item.name
                .toLowerCase()
                .includes(search)

            )

        );

    })
    .forEach(order=>{

        let div =
        document.createElement("div");

        div.className="cart-item";

        div.innerHTML = `

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

${order.items.map(item=>item.name + " x" + item.quantity).join(", ")}

<br>

<b>Total:</b>
$${order.total}

<br>

<b>Payment:</b>
${order.payment}

<br>

<b>Proof:</b>
${order.proof}

<br><br>

<button onclick='viewOrder(${JSON.stringify(order)})'>
View Full Order
</button>

`;

        box.appendChild(div);

    });

}

// =======================================
// DISCOUNTS
// =======================================

function loadDiscounts(){

    loadDiscountCodes();

}

function createDiscountCode(){

    let code =
    document.getElementById("discountCodeInput")
    .value
    .trim()
    .toUpperCase();

    let description =
    document.getElementById("discountDescriptionInput")
    .value
    .trim();

    let type =
    document.getElementById("discountTypeInput")
    .value;

    let value =
    Number(
        document.getElementById("discountValueInput")
        .value
    );

    let minimumPurchase =
    Number(
        document.getElementById("discountMinimumInput")
        .value
    ) || 0;

    let maxUses =
    Number(
        document.getElementById("discountUsesInput")
        .value
    ) || 1;

    let active =
    document.getElementById("discountActiveInput")
    .checked;

    if(code===""){

        alert("Enter a code.");
        return;

    }

    if(value<=0){

        alert("Enter a valid discount value.");
        return;

    }

    if(
        discountCodes.some(
            d=>d.code===code
        )
    ){

        alert("That code already exists.");

        return;

    }

    discountCodes.push({

        code:code,

        description:description,

        type:type,

        value:value,

        minimumPurchase:minimumPurchase,

        maxUses:maxUses,

        uses:0,

        active:active,

        created:
        new Date().toLocaleString()

    });

    localStorage.setItem(

        "discountCodes",

        JSON.stringify(discountCodes)

    );

    document.getElementById("discountCodeInput").value="";
    document.getElementById("discountDescriptionInput").value="";
    document.getElementById("discountValueInput").value="";
    document.getElementById("discountMinimumInput").value="";
    document.getElementById("discountUsesInput").value="1";
    document.getElementById("discountActiveInput").checked=true;

    loadDiscountCodes();

    alert("Discount created!");

}

function loadDiscountCodes(){

    let box =
    document.getElementById(
        "discountCodesList"
    );

    box.innerHTML="";

    if(discountCodes.length===0){

        box.innerHTML=
        "<p>No discount codes created.</p>";

        return;

    }

    discountCodes.forEach((discount,index)=>{

        let div =
        document.createElement("div");

        div.className="cart-item";

        div.innerHTML=`

<b>${discount.code}</b>

<br><br>

Description:

${discount.description || "None"}

<br><br>

Discount:

${discount.type==="percent"
?
discount.value+"% OFF"
:
"$"+discount.value+" OFF"}

<br><br>

Minimum Purchase:

$${discount.minimumPurchase}

<br><br>

Uses:

${discount.uses} / ${discount.maxUses}

<br><br>

Status:

${
discount.active
?
"🟢 Active"
:
"🔴 Disabled"
}

<br><br>

Created:

${discount.created}

<br><br>

<button onclick="toggleDiscount(${index})">

${
discount.active
?
"Disable"
:
"Enable"
}

</button>

<button onclick="deleteDiscountCode(${index})">

Delete

</button>

`;

        box.appendChild(div);

    });

}

function toggleDiscount(index){

    discountCodes[index].active =
    !discountCodes[index].active;

    localStorage.setItem(

        "discountCodes",

        JSON.stringify(discountCodes)

    );

    loadDiscountCodes();

}

function deleteDiscountCode(index){

    if(

        confirm(
            "Delete this code?"
        )

    ){

        discountCodes.splice(index,1);

        localStorage.setItem(

            "discountCodes",

            JSON.stringify(discountCodes)

        );

        loadDiscountCodes();

    }

}

// =======================================
// ANALYTICS
// =======================================


function loadAnalytics(){


    let revenue = 0;

    let itemCount = {};



    orders.forEach(order=>{


        revenue += order.total;



        order.items.forEach(item=>{


            if(!itemCount[item.name]){

                itemCount[item.name]=0;

            }


            itemCount[item.name] += item.quantity;


        });



    });




    let mostSold = "None";

    let highest = 0;



    for(let item in itemCount){


        if(itemCount[item] > highest){


            highest = itemCount[item];

            mostSold=item;


        }


    }




    document
    .getElementById("analytics")
    .innerHTML = `


    <div class="card">

    <h3>
    Total Revenue
    </h3>

    <p>
    $${revenue}
    </p>

    </div>



    <div class="card">

    <h3>
    Total Orders
    </h3>

    <p>
    ${orders.length}
    </p>

    </div>



    <div class="card">

    <h3>
    Best Selling Item
    </h3>

    <p>
    ${mostSold}
    </p>

    </div>



    `;



}

// REST ANALYTICSICS

function resetAnalytics(){

    if(confirm("Reset analytics data?")){

        loadAnalytics();
        loadDashboard();

        alert("Analytics refreshed.");

    }

}

// =======================================
// EXPORT BACKUP
// =======================================


function exportData(){


    let backup = {


        products:products,

        orders:orders,

        discountCodes:discountCodes


    };



    let blob = new Blob(

    [

    JSON.stringify(
    backup,
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
    URL.createObjectURL(blob);



    link.download =
    "gas-go-backup.json";



    link.click();


}




// =======================================
// IMPORT BACKUP
// =======================================


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

        if(data.discountCodes){

            discountCodes =
            data.discountCodes;

        }



        localStorage.setItem(

        "products",

        JSON.stringify(products)

        );



        localStorage.setItem(

        "orders",

        JSON.stringify(orders)

        );

        localStorage.setItem(

        "discountCodes",

        JSON.stringify(discountCodes)

        );


        alert(
        "Backup restored!"
        );



        location.reload();


    };



    reader.readAsText(file);



}


// view order

function viewOrder(order){

alert(
`
Order #${order.id}

Customer:
${order.customerUsername}

User ID:
${order.customerID || "None"}

Items:

${order.items.map(item =>
item.name + " x" + item.quantity
).join("\n")}

Total:
$${order.total}

Payment:
${order.payment}

Proof:
${order.proof}

Date:
${order.date}
`
);

}

