
const authForm = document.getElementById("auth-form");
const nameField = document.getElementById("name-field");
const confirmField = document.getElementById("confirm-field");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");

const formTitle = document.getElementById("form-title");
const formEyebrow = document.getElementById("form-eyebrow");
const formSubtitle = document.getElementById("form-subtitle");
const submitBtn = document.getElementById("submit-btn");
const switchModeBtn = document.getElementById("switch-mode");
const switchLabel = document.getElementById("switch-label");
const message = document.getElementById("message");

const togglePassword = document.getElementById("toggle-password");

let isRegisterMode = false;

// Read registered users from this browser
function getUsers() {
  return JSON.parse(localStorage.getItem("finoraUsers") || "[]");
}

// Display success or error messages
function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}

// Switch between Login and Registration
switchModeBtn.addEventListener("click", () => {
  isRegisterMode = !isRegisterMode;

  authForm.reset();
  showMessage("", "");

  nameField.hidden = !isRegisterMode;
  confirmField.hidden = !isRegisterMode;

  nameInput.required = isRegisterMode;
  confirmInput.required = isRegisterMode;

  if (isRegisterMode) {
    formEyebrow.textContent = "START YOUR JOURNEY";
    formTitle.textContent = "Create account";
    formSubtitle.textContent = "Register to start planning your events.";
    submitBtn.innerHTML = 'Create account <span>→</span>';
    switchLabel.textContent = "Already have an account?";
    switchModeBtn.textContent = "Sign in";
    passwordInput.autocomplete = "new-password";
  } else {
    formEyebrow.textContent = "WELCOME BACK";
    formTitle.textContent = "Sign in";
    formSubtitle.textContent = "Enter your details to continue planning.";
    submitBtn.innerHTML = 'Sign in <span>→</span>';
    switchLabel.textContent = "Don't have an account?";
    switchModeBtn.textContent = "Create account";
    passwordInput.autocomplete = "current-password";
  }
});

// Show or hide password
togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "Hide" : "Show";
});

// Handle registration and login
authForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  const users = getUsers();

  if (isRegisterMode) {
    const name = nameInput.value.trim();
    const confirmPassword = confirmInput.value;

    if (!name) {
      return showMessage("Please enter your full name.", "error");
    }

    if (password.length < 6) {
      return showMessage("Password must contain at least 6 characters.", "error");
    }

    if (password !== confirmPassword) {
      return showMessage("Passwords do not match.", "error");
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return showMessage("This email is already registered. Please sign in.", "error");
    }

    users.push({
      name: name,
      email: email,
      password: password
    });

    localStorage.setItem("finoraUsers", JSON.stringify(users));

    showMessage("Account created successfully! You can now sign in.", "success");

    authForm.reset();

    // Switch back to login
    setTimeout(() => {
      switchModeBtn.click();
      emailInput.value = email;
      showMessage("Your account is ready. Please sign in.", "success");
    }, 1000);

  } else {
    const user = users.find(
      user => user.email === email && user.password === password
    );

    if (!user) {
      return showMessage("Invalid email or password. Please try again.", "error");
    }

    // Save current login session
    sessionStorage.setItem("finoraCurrentUser", JSON.stringify({
      name: user.name,
      email: user.email
    }));

    showMessage("Login successful! Opening your dashboard...", "success");

    // Open dashboard
    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  }
});
