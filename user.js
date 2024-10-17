const baseUrl = "https://estapi.openmarket.weniv.co.kr";
const buyerJoinFm = document.querySelector(".buyerFm");
const sellerJoinFm = document.querySelector(".sellerFm");

const userNameInput = document.querySelector("#userName");
const actualNameInput = document.querySelector("#actualName");
const userPassword = document.querySelector("#userPassword");
const phoneNumFirstOptions = document.querySelector(".phoneNum-first");
const phoneNumMiddle = document.querySelector(".phoneNum-middle");
const phoneNumlast = document.querySelector(".phoneNum-last");

const userName = userNameInput.value;
const actualName = actualNameInput.value;
const phoneNumFirst =
  phoneNumFirstOptions.options[phoneNumFirstOptions.selectedIndex];
const userPhoneNum = `${phoneNumFirst}-${phoneNumMiddle.value}-${phoneNumlast.value}`;

const buyerJoinBtn = buyerJoinFm.querySelector(".joinBtn");
const sellerJoinBtn = sellerJoinFm.querySelector(".joinBtn");

async function userNameValidation() {
  const response = await fetch(`${baseUrl}/accounts/validate-username/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName }),
  });
  const data = await response.json();
  console.log(data);
  document.querySelector("msg-id").textContent =
    data.error || "멋진 아이디네요:)";
}

async function joinBuyer() {
  const buyerData = {
    username: buyerJoinFm.getElementById("userName").value,
    password: buyerJoinFm.getElementById("userPassword").value,
    name: buyerJoinFm.getElementById("actualName").value,
    phone_number: userPhoneNum,
  };
  const response = await fetch(`${baseUrl}/accounts/buyer/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buyerData),
  });
}

async function joinSeller() {
  const sellerData = {
    username: sellerJoinFm.getElementById("username").value,
    password: sellerJoinFm.getElementById("userPassword").value,
    name: sellerJoinFm.getElementById("actualName").value,
    phone_number: sellerJoinFm.getElementById("sellerPhone").value,
    seller_registration_number: sellerJoinFm.getElementById("sellerNum").value,
    store_name: sellerJoinFm.getElementById("storeName").value,
  };
  const response = await fetch(`${baseUrl}/accounts/seller/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sellerData),
  });
}

userNameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    userNameValidation();
  }
});
buyerJoinBtn.addEventListener("click", joinBuyer);
sellerJoinBtn.addEventListener("click", joinSeller);
