const orders=JSON.parse(localStorage.getItem("orders"));


console.log(orders);


// <div class="card">
//             <h2>Order Number</h2>
//             <h3>Ordered Item(s)</h3>
//             <h4>Item Name 1</h4>
//             <h4>Item Name 2</h4>
//             <h4>Item Name 3</h4>
//             <h4>Item Name 4</h4>
//             <h4>Grand Total : 400</h4>

//           </div>

function display()
{
    if(!orders)
    {
        console.log("NO ORDERS");
        document.getElementById("order-main").classList.add("show");
    }

    let gtotal=0;

    const orderList=document.getElementById("orderList");

    const div=document.createElement('div');
    div.className="card"
    
    const itemsNo=document.createElement("h2");
    itemsNo.appendChild(document.createTextNode(`Total Item(s): ${orders.length}`));

    div.appendChild(itemsNo);

    for(let item of orders)
    {

        const itemName=document.createElement("h4");
        itemName.appendChild(document.createTextNode(` Item Name : ${item.name}`));
        
        div.appendChild(itemName);
        
        gtotal+=item.price * item.itemCount;

    }
    const total=document.createElement('h4');
    total.appendChild(document.createTextNode("Grand Total : " +gtotal));
    div.appendChild(total);
    orderList.appendChild(div);
}

display();