// =======================================
// GAS & GO ADMIN DASHBOARD V2
// =======================================


const ADMIN_PASSWORD = "gasandgorishandy27";



let products =
JSON.parse(localStorage.getItem("products")) || [];


let orders =
JSON.parse(localStorage.getItem("orders")) || [];




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

    if(confirm("Reset analytics data? This will delete all order statistics.")){

        orders = [];

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

        loadAnalytics();
        loadDashboard();

    }

}

// =======================================
// EXPORT BACKUP
// =======================================


function exportData(){


    let backup = {


        products:products,

        orders:orders


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



        saveProducts();



        localStorage.setItem(

        "orders",

        JSON.stringify(orders)

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


