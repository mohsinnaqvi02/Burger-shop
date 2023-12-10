let cartItems=JSON.parse(localStorage.getItem("cartItem"));
const items=JSON.parse(localStorage.getItem("items"));
const meals=JSON.parse(localStorage.getItem("meals"));



//displaying the cart Items
function displayCart()
{

    for(let item in cartItems)
    {
        console.log(cartItems);
    }

}


//increasing item count for an item
function addCount(e)
{

}


//descreasing item count for an item

function subCount(e)
{
    
}


//deleting items from cart based on id and updating on local storage
function deleteFromCart(id)
{
    cartItems=cartItems.filter((item)=>{
        if(!(item.id===id))
        {
            console.log(item);
            return item;
        }
    });

    localStorage.setItem("cartItem",JSON.stringify(cartItems));

    displayCart();
}



//checking if item id present in cart items or not
function checkForMealItem(id)
{
    for(let item of cartItems)
    {
        if(item.id===id)
        {
            return true;
        }
    }
    return false;
}


//Checking for whether items are part of a meal - Optimizing the bill of customer;
function checkForMeal()
{
    //OPTIMIZE THIS CODE

    console.log("check for meal")
    for(let item of meals)
    {
        const prodArr=item.products
        let isPresent=false;
        for(let i of prodArr)
        {
         isPresent=checkForMealItem(i);
         if(!isPresent)
         break;
        }
        
        if(isPresent)
        {
            cartItems.push(item);
            for(let i of prodArr)
            {
                deleteFromCart(i);
            }
        }

    }
    displayCart();
    
}


checkForMeal();