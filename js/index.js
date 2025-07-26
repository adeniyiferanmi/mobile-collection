import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { app } from "../js/firebaseconfig.js'";
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

const productColRef = collection(db, "products");
const userColRef = collection(db, "users");
const sectionEl = document.getElementById("section1");
const cartBadge = document.querySelector(".zero");
const logOutEl = document.getElementById("logout");
const historyEl = document.querySelector(".slid");
const totalEl = document.querySelector(".total");
const bTn = document.getElementById("btn");
let mobileId;
let productItem;
let currentuser;
let price;
let prIce;

const getProduct = async () => {
  console.log("fetching products...");
  try {
    const querySnapShot = await getDocs(productColRef);

    querySnapShot.forEach((docs) => {
      const product = docs.data();
      price = parseFloat(product.price);

      sectionEl.innerHTML += `
            <div class="content">
            <img src="${product.image}">
            <h2>${product.name}</h2>
            <h5>${product.category}</h5>
            <p>${product.description}</p>
            <div class="bt">
            <h6>$${price.toFixed(2)}</h6> <br>
            <div>

            </div>
            </div>
            <div>
            <button class="add"  data-id="${docs.id}" data-name="${
        product.name
      }" data-price="${product.price}" data-image="${
        product.image
      }">Add to Cart <span><div class="spinner-border  d-none  load spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div></span></button>
            <button class="view"><a href="../html/single.html?productId=${
              docs.id
            }">View Details</a></button>
            </div>
            </div>
            `;
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("done!");
  }
};

getProduct();

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
          btn.textContent = "Adding...";
          btn.disabled = true;
          loader.classList.remove("d-none");
          try {
            console.log(currentuser);
            const cartColRef = collection(userColRef, currentuser, "carts");

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
            } else {
              alert("no item found");
            }
          } catch (error) {
            console.log(error);
          } finally {
            btn.textContent = "Add to Cart";
            btn.disabled = false;
            loader.classList.add("d-none");
          }
        };
        addToCart();
      });
    });

    const getHistory = async () => {
      let totalPricE = 0;
      console.log(currentuser);
      try {
        const orderColRef = collection(userColRef, userId, "orders");
        const snapShots = await getDocs(orderColRef);
        snapShots.forEach((doc) => {
          const item = doc.data();
          const document = item.name;
          document.forEach((order) => {
            prIce = parseFloat(order.itemPrice);
            const qty = parseInt(order.itemQty);
            totalPricE += prIce * qty;
            historyEl.innerHTML += `
            <div>
            <h6>${order.itemName}</h6>
            <p>$${order.itemPrice} x ${order.itemQty}</p>
            </div>
            `;
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    historyEl.addEventListener("click", getHistory());
  } else {
    window.location.href = "../html/open.html";
    cartBadge.style.display = "none";
  }
  console.log(currentuser);
});

const toggleMenu = () => {
  historyEl.classList.toggle("gle");
};
bTn.addEventListener("click", toggleMenu);
const logOut = async () => {
  logOutEl.textContent ="Logging Out..."
  logOutEl.disabled =true
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  } finally{
    logOutEl.textContent = "LogOut"
    logOutEl.disabled= false
  }
};
logOutEl.addEventListener("click", logOut);
