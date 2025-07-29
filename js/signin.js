import { getAuth,  createUserWithEmailAndPassword,  sendEmailVerification, } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { app } from "../js/firebaseconfig.js";

const auth = getAuth(app);
const formInput = document.getElementById("form-input")
const emailEl = document.getElementById("email")
const passWordEl = document.getElementById("password")
const errorMassageEl = document.getElementById("error-message")
const bTn = document.getElementById("btn")


const signup = async () => {
  bTn.textContent="Signin Up..."
  bTn.disabled = true
    try {
        const userCredential = await createUserWithEmailAndPassword( auth, emailEl.value, passWordEl.value)
        const user = await userCredential.user;
        console.log(user);
        console.log(passWordEl.value);
        
        
        
        await sendEmailVerification(user);
        alert("check your inbox for your email verificaton")
        console.log(user)
    window.location.href = "../html/login.html"

    } catch (error) {
      console.log(error);
      
        if (error.code == "auth/email-already-in-use") {
      errorMassageEl.textContent = "Email already in use";
    } else if (error.code == "auth/password-does-not-meet-requirements"){
      errorMassageEl.textContent =
        "Password must contain a lower case character, Password must contain an upper case character, Password must contain a non-alphanumeric character";
    } else if(error.code == "auth/network-request-failed"){
      errorMassageEl.textContent = "Error 404"
    }
    } finally{
      bTn.textContent ="Sign Up"
      bTn.disabled = false
    }

    
}
formInput.addEventListener("submit", (e) => {
   e.preventDefault()
   signup()
})