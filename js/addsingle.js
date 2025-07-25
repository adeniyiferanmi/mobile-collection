import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { app } from "../js/firebaseconfig.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);
const param = new URLSearchParams(window.location.search);
const productId = param.get("productId");
const containerEl = document.getElementById("container");
let currentuser


onAuthStateChanged(auth,async (user) => {
    if (user) {
        
        currentuser = user.uid
        console.log(user.uid);

        const cartColRef = collection(db, "users", currentuser,"carts")
        getSingleCart(cartColRef)
    } else {
        Window.location.href="../html/login.html"
    }
})

const getSingleCart=async (cartColRef) => {
    console.log("getting single cart...")
    try {
        const docRef = doc(cartColRef,productId)
        const docSnapShot = await getDoc(docRef)
        if (docSnapShot.exists()) {
      const product = docSnapShot.data();
      containerEl.innerHTML = `
            <div class="content">
            <div class="img">
            <img src="${product.image}">
            
            </div>
              <div class="text">
            <h2>${product.name}</h2>
            <div class="bt">
            <h6>$${product.price}.99</h6> <br>
            <div>
            <button>-</button>
            <input type="number" placeholder="1">
            <button>+</button>
            </div>
            </div>
            <div>
            <button class="add">Add to Cart</button>
            </div>
            <div class="icon">
            <span class="material-symbols-outlined">delivery_truck_speed</span>
            <p>Free Delivery<br>Enter your postal code for Delivery Availability</p>
            </div>
            <div class="icon">
            <span class="material-symbols-outlined">settings_backup_restore </span>
            <p>Return Delivery <br>Free 30 Days Delivery Returns. Details</p>
            </div>
            </div>
            </div>
            </div>
            `;
    } else {
    }
    } catch (error) {
        
    }
}
getSingleCart()