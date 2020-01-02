/* remove button from cart */
let removeCartContent = document.getElementsByClassName("btn-danger");
for (let a = 0; a < removeCartContent.length; a++) {
  let removeBtn = removeCartContent[a];
  removeBtn.addEventListener("click", function(event) {
    let deleteContent = event.target;
    deleteContent.parentElement.parentElement.remove();
    /* console.log(deleteContent); */
    updateCartTotal();
  });
}

/* to update quantity & price */
function updateCartTotal() {
  let cartProducts = document.getElementsByClassName("inside-cart-products")[0];
  let cartList = cartProducts.getElementsByClassName(
    "inside-cart-products-list"
  );
  let total = 0;
  for (let b = 0; b < cartList.length; b++) {
    let newCartList = cartList[b];
    let priceElement = newCartList.getElementsByClassName(
      "inside-cart-products-price"
    )[0];
    let myQuantity = newCartList.getElementsByClassName(
      "products-inside-quantity"
    )[0];
    let netPrice = parseFloat(priceElement.innerText.replace("$", ""));
    let givenQuantities = myQuantity.value;
    total = total + netPrice * givenQuantities;
  }
  total = Math.round(total * 100) / 100; //to trim it after 2 decimal place
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}

/* update total when quantity changes */
let updateQuant = document.getElementsByClassName("products-inside-quantity");
for (let c = 0; c < updateQuant.length; c++) {
  let updatedQuant = updateQuant[c];
  updatedQuant.addEventListener("change", quantChanged);
}
function quantChanged(event) {
  let myInput = event.target;
  if (isNaN(myInput.value) || myInput.value <= 0) {
    myInput.value = 1;
  }
  updateCartTotal(); //to update the total value
}

/* add to basket function printed on console */
let addToBasket = document.getElementsByClassName("del-btn");
for (let d = 0; d < addToBasket.length; d++) {
  let myToBasket = addToBasket[d];
  myToBasket.addEventListener("click", pushItToBasket);
}
function pushItToBasket(event) {
  let myToBasket = event.target;
  let aside = myToBasket.parentElement.parentElement;
  let pushTitle = aside.getElementsByClassName("cart-title")[0].innerText;
  let pushPrice = aside.getElementsByClassName("price")[0].innerText;
  let pushImage = aside.getElementsByClassName("img1")[0].src;
  console.log(pushTitle, pushPrice, pushImage);
  addItemToBasket(pushTitle, pushPrice, pushImage);
  updateCartTotal(); //to make the new func update total
}

/* add to basket function pushed on the DOM */
function addItemToBasket(pushTitle, pushPrice, pushImage) {
  let createdRow = document.createElement("div");
  /* createdRow.innerText = pushTitle; */
  let rowFrame = document.getElementsByClassName("inside-cart-products")[0];
  /* to avoid repetition inside basket */
  let alreadyAdded = document.getElementsByClassName(
    "inside-cart-products-title"
  );
  for (let e = 0; e < alreadyAdded.length; e++) {
    if (alreadyAdded[e].innerText == pushTitle) {
      alert("the product is already in Basket!");
      return; //avoids below func from being executed
    }
  }
  let rowFrameContents = `
  <div class="inside-cart-products-list">
  <img src="${pushImage}" alt="shirt1" width="50" height="50" />
  <span class="inside-cart-products-title">${pushTitle}</span>
  <span class="inside-cart-products-price">${pushPrice}</span>
  <div class="inside-cart-products-delete-frame">
    <input class="products-inside-quantity" type="number" value="1" />
    <button class="btn-danger" type="button">REMOVE</button>
  </div>
</div>
  `;
  createdRow.innerHTML = rowFrameContents;
  rowFrame.append(createdRow);
  /* the delete btn for newly pushed items not working for that */
  createdRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", function(event) {
      let deleteContent = event.target;
      deleteContent.parentElement.parentElement.remove();
      updateCartTotal(); //total price update function
    });
  /*update total on quantity change on newly added items*/
  createdRow
    .getElementsByClassName("products-inside-quantity")[0]
    .addEventListener("click", quantChanged);
}
