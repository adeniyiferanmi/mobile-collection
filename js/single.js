import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { app } from "../js/firebaseconfig.js";

const db = getFirestore(app);
const auth = getAuth(app);
const productColRef = collection(db, "products");
const userColRef = collection(db, "users");

const param = new URLSearchParams(window.location.search);
const productId = param.get("productId");
const containerEl = document.getElementById("container");
const cartBadge = document.querySelector(".zero");
const logOutEl = document.getElementById("logout");
let currentuser;

const getSingleProduct = async () => {
  console.log("fetching product...");
  console.log(productId);
  try {
    const docRef = doc(productColRef, productId);

    const docSnapShot = await getDoc(docRef);
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
            
            </div>
            </div>
           <a href="../index.html"> <button class="con">Continue Shopping</button></a>
            <div>
            <button class="add"  data-id="${productId}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart  <span><div class="spinner-border  d-none  load spinner-border-sm" role="status">
           <span class="visually-hidden">Loading...</span>
           </div></span></button>
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
    console.log(error);
  } finally {
    console.log("done!");
  }
};
getSingleProduct();

const cartQty = async (userId) => {
  try {
    console.log("getting...");
    const cartColRef = collection(db, "users", userId, "carts");
    console.log(currentuser);

    const snapShot = await getDocs(cartColRef);
    let totalQty = 0;

    snapShot.forEach((doc) => {
      const item = doc.data();
      totalQty += parseInt(item.qty);
    });
    if (totalQty > 0) {
      cartBadge.textContent = totalQty;
      cartBadge.style.display = "block";
    } else {
      cartBadge.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(userColRef, user.uid);
    const userCredential = await getDoc(docRef);
    const userId = user.uid;
    currentuser = userId;
    cartQty(currentuser);
    const addBtn = document.querySelectorAll(".add");
    addBtn.forEach((btn) => {
      const loader = btn.querySelector(".load");
      btn.addEventListener("click", () => {
        const dataId = btn.getAttribute("data-id");
        const dataImage = btn.getAttribute("data-image");
        const dataName = btn.getAttribute("data-name");
        const dataPrice = btn.getAttribute("data-price");

        const addToCart = async () => {
          console.log("adding...");
          loader.classList.remove("d-none");
          try {
            console.log(currentuser);
            const cartColRef = collection(userColRef, currentuser, "carts");
            console.log(cartColRef);

            const docSnapShot = await addDoc(cartColRef, {
              name: dataName,
              image: dataImage,
              price: parseFloat(dataPrice),
              qty: 1,
            });

            console.log();
            if (docSnapShot) {
              alert(`Added to cart! Cart Item ID: ${dataId}`);
              cartQty(currentuser);
              // alert("added successfully");
            } else {
              alert("no item found");
            }
          } catch (error) {
            console.log(error);
          } finally {
            console.log("done!");
            loader.classList.add("d-none");
          }
        };
        addToCart();
      });
    });
  } else {
    window.location.href = "../html/open.html";
    cartBadge.style.display = "none";
  }
  console.log(currentuser);
});

const logOut = async () => {
  console.log("logging out..");
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
logOutEl.addEventListener("click", logOut);
