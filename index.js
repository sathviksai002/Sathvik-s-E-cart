import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref, push, onValue, remove} from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL : "https://playground-669ad-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref(database, "shoppingList")

console.log(shoppingListInDb)


let cartVal = document.getElementById("cart");
let saveEl = document.getElementById("save-btn");
let ulEl = document.getElementById("ul-el");

saveEl.addEventListener("click", function () {

  push(shoppingListInDb,cartVal.value);
  // save(cartVal.value);
  refresh();
});


onValue(shoppingListInDb, function(snapshot){
  if(snapshot.exists()){
  let items = Object.entries(snapshot.val());
  ulEl.innerHTML = "";
  for(let i = 0 ; i < items.length ; i++){
    let currentItem = items[i];
    save(currentItem);
  }
}
else{
  ulEl.innerHTML = "No items here ..."
}
})


function save(value){
  // ulEl.innerHTML += `<li> ${value} </li>`;
  let newEl = document.createElement("li");
  let itemId = value[0];
  let itemValue = value[1];
  newEl.textContent = itemValue;
  
  newEl.addEventListener("dblclick",function(){
    let exactLocation = ref(database, `shoppingList/${itemId}`);
    remove(exactLocation);
    // console.log(itemId);
  })

  ulEl.append(newEl);
}


function refresh(){
  cartVal.value = "";
}
