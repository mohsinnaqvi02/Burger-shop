let cartItems = JSON.parse(localStorage.getItem("cartItem"));
const items = JSON.parse(localStorage.getItem("items"));
const meals = JSON.parse(localStorage.getItem("meals"));

// DISPLAYING THE CART ITEMS
function displayCart() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  for (let item of cartItems) {
    const trow = document.createElement("tr");
    const td1 = document.createElement("td");

    //Product Details
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");

    div1.className = "pdetail";
    div2.className = "imgDiv";
    div3.className = "itemdesc";

    const imgTag = document.createElement("img");
    imgTag.className = "cart-img";
    imgTag.src = `./images/${item.id}.jpg`;
    imgTag.alt = `${item.name}`;

    const itemName = document.createElement("h4");
    itemName.appendChild(document.createTextNode(`${item.name}`));
    const itemType = document.createElement("h5");
    itemType.appendChild(document.createTextNode(`${item.type}`));

    div3.append(itemName, itemType);
    div2.appendChild(imgTag);
    div1.append(div2, div3);
    td1.appendChild(div1);
    trow.appendChild(td1); //adding on row

    //Product Quantity
    const td2 = document.createElement("td");
    const itemQuan = document.createElement("h5");
    const quan = document.createTextNode(`${item.itemCount}`);

    const minusbtn = document.createElement("button");
    minusbtn.appendChild(document.createTextNode("-"));

    //minus button event listener
    minusbtn.addEventListener("click", (e) => {
      e.preventDefault();
      subCount(item.id);
    });

    const plusbtn = document.createElement("button");
    plusbtn.appendChild(document.createTextNode("+"));

    //plus button event listener
    plusbtn.addEventListener("click", (e) => {
      e.preventDefault();
      plusCount(item.id);
    });

    itemQuan.append(minusbtn, quan, plusbtn);
    td2.append(itemQuan);
    trow.appendChild(td2);

    //Product Price
    const td3 = document.createElement("td");
    const itemPrice = document.createElement("h5");
    const price = document.createTextNode(`${item.price}`);

    itemPrice.appendChild(price);
    td3.appendChild(itemPrice);
    trow.appendChild(td3);

    //Total Price
    const td4 = document.createElement("td");
    const itemTotal = document.createElement("h5");
    const total = document.createTextNode(`${item.price * item.itemCount}`);

    itemTotal.appendChild(total);
    td4.appendChild(itemTotal);
    trow.appendChild(td4);

    //delete item from cart
    const td5 = document.createElement("td");
    const delButton = document.createElement("button");
    delButton.className="remove-btn";
    delButton.appendChild(document.createTextNode("Remove"));
    td5.appendChild(delButton);
    trow.appendChild(td5);

    tbody.appendChild(trow); // Adding all table description to DOM

    //remove button event listener
    delButton.addEventListener("click", (e) => {
      e.preventDefault();
      deleteFromCart(item.id);
    });
  }

  //display length of item(s) in cart
  document.getElementById(
    "cart-length"
  ).innerText = `Total Item(s) : ${cartItems.length}`;
}

//increasing item count for an item
function plusCount(id) {
  for (item of cartItems) {
    if (item.id === id) {
      item.itemCount += 1;
      localStorage.setItem("cartItem", JSON.stringify(cartItems));
      displayCart();
      return;
    }
  }
}

//descreasing item count for an item
function subCount(id) {
  for (item of cartItems) {
    if (item.id === id) {
      item.itemCount -= 1;
      localStorage.setItem("cartItem", JSON.stringify(cartItems));
      if (item.itemCount < 1) deleteFromCart(item.id);
      displayCart();
      return;
    }
  }
}

//deleting items from cart based on id and updating on local storage
function deleteFromCart(id) {
  cartItems = cartItems.filter((item) => {
    if (!(item.id === id)) {
      console.log(item);
      return item;
    }
  });

  localStorage.setItem("cartItem", JSON.stringify(cartItems));

  displayCart();
}

//checking if item id present in cart items or not
function checkForMealItem(id) {
  for (let item of cartItems) {
    if (item.id === id) {
      return true;
    }
  }
  return false;
}

//Checking for whether items are part of a meal - Optimizing the bill of customer;
function checkForMeal() {
  //OPTIMIZE THIS CODE

  console.log("check for meal");
  for (let item of meals) {
    const prodArr = item.products;
    let isPresent = false;
    for (let i of prodArr) {
      isPresent = checkForMealItem(i);
      if (!isPresent) break;
    }

    if (isPresent) {
      cartItems.push(item);
      for (let i of prodArr) {
        deleteFromCart(i);
      }
    }
  }
  displayCart();
}

function generateBill(e)
{
    e.preventDefault();
    
}


displayCart();

document.getElementById('order-btn').addEventListener('click',generateBill);
