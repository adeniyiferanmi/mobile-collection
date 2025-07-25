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
  deleteDoc
  
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

const userColRef = collection(db, "users");
const logOutEl = document.getElementById("logout");
const containerEl = document.querySelector(".container");
const priceEl = document.getElementById("price");
const pricesEl = document.getElementById("prices");
const inputEl = document.getElementById("input");
const cartBadge = document.getElementById("zero");
const formInput = document.getElementById("form-input");
const inputRef = document.getElementById("text")
const loader = document.querySelector(".load")
const bTn = document.getElementById("btn")


let currentuser;
let price;
let totalPrice = 0;
let totalQty = 0

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(userColRef, user.uid);
    const userCredential = await docRef;
    currentuser = userCredential.id;
    console.log(currentuser);

    const getCarts = async () => {
      console.log("getting...");
      try {
        const cartColRef = collection(userColRef, currentuser, "carts");
        const docSnapShot = await getDocs(cartColRef);
        
        docSnapShot.forEach((docs) => {
          const product = docs.data();
          price = parseFloat(product.price);
          const qty = parseInt(product.qty) || 1;
          totalQty += parseInt(product.qty);

          const subTotal = price * qty;

          totalPrice += subTotal;
          console.log(totalPrice);

          containerEl.innerHTML += `
        <div class="content">
        
        <h3>${product.name}</h3>
        <p class="item-price" data-price="${price}" data-qty="${qty}">${qty} x $${price.toFixed(
            2
          )}</p>
        </div>
        `;
        });
      } catch (error) {
        console.log(error);
      }
      priceEl.textContent = `$${totalPrice.toFixed(2)}`;
      pricesEl.textContent = `$${totalPrice.toFixed(2)}`;
      inputEl.value = `${totalPrice.toFixed(2)}`;
      cartBadge.textContent=`${totalQty}`
    };
    getCarts();
    
    const paymentEl = async () => {
      bTn.textContent = "loading..."
      bTn.disabled = true
      try {
        let array =[]
        const cartColRef = collection(userColRef,currentuser,"carts")
        const docSnapShot = await getDocs(cartColRef)
        docSnapShot.forEach((docs) => {
          item =  docs.data()
          array.push({
            itemName : item.name,
            itemPrice:item.price,
            itemQty:item.qty
          })
          console.log(item);
        });
      
        const  orderColRef = collection (userColRef,currentuser,"orders")
        await addDoc (orderColRef,{
         name : array,
         cardHolder:inputRef.value

        })
          const carTdEL  = await getDocs(cartColRef)
        for( const cc of carTdEL.docs ){
          await deleteDoc (doc(cartColRef, cc.id))
        }
        if (!carTdEL) {
          alert("payment not successful")
        } else {
          window.location.href="../html/index.html"
        }
        
      } catch (error) {
        console.log(error);
        
      }
      finally{
        bTn.textContent = "Pay"
        bTn.disabled = true
        alert("Payment successful")  
      }
      
    }
  formInput.addEventListener("submit",(e)=>{
e.preventDefault()
             
paymentEl()
})
  } else {
    window.location.href = "../html/open.html";
  }
});
const logOut = async () => {
  console.log("logging out...");
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
logOutEl.addEventListener("click", logOut);


