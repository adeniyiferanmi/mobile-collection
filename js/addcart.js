import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { app } from "../js/firebaseconfig.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);
const userColRef = collection(db, "users");
const containerEl = document.getElementById("container");
const priceEl = document.getElementById("price");
const pricesEl = document.getElementById("prices");
const cartBadge = document.querySelector(".zero")
const logOutEl = document.getElementById("logout")
let currentuser;

    const cartQty = async (currentuser) => {
      try {
        console.log("getting...");
        const cartColRef = collection(db, "users",currentuser,"carts")
        console.log(cartColRef);
        
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
    currentuser = user.uid;
    const cartColRef = collection(db, "users", currentuser, "carts");

    fetchCart(cartColRef);
    cartQty(currentuser)
    

  } else {
    window.location.href = "../index.html";
  }
});

const fetchCart = async (cartColRef) => {
  containerEl.innerHTML = "";
  let totalPrice = 0;
  console.log("fetching carts...");
  try {
    const querySnapShot = await getDocs(cartColRef);
    if (querySnapShot.empty) {
      containerEl.innerHTML = "<p>Your cart is empty.</p>";
      updateTotal(0);
      return;
    }
    querySnapShot.forEach((docs) => {
      console.log(docs);
      const product = docs.data();
      const price = parseFloat(product.price);
   
      let itemId = docs.id;
      const qty = parseInt(product.qty) || 1;
      const subTotal = price * qty;
         totalPrice += subTotal

      containerEl.innerHTML += `
             <div class="content">
             <img src="${product.image}">
             <div class="h1">
            <h2><a href="../html/single.html?productId=${itemId}">${
        product.name
      }</a></h2>            
             <h6 class="item-price" data-price="${price}" qty-price="${qty}">$${subTotal.toFixed(
        2
      )} </h6><br>
             </div>
            <div class="bt">
            
           
            <div>
            <button class="delete-btn" data-id="${itemId}"><span class="material-symbols-outlined">delete</span></button>
            <div>

            <button data-id="${itemId}" class="minus">-</button>
            <input type="number" value="${qty}" min="1" class="quality">
            <button data-id="${itemId}" class="plus" >+</button>
            </div>
            </div>

            </div>
            </div>
          
            `;
    });
    updateTotal();
    setupListeners(cartColRef);

    
  } catch (error) {
    console.log(error);
  } finally {
    console.log("done!");
  }
};
const updateTotal = () => {
let  total = 0
  const itemPrice= document.querySelectorAll(".item-price")
  itemPrice.forEach((item)=>{
    const dataPrice =parseFloat(item.getAttribute("data-price"))
    const qtyPrice=parseInt(item.getAttribute("qty-price"))
    total += dataPrice * qtyPrice
    item.textContent = `$${(dataPrice* qtyPrice).toFixed(2)}`
  })
  
  priceEl.textContent = `$${total.toFixed(2)}`;
  pricesEl.textContent = `$${total.toFixed(2)}`;
};
const setupListeners = (cartColRef) => {
  const plusQut = document.querySelectorAll(".plus");
  const minusQut = document.querySelectorAll(".minus");
  const qualityInput = document.querySelectorAll(".quality");
  const itemPrice = document.querySelectorAll(".item-price");

  const deleteBtn = document.querySelectorAll(".delete-btn");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const dataId = btn.getAttribute("data-id");
    
        
        try {
          
          console.log("wait");
          const docRef = doc(cartColRef, dataId);
          await deleteDoc(docRef);
          alert("Delete this cart");
          
           const item = btn.closest(".content");
           if (item) {
            item.remove()
           }
          updateTotal()
          cartQty(currentuser)
        } catch (error) {
          console.log(error);
        } finally {
          console.log("done!");
        }
      });
    });
  plusQut.forEach((btn, index) => {
    const itemsId = btn.getAttribute("data-id");
    btn.addEventListener("click", async () => {
      let input = qualityInput[index];
      let qualityValue = parseInt(input.value) + 1;
      input.value = qualityValue
      itemPrice[index].setAttribute("qty-price", qualityValue);
    

      try {
        const docRef = doc(cartColRef, itemsId);
        await updateDoc(docRef, { qty: qualityValue });
        const price = parseFloat(itemPrice[index].getAttribute("data-price"))
        itemPrice[index].textContent = `$${(price * qualityValue).toFixed(2)}`;
        updateTotal()
        cartQty(currentuser)
      } catch (error) {
        console.log(error);
      }
    });
  });
  minusQut.forEach((btn, index) => {
    const itemsId = btn.getAttribute("data-id");
    btn.addEventListener("click", async () => {
      let input = qualityInput[index];
      let qualityValue = parseInt(input.value) - 1;
      if (qualityValue < 1) {
        alert("dont go below 1")
        return
      }
      input.value = qualityValue;
      itemPrice[index].setAttribute("qty-price", qualityValue);

      try {
        const docRef = doc(cartColRef, itemsId);
        await updateDoc(docRef, { qty: qualityValue });
        const price = parseFloat(itemPrice[index].getAttribute("data-price"))
        itemPrice[index].textContent = `$${(price * qualityValue).toFixed(2)}`;
        updateTotal()
        cartQty(currentuser)
        console.log(qualityValue);
      } catch (error) {
        console.log(error);
      }
    });
  });
};


const logOut = async () => {
  console.log("logging out..")
  try {
    await signOut(auth)
  } catch (error) {
    console.log(error);
    
  }
  
}
logOutEl.addEventListener("click",logOut)