import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { app } from "../js/firebaseconfig.js";

const auth = getAuth(app);
const formInput = document.getElementById("form-input");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessageEl = document.getElementById("error-message");
const bTn = document.getElementById("btn");

const loGin = async () => {
  bTn.textContent = "Signin In...";
  bTn.disabled = true;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );
    const user = userCredential.user;
    window.location.href = "../index.html";
    console.log(user);
  } catch (error) {
    console.log(error);

    if (error.code == "auth/invalid-credential") {
      errorMessageEl.textContent = "Email or password incorrect";
    } else if (error.code == "auth/invalid-email") {
      errorMessageEl.textContent = "invalid email";
    } else if (error.code == "auth/missing-password") {
      errorMessageEl.textContent = "input your password";
    }
  } finally {
    bTn.textContent = "Sign Up";
    bTn.disabled = false;
  }
};
formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  loGin();
});
