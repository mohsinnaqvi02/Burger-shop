const cartItems=JSON.parse(localStorage.getItem("cartItem"));
const items=JSON.parse(localStorage.getItem("items"));
const meals=JSON.parse(localStorage.getItem("meals"));

function displayCart()
{

    for(let item in cartItems)
    {
    }

}


function checkForMealItem(id)
{
    for(let item of cartItems)
    {
        if(item.id===id)
        return true;
    }
    return false;
}


function checkForMeal()
{
    //OPTIMIZE THIS CODE
    console.log("check for meal")
    for(let item of meals)
    {
        const prodArr=item.products
        let isPresent;
        for(let i of prodArr)
        {
         isPresent=checkForMealItem(i);
         if(!isPresent)
         break;
        }
        if(isPresent)
        {
            cartItems.push(item);
            console.log(cartItems);
        }

    }
    
}




// displayCart()
checkForMeal();