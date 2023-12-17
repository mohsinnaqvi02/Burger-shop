const orders=JSON.parse(localStorage.getItem("orders")).reverse();


console.log(orders);



function display()
{
    if(!orders)
        {
            console.log("NO ORDERS");
            document.getElementById("order-main").classList.add("show");
            return;
        }

    
    for(let order of orders)
    {
        const orderList=document.getElementById("orderList");
        const div=displayOrder(order);
        orderList.appendChild(div);

    }
    
}


function displayOrder(order)
{

    let gtotal=0;

    const div=document.createElement('div');
    div.className="card"
    
    const itemsNo=document.createElement("h2");
    itemsNo.appendChild(document.createTextNode(`Total Item(s): ${order.length}`));

    div.appendChild(itemsNo);

    for(let item of order)
    {

        const itemName=document.createElement("h4");
        itemName.appendChild(document.createTextNode(` Item Name : ${item.name}`));
        
        div.appendChild(itemName);
        
        gtotal+=item.price * item.itemCount;

    }
    const total=document.createElement('h4');
    total.appendChild(document.createTextNode(`Grand Total : \u20B9 ${gtotal}`));
    div.appendChild(total);
    return div;

}

display();