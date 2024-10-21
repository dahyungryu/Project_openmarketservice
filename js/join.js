const buyerBtn = document.querySelector(".join-buyer");
const sellerBtn = document.querySelector(".join-seller");
const sellerOnlyInfo = document.querySelector(".seller-only");
const joinForm = document.querySelector(".joinFm");
const checkIdBtn = document.querySelector(".checkId");
const idMsg = document.querySelector(".msg-id");
const pwMsg = document.querySelector(".msg-pw");
const passwordInput = document.getElementById("userPassword");
const checkPasswordInput = document.getElementById("checkPassword");
const agreementCheckbox = document.getElementById("agreement");
const submitBtn = document.querySelector(".submitBtn");

const usernameInput = document.getElementById("userName");
const nameInput = document.getElementById("actualName");
const phoneFirst = document.getElementById("phoneNum-first");
const phoneMiddle = document.getElementById("phoneNum-middle");
const phoneLast = document.getElementById("phoneNum-last");

// 전화번호
function validatePhoneNumber() {
  const phoneNum = phoneFirst.value + phoneMiddle.value + phoneLast.value;
  return /^010\d{7,8}$/.test(phoneNum);
}

// 비밀번호
function validatePassword(password) {
  if (password.length < 8) {
    return "비밀번호는 8자 이상이어야 합니다.";
  }
  if (!/[a-z]/.test(password)) {
    return "비밀번호는 한개 이상의 영소문자가 필수적으로 들어가야 합니다.";
  }
  if (!/\d/.test(password)) {
    return "비밀번호는 한개 이상의 숫자가 필수적으로 들어가야 합니다.";
  }
  return "";
}

// 판매자/구매자 선택
buyerBtn.addEventListener("click", () => {
  buyerBtn.classList.add("active");
  sellerBtn.classList.remove("active");
  sellerOnlyInfo.classList.remove("active");
});

sellerBtn.addEventListener("click", () => {
  buyerBtn.classList.remove("active");
  sellerBtn.classList.add("active");
  sellerOnlyInfo.classList.add("active");
});

// 아이디 중복 체크
checkIdBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userId = usernameInput.value;

  if (userId === "takenId") {
    idMsg.textContent = "이미 사용중인 아이디입니다";
    idMsg.style.color = "red";
  } else {
    idMsg.textContent = "멋진 아이디네요 :)";
    idMsg.style.color = "green";
  }
});

// 비밀번호 재확인
checkPasswordInput.addEventListener("input", () => {
  const passwordValidationMessage = validatePassword(passwordInput.value);
  if (passwordValidationMessage) {
    pwMsg.textContent = passwordValidationMessage;
    pwMsg.style.color = "red";
  } else if (passwordInput.value !== checkPasswordInput.value) {
    pwMsg.textContent = "비밀번호가 일치하지 않습니다.";
    pwMsg.style.color = "red";
  } else {
    pwMsg.textContent = "";
  }
});

// 제출 버튼을 모든 입력칸이 입력되었을때와 체크박스에 체크 했을때만 활성화
joinForm.addEventListener("input", () => {
  const isFormValid = joinForm.checkValidity() && agreementCheckbox.checked;
  submitBtn.disabled = !isFormValid;
});

joinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userId = usernameInput.value;
  const password = passwordInput.value;
  const name = nameInput.value;
  const phoneNum = phoneFirst.value + phoneMiddle.value + phoneLast.value;

  // 사용가능한 비밀번호안자 확인
  const passwordValidationMessage = validatePassword(password);
  if (passwordValidationMessage) {
    pwMsg.textContent = passwordValidationMessage;
    pwMsg.style.color = "red";
    return;
  }

  // 전화번호 확인
  if (!validatePhoneNumber()) {
    alert("핸드폰번호는 010으로 시작해야 하는 10~11자리 숫자여야 합니다.");
    return;
  }

  const data = {
    username: userId,
    password: password,
    name: name,
    phone_number: phoneNum,
  };

  fetch("/accounts/buyer/signup/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        alert(result.error);
      } else {
        // 성공시 로그인 화면으로 가기
        window.location.href = "./login.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
