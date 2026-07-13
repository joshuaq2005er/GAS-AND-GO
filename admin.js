// ==================================
// GAS & GO ADMIN DASHBOARD
// ==================================


// ADMIN PASSWORD

const ADMIN_PASSWORD = "gasandgorihandy27";




// LOAD DATA

let products =
JSON.parse(
localStorage.getItem("products")
) || [];


let orders =
JSON.parse(
localStorage.getItem("orders")
) || [];




// ==================================
// LOGIN
// ==================================


function adminLogin(){


    let password =
    document.getElementById("password").value;



    if(password === ADMIN_PASSWORD){


        document.getElementById("loginBox")
        .style.display="none";


        document.getElementById("dashboard")
        .style.display="block";


        loadProducts();

        loadOrders();

        loadStats();


    }
    else{


        document.getElementById("loginError")
        .innerText="❌ Incorrect password";


    }


}






// ==================================
// PRODUCTS
// ==================================


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



    products.forEach((product,index)=>{


        let div =
        document.createElement("div");


        div.className="admin-product";



        div.innerHTML=`

        <span>

        <b>${product.name}</b>
        <br>

        Category:
        ${product.category}

        </span>



        <input 
        type="number"
        value="${product.price}"
        id="price${index}"
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







function addAdminProduct(){


    let name =
    document.getElementById(
        "productName"
    ).value;



    let price =
    Number(
    document.getElementById(
        "productPrice"
    ).value
    );



    let category =
    document.getElementById(
        "productCategory"
    ).value;




    if(
        name===""
        ||
        price<=0
    ){

        alert(
        "Fill all fields"
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



    document.getElementById(
    "productName"
    ).value="";


    document.getElementById(
    "productPrice"
    ).value="";


}









function changePrice(index){


    let price =

    Number(

    document.getElementById(
        "price"+index
    ).value

    );



    products[index].price=price;


    saveProducts();


    loadProducts();


}







function deleteProduct(index){


    if(
    confirm(
    "Delete product?"
    )
    ){


        products.splice(
            index,
            1
        );


        saveProducts();


        loadProducts();


    }


}








// ==================================
// ORDERS
// ==================================


function loadOrders(){



    let box =
    document.getElementById(
        "orders"
    );



    box.innerHTML="";



    if(orders.length===0){


        box.innerHTML=
        "No orders";


        return;

    }





    orders
    .reverse()
    .forEach(order=>{


        let div =
        document.createElement("div");



        div.className="cart-item";



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

        `;



        box.appendChild(div);


    });



}









// ==================================
// STATISTICS
// ==================================


function loadStats(){



    let revenue=0;


    orders.forEach(order=>{


        revenue += order.total;


    });




    document.getElementById(
        "stats"
    ).innerHTML=`

    <h3>
    Total Orders:
    ${orders.length}
    </h3>


    <h3>
    Revenue:
    $${revenue}
    </h3>


    <h3>
    Average Sale:
    $
    ${
    orders.length
    ?
    Math.round(
    revenue/orders.length
    )
    :
    0
    }

    </h3>

    `;



}
