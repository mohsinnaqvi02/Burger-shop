const cartItems=JSON.parse(localStorage.getItem("cartItem"));
const items=JSON.parse(localStorage.getItem("items"));

function displayCart()
{

    for (let item of cartItems)
    {
        const itemDiv= document.createElement('div');
        itemDiv.className="cart-item";

    
        const img=document.createElement("img")
        img.className="cart-img";
        img.src=`./images/${item.id}.jpg`;
        img.alt=`${item.name}`;

        itemDiv.appendChild(img);

        document.getElementById("cartList").appendChild(itemDiv);
        

    }
}


function checkForMeal()
{
    const meals=items.filter((i)=>{
        if(i.hasOwnProperty("products"))
        return i;
    })
    // console.log(meals[0].products[0]);



    //OPTIMIZE THIS CODE
    for(let item of meals)
    {
        if(item.products.includes(1) && item.products.includes(3))
        console.log("YES");
    }
    
}




displayCart()
// checkForMeal();