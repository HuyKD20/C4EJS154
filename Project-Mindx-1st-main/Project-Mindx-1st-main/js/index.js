// addProduct
let containerProduct = document.getElementById("wrapperProduct");
const listProduct = [
  {
    img: "./imgs/gallery/arrival1.png",
    name: "Knitted Jumper",
    star: 5,
    price: "$ 30.00",
  },
  {
    img: "./imgs/gallery/arrival2.png",
    name: "Knitted Jumper",
    star: 5,
    price: "$ 30.00",
  },
  {
    img: "./imgs/gallery/arrival3.png",
    name: "Knitted Jumper",
    star: 5,
    price: "$ 30.00",
  },
  {
    img: "./imgs/gallery/arrival4.png",
    name: "Knitted Jumper",
    star: 5,
    price: "$ 30.00",
  },
  {
    img: "./imgs/gallery/arrival5.png",
    name: "Knitted Jumper",
    star: 5,
    price: "$ 30.00",
  },
  {
    img: "./imgs/gallery/arrival6.png",
    name: "Knitted Jumper",
    star: 5,
    price: "$ 30.00",
  },
  {
    img: "./imgs/gallery/arrival7.png",
    name: "Knitted Jumper",
    star: 5,
    price: "$ 30.00",
  },
  {
    img: "./imgs/gallery/arrival8.png",
    name: "Knitted Jumper",
    star: 5,
    price: "$ 30.00",
  },
  {
    img: "./imgs/gallery/arrival1.png",
    name: "Knitted Jumper",
    star: 5,
    price: "$ 30.00",
  },
];
let arrElProduct = "";
for (let i = 0; i < listProduct.length; i++) {
  let star = "";

  for (let j = 0; j < listProduct[i].star; j++) {
    star += ' <i class="checked fas fa-star"></i>';
  }

  const el = `<div class="new-arrivals-product col-xl-3 col-lg-3 col-md-6 col-sm-6">
            <div class="single-new-arrival mb-50 text-center ">
              <div class="popular-img">
                <img src="${listProduct[i].img}" class = "linkImg" alt="" />
                <div class="favorit-items store-btn">
                  <img src="./imgs/gallery/favorit-card.png" alt="" />
                </div>
              </div>
              <div class="popular-caption">
                <h3>
                  <a href="shop.html" class="productName">${listProduct[i].name}</a>
                </h3>
                <div class="rating mb-10">
                  ${star}
                </div>
                <span class="productPrice">${listProduct[i].price}</span>
              </div>
            </div>
          </div>`;
  arrElProduct += el;
}
containerProduct.innerHTML = arrElProduct;

// ============================================================================================================

// SIDEBAR FUNCTION
const elSidebarButton = document.getElementById("sidebar-icon");
const elSidebarMenu = document.getElementById("sidebar-menu");

elSidebarButton.addEventListener("click", openMenuSideBar);

function openMenuSideBar() {
  if (elSidebarMenu.style.display == "none") {
    elSidebarMenu.style.display = "block";
  } else {
    elSidebarMenu.style.display = "none";
  }
}
// ============================================================================================================

// Check Login

const elPCheck = document.getElementById("login_check");
const elLogoutBtn = document.getElementById("logout_btn");
let checkUserLogin = JSON.parse(localStorage.getItem("checkLogin"));
if (checkUserLogin == true) {
  elPCheck.style.display = "block";
  elPCheck.textContent = localStorage.getItem("userNickname");
  elLogoutBtn.style.display = "block";
}

// ============================================================================================================

// Logout Button
elLogoutBtn.addEventListener("click", logOutBtn);

function logOutBtn() {
  checkUserLogin = false;
  localStorage.setItem("checkLogin", JSON.stringify(checkUserLogin));
  elPCheck.textContent = localStorage.setItem("userNickname", "");
  elPCheck.style.display = "none";
  elLogoutBtn.style.display = "none";
}

// ============================================================================================================

// Shopping cart on off
const elCartButtonOn = document.getElementById("header_store");
const elCartButtonOff = document.getElementById("btnCardClose");
const elCartBox = document.getElementById("shopping-cart");

elCartButtonOn.addEventListener("click", cartOn);
elCartButtonOff.addEventListener("click", cartOff);

function cartOn() {
  elCartBox.style.display = "block";
}
function cartOff() {
  elCartBox.style.display = "none";
}

// ============================================================================================================

// Add Shopping cart
const btnBuy = document.querySelectorAll(".store-btn");
btnBuy.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    let btnItem = event.target;
    let cardProduct = btnItem.parentElement.parentElement.parentElement;
    let productImg = cardProduct.querySelector(".linkImg").src;
    let productName = cardProduct.querySelector(".productName").textContent;
    let ItemPrice = cardProduct.querySelector(".productPrice").textContent;
    let productPrice = formatMoney(ItemPrice);
    addCart(productImg, productName, productPrice);
    deleteCart();
    calcTotal();
  });
});

// ============================================================================================================

function formatMoney(value) {
  return value.split(" ")[1].split(".")[0];
}

// ============================================================================================================

// FUNCTION ADDCART
function addCart(productImg, productName, productPrice) {
  let cartShopping = document.createElement("div");
  cartShopping.classList = "cart-product d-flex justify-content-between";
  let cartItem = document.querySelectorAll(".cart-product");
  for (let i = 0; i < cartItem.length; i++) {
    let productItem = document.querySelectorAll(".cart-product");
    if (productItem[i].innerHTML == productName) {
      alert("Sản phẩm đã có trong giỏ");
      return;
    }
  }
  let cardContent = ` 
    <div>
      <img src="${productImg}" alt="" />
      <div class="d-flex flex-column gap-2">
        <p class="card-Name">${productName}</p>
        <div>
          <p class="product_price">$ ${productPrice}.00</p>
        </div>
      </div>
      <i class="fa-regular fa-circle-xmark deleteProduct"></i>
    </div>
      `;
  cartShopping.innerHTML = cardContent;
  let cartBody = document.querySelector(".cart-bottom");
  cartBody.append(cartShopping);
}

// ============================================================================================================

// FUNCTION DELETE CART
function deleteCart() {
  let cartItem = document.querySelectorAll(".cart-product");
  for (let i = 0; i < cartItem.length; i++) {
    let cart__Close = document.querySelectorAll(".deleteProduct");
    cart__Close[i].addEventListener("click", function (event) {
      let cartDelete = event.target;
      let cartCloseDelete = cartDelete.parentElement.parentElement;
      cartCloseDelete.remove();
      calcTotal();
    });
  }
}

// ============================================================================================================

// FUNCTION CALC TOTAL
function calcTotal() {
  let cartItem = document.querySelectorAll(".cart-product");
  let totalCash = 0;
  for (let i = 0; i < cartItem.length; i++) {
    let inputChangeValue = parseInt(
      formatMoney(cartItem[i].querySelector(".product_price").textContent)
    );
    totalCash = totalCash + inputChangeValue;
  }
  let totalDisplay = document.querySelector(".nav__mount");
  totalDisplay.textContent = `$ ${totalCash}.00`;
}

// ============================================================================================================

// FUNCTION PURCHASE
const purBtn = document.getElementById("btnPurchase");

purBtn.addEventListener("click", purBtnClick);

function purBtnClick() {
  let cartItem = document.querySelectorAll(".cart-product");
  let totalDisplay = document.querySelector(".nav__mount");
  for (let i = 0; i < cartItem.length; i++) {
    cartItem[i].remove();
  }
  totalDisplay.textContent = `$ 0.00`;
}
