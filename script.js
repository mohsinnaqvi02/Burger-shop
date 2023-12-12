let items = [];
let meals = [];
let cartItem = [];
let allItems = [];

let itemListDiv = document.getElementById("items");

let itemCount = 1;


document.body.onload = setElements; //On loading of DOM the display method get called;

async function fetchElements(filename) {
  const res = await fetch(filename);
  data = await res.json();
  return data;
}

async function setElements() {
  try {
    items = await fetchElements("items.json");
    meals = await fetchElements("meals.json");
  } catch (err) {
    console.log("File Not Found");
  }

  allItems = [...items, ...meals];

  //Set elements on local storage

  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("meals", JSON.stringify(meals));
  localStorage.setItem("allItems", JSON.stringify(allItems));

  // console.log(items);
  // console.log(meals);
  // console.log(allItems);

  display(allItems);

  // document.getElementById("cat").addEventListener("change",myFilter);

}

async function display(elements) {

    itemListDiv.innerHTML="";

  for (let item of elements) {
    // console.log(item.name);
    //CREATING CARD DIV
    const div = document.createElement("div");
    div.className = "card";

    //CREATING IMAGE TAG
    const img = document.createElement("img");
    img.className = "img";
    img.src = `./images/${item.id}.jpg`;
    img.alt = `${item.name}`;

    //DESCRIPTION OF ITEM DIV
    const div2 = document.createElement("div");
    div2.className = "description";
    div2.id = `${item.id}`;

    //CREATING ITEM DESCRIPTION
    const nameHeading = document.createElement("h4");
    const name = document
      .createElement("b")
      .appendChild(document.createTextNode(`${item.name}`));
    nameHeading.appendChild(name);
    const cat = document.createElement("p");
    cat.appendChild(document.createTextNode(`${item.category}`));

    //DROPDOWN - price & quantity
    const dropdiv = document.createElement("div");
    dropdiv.classList.add("order");
    const price = document.createElement("h5");
    price.className="price";
    price.appendChild(document.createTextNode(`Price : \u20B9 ${item.price}`));

    //Select drop down for number of items
    const itemsSelect = document.createElement("select");
    itemsSelect.name = "nOfItems";
    for (let i = 1; i <= 9; i++) {
      const opt = document.createElement("option");
      opt.text = i;
      opt.value = i;
      itemsSelect.appendChild(opt);
    }

    const add = document.createElement("button");
    add.append(document.createTextNode("ADD"));
    add.classList.add("add-to-cart","small-btn");
    dropdiv.append(price);
    dropdiv.append(itemsSelect);
    dropdiv.append(add);


    //event for item count
    itemsSelect.addEventListener("change", countItem);   //some issues to be solved here

    //event to add item to cart
    add.addEventListener("click", (e)=>{addToCart(e,elements)});


    //APPENDING TO ITEMS ID DIV - which contains all the elements
    div2.appendChild(nameHeading);
    div2.appendChild(cat);
    div2.appendChild(dropdiv);
    div.append(img, div2);

    //adding created elements on DOM for a item
    document.getElementById("items").appendChild(div);
  }
}

//Modify item count if item already present in cart
function existInCart(cartItem,id)
{
  for(let item of cartItem)
  {
    if(item.id===id)
    {
      item.itemCount+=itemCount;
      itemCount=1;
      return true;
    }
  }
  return false;
}

//adding item to cart
function addToCart(e,elements) {
  e.preventDefault();
  const id = parseInt(e.target.parentElement.parentElement.id);
  cartItem = JSON.parse(localStorage.getItem("cartItem"));

  if (cartItem === null) cartItem = [];

  for (let item of allItems) {
    if (item.id === id) {

      //check if item already exist in cart
      const chekCart=existInCart(cartItem,id);
      if(chekCart)
      break;

      item.itemCount = itemCount;
      cartItem.push(item);
    }
  }
  
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
  itemCount=1;

  display(elements); // fix this
}

function countItem(e) {
  itemCount = Number(e.target.value);

}


//Searching DOM
function search(e) {
  const text = e.target.value.toLowerCase();

  const itemList = document.getElementById("items").children;
  console.log(itemList);

  for (let item of itemList) {
    cardText = item.innerText.trim().toLowerCase();
    if (!cardText.includes(text)) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  }
}


//FILTERING DOM 
function myFilter(e)
{
    console.log(e.target.value);

    switch(e.target.value)
    {
        case "all" : display(allItems); console.log("Display All Items"); break;

        case "meals" : display(meals); console.log("Display All Meals"); break;

        case "veg" : let list1 = allItems.filter((item)=>{
            if(item.type.toLowerCase() === "veg" )
            return item;
        })
        display(list1);
        break;

        case "nonveg" : let list2 = allItems.filter((item)=>{
            if(item.type.toLowerCase() === "nonveg" )
            return item;
        })
        display(list2);
        break;

        case "drinks":let list3 = allItems.filter((item)=>{
            if(item.category.toLowerCase()==="drink")
            return item;
        })
        display(list3);
        break;

        default: break;
    }
}

document.getElementById("search").addEventListener("input", search);
document.getElementById("cat").addEventListener("change",myFilter);

