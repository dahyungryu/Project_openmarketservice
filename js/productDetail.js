const productInfo = document.querySelector(".productInfo");
const countProducts = document.querySelector(".count");
const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");
let amountOfProducts = document.querySelector("input");
const buyNow = document.querySelector(".buyNowBtn");
const putInCart = document.querySelector(".putInCart");
const totalAmount = document.querySelector(".totalAmountNum");
const totalPrice = document.querySelector(".totalPriceNum");

const loginModal = document.querySelector(".loginModal");
const closeModal = document.querySelector(".closeModalBtn");
const cancelLogin = document.querySelector(".cancelLoginBtn");

buyNow.addEventListener("click", (event) => {
  event.preventDefault();
  loginModal.classList.add("active");
});
putInCart.addEventListener("click", (event) => {
  event.preventDefault();
  loginModal.classList.add("active");
});
closeModal.addEventListener("click", () => {
  loginModal.classList.remove("active");
});
cancelLogin.addEventListener("click", () => {
  loginModal.classList.remove("active");
});

let resultPrice = 0;

function minus() {
  if (amountOfProducts.value > 1) {
    amountOfProducts.value--;
    totalAmount.textContent = amountOfProducts.value;

    resultPrice = 17500 * Number(totalAmount.textContent);

    totalPrice.textContent = resultPrice.toLocaleString();
  }
}

function plus() {
  amountOfProducts.value++;
  totalAmount.textContent = amountOfProducts.value;

  resultPrice = 17500 * Number(totalAmount.textContent);

  totalPrice.textContent = resultPrice.toLocaleString();
}

minusBtn.addEventListener("click", minus);
plusBtn.addEventListener("click", plus);

amountOfProducts.addEventListener("input", () => {
  totalAmount.textContent = amountOfProducts.value;

  resultPrice = 17500 * Number(totalCountNum.textContent);

  totalPrice.textContent = resultPrice.toLocaleString();
});
