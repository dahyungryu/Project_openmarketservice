async function login() {
    const loginData = {
      username: document.getElementById("loginUsername").value,
      password: document.getElementById("loginPassword").value,
      login_type: document.getElementById("loginType").value,
    };
    const response = await fetch(`${baseUrl}/accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
  }