const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const modal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");
const authTitle = document.getElementById("authTitle");
const switchText = document.getElementById("switchText");
const switchLink = document.getElementById("switchLink");
const authSubmit = document.getElementById("authSubmit");
const authMessage = document.getElementById("authMessage");
let isLogin = true;

function toggleModal(show) {
  modal.style.display = show ? "flex" : "none";
}

loginBtn.onclick = () => {
  isLogin = true;
  authTitle.textContent = "Login";
  switchText.innerHTML = `Don't have an account? <span id="switchLink">Sign up here</span>`;
  toggleModal(true);
  setupSwitch();
};

signupBtn.onclick = () => {
  isLogin = false;
  authTitle.textContent = "Sign Up";
  switchText.innerHTML = `Already have an account? <span id="switchLink">Login here</span>`;
  toggleModal(true);
  setupSwitch();
};

closeModal.onclick = () => toggleModal(false);
window.onclick = e => { if (e.target === modal) toggleModal(false); };

function setupSwitch() {
  document.getElementById("switchLink").onclick = () => {
    isLogin = !isLogin;
    authTitle.textContent = isLogin ? "Login" : "Sign Up";
    switchText.innerHTML = isLogin
      ? `Don't have an account? <span id="switchLink">Sign up here</span>`
      : `Already have an account? <span id="switchLink">Login here</span>`;
    setupSwitch();
  };
}

authSubmit.onclick = () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) {
    authMessage.textContent = "Please fill all fields!";
    return;
  }

  if (isLogin) {
    const user = JSON.parse(localStorage.getItem(username));
    if (user && user.password === password) {
      authMessage.style.color = "#4ade80";
      authMessage.textContent = "Login successful!";
      toggleModal(false);
    } else {
      authMessage.textContent = "Invalid credentials!";
    }
  } else {
    if (localStorage.getItem(username)) {
      authMessage.textContent = "Username already exists!";
    } else {
      localStorage.setItem(username, JSON.stringify({ password }));
      authMessage.style.color = "#4ade80";
      authMessage.textContent = "Account created successfully!";
    }
  }
};
