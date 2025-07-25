import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { app } from "../js/firebaseconfig.js";
// const auth = getAuth(app)
const db = getFirestore(app)
const colRef = collection(db,"products")


const addEl = document.getElementById("add")


const mobiles = [
  {
    name: "Apple MacBook Air (M4, 2025)",
    category: "Laptop",
    price: 999,
    description: "Fanless M4 chip, excellent battery life, ultra-portable 13\" design.",
    image: "https://images.moneycontrol.com/static-mcnews/2025/01/20250104061547_MacBook-Ai.jpeg?impolicy=website&width=1280&height=720"
  },
  {
    name: "Microsoft Surface Laptop 7",
    category: "Laptop",
    price: 1299,
    description: "15h battery, elegant 2.5 lb build, OLED touchscreen.",
    image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/surface-laptop-7th-edition-color-og-twitter-image?scl=1"
  },
  {
    name: "Dell XPS 16 (9640)",
    category: "Laptop",
    price: 1699,
    description: "Intel Ultra CPU, RTX GPU, premium OLED display.",
    image: "https://i.pcmag.com/imagery/reviews/04x4MxMTbqOwi2Q7Q1e5V6K-1..v1708123401.jpg"
  },
  {
    name: "Asus Zenbook A14 (2025)",
    category: "Laptop",
    price: 1099,
    description: "Under 1 kg, 16h battery, vibrant OLED screen.",
    image: "https://s.yimg.com/ny/api/res/1.2/yfhNrXs77na48NkB5It8_Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03MjA-/https://s.yimg.com/os/creatr-uploaded-images/2025-01/63e38c11-cd1c-11ef-b60f-95ca517aff13"
  },
  {
    name: "Framework Laptop 13 (2025)",
    category: "Laptop",
    price: 1099,
    description: "Modular and upgradable, DIY‑friendly support.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3kse6p_K51BaSybIXH_BNgK1zFpSgzgtyqw&s"
  },

  {
    name: "iPhone 14 Pro Max",
    category: "Smartphone",
    price: 1399,
    description: "6.7‑inch OLED, A16 Bionic, pro‑grade triple camera.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHGyVFhr1rOK0HRYfIh_EBKSP_hNai3wPu5g&s"
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    category: "Smartphone",
    price: 1299,
    description: "6.8‑inch AMOLED, Snapdragon 8 Gen 2, 200MP camera.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDkGyH3xlsO0Mqr8fKw-veYiPU02Svs9IYwA&s"
  },
  {
    name: "Xiaomi 13 Pro",
    category: "Smartphone",
    price: 899,
    description: "Leica camera suite, Snapdragon 8 Gen 2, 120W charging.",
    image: "https://techmall.com.ng/wp-content/uploads/2024/07/Redmi-Note-13-Pro-5g-1200x1200.jpg"
  },
  {
    name: "Google Pixel 8 Pro",
    category: "Smartphone",
    price: 999,
    description: "Tensor G3 chip, AI-enhanced camera, 6.7\" OLED.",
    image: "https://stratanetworks.com/wp-content/uploads/2023/12/Google-8-Pro-Porcelain.png"
  },
  {
    name: "OnePlus 12",
    category: "Smartphone",
    price: 799,
    description: "Snapdragon 8 Gen 2, Hasselblad cameras, 120Hz AMOLED.",
    image: "https://image01.oneplus.net/media/202405/28/b96848b7acd10dafde32203d12f6fea7.png?x-amz-process=image/format,webp/quality,Q_80"
  },
  {
    name: "Redmi Note 13 Pro",
    category: "Smartphone",
    price: 349,
    description: "Snapdragon 7s Gen 2, 200MP main cam, 120Hz display.",
    image: "https://cdn.webshopapp.com/shops/256009/files/457211156/xiaomi-xiaomi-redmi-note-13-pro-4g-8gb-256gb.jpg"
  },
  {
    name: "Infinix Zero 30",
    category: "Smartphone",
    price: 299,
    description: "108MP camera, 144Hz AMOLED, 5000mAh battery.",
    image: "https://cdn.kalvo.com/uploads/img/gallery/56437-infinix-zero-30-4g-1.jpg"
  },
  {
    name: "Samsung Galaxy A54",
    category: "Smartphone",
    price: 399,
    description: "120Hz Super AMOLED, Exynos 1380, IP67 rating.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhaiRb45JLL81qov99s3Z1XX8AS1ubLPjymw&s"
  },
  {
    name: "Google Pixel 7a",
    category: "Smartphone",
    price: 499,
    description: "Tensor G2 chip, wireless charging, compact size.",
    image: "https://mtech4u.com/cdn/shop/files/Google_Pixel_7_A_grande.webp?v=1736858970"
  },
  {
    name: "Motorola Edge 40",
    category: "Smartphone",
    price: 499,
    description: "144Hz OLED, IP68, 68W charging.",
    image: "https://m.media-amazon.com/images/I/51k0c6YBLTL._AC_SL1000_.jpg"
  },
  {
    name: "Tecno Camon 30 Pro",
    category: "Smartphone",
    price: 279,
    description: "Dimensity 8200 Ultra, 120Hz AMOLED, 50MP camera.",
    image: "https://m.media-amazon.com/images/I/81FA5OhbEcL._AC_SL1500_.jpg"
  },
  {
    name: "Nokia G60",
    category: "Smartphone",
    price: 249,
    description: "Clean Android, 50MP camera, 120Hz LCD.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSttJiAzbiWzNL3cNREqDXRXdt9UoV7ERISqw&s"
  },
  {
    name: "Motorola Moto G Stylus 5G",
    category: "Smartphone",
    price: 249,
    description: "Stylus support, 50MP camera, 5000mAh battery.",
    image: "https://www.techspecs.info/_next/image/?url=https%3A%2F%2Fwww.techspecs.info%2Fuploads%2FMotorola_Moto_G_Stylus_5_G_2024_Specifcation_becff59516.jpg&w=256&q=75"
  },
  {
    name: "Infinix Note 30",
    category: "Smartphone",
    price: 209,
    description: "Helio G99, 45W charging, large display.",
    image: "https://images-cdn.ubuy.co.in/66056b942022820eb524257d-infinix-note-30-5ggold-256-gb8-gb.jpg"
  },
  {
    name: "Xiaomi 12T Pro",
    category: "Smartphone",
    price: 599,
    description: "Snapdragon 8+ Gen 1, 200MP camera, 120W fast charge.",
    image: "https://images-cdn.ubuy.qa/63bd465b91f45832fe63d812-xiaomi-12t-pro-5g-4g-lte-256gb.jpg"
  },

  {
    name: "AirPods Pro (2nd Gen)",
    category: "Earphone",
    price: 249,
    description: "ANC, spatial audio, MagSafe charging case.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq-H2Avq9clpkI0OoLdEQnj18ytCwC54H71g&s"
  },
  {
    name: "Samsung Galaxy Buds2 Pro",
    category: "Earphone",
    price: 229,
    description: "Hi-Fi sound, ANC, 360 Audio.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5GOqzqgMT2kKKm-ugoNzOlhxhdWygfMEkDw&s"
  },
  {
    name: "Sony WH-1000XM5",
    category: "Headphone",
    price: 399,
    description: "Class-leading ANC, 30h battery, LDAC support.",
    image: "https://www.sony.com/image/6539959b6c50b04c5cec4e23134c1137?fmt=pjpeg&wid=1014&hei=396&bgcolor=F1F5F9&bgc=F1F5F9"
  },
  {
    name: "Google Pixel Buds Pro",
    category: "Earphone",
    price: 199,
    description: "Noise cancelling, long battery life.",
    image: "https://lh3.googleusercontent.com/MP4ymmRItYWpJsY0cjGQfkR38WYCvrqGWv8PF-sOJQwK0A9oM2u0sr-BKD2kq_SxImwincyudgTwJRiNF5UofQwXT0IljAXKq-Zm=rw-e365-w1200"
  },
  {
    name: "JBL Tune 230NC TWS",
    category: "Earphone",
    price: 99,
    description: "Active noise cancelling, deep bass.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2vpc43n75KoClT6Xcd812QW-4xBDaTJe00g&s"
  },
  {
    name: "OnePlus Nord Buds 2",
    category: "Earphone",
    price: 59,
    description: "ANC, BassWave enhancement, 12.4mm drivers.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTx5X7a9MfTvGL8-tFVyKvrAzYp6JpWNgRyQ&s"
  },
  {
    name: "Realme Buds Air 5",
    category: "Earphone",
    price: 49,
    description: "ANC, 12.4mm drivers, Bluetooth 5.3.",
    image: "https://rukminim2.flixcart.com/image/704/844/xif0q/headphone/1/x/j/-original-imagsgfbgrfhy7vm.jpeg?q=90&crop=false"
  },
  {
    name: "Beats Studio Buds+",
    category: "Earphone",
    price: 149,
    description: "Balanced sound, sweat‑resistant, Apple H1 chip.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWuczzA8Y-HjAkjsraq1fWXHtaviePWV3SZg&s"
  },
  {
    name: "Bose QC Earbuds II",
    category: "Earphone",
    price: 279,
    description: "Deep customisable noise cancelling.",
    image: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Bose_QuietComfort_Earbuds_II_aptX_Update51.jpg"
  },
  {
    name: "Sennheiser Momentum 4 Wireless",
    category: "Headphone",
    price: 349,
    description: "Premium ANC, 60h battery, luxurious build.",
    image: "https://m.media-amazon.com/images/I/71sLOtsK2UL._AC_SL1500_.jpg"
  },
  {
    name: "Anker PowerCore 10000mAh",
    category: "Power Bank",
    price: 35,
    description: "Fast charging, USB‑A and USB‑C outputs.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5V11lgQ-rT7Y4uO-ZPHKG3G2rWLe4LOBulQ&s"
  },
  {
    name: "Anker PowerCore 20000mAh",
    category: "Power Bank",
    price: 45,
    description: "High-speed charging, multiple ports.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROLuN2kLvGFj4pIeGFoiuB1wLcrGgMbsR5GA&s"
  },
  {
    name: "Oraimo 10000mAh Power Bank",
    category: "Power Bank",
    price: 28,
    description: "LED display, dual port.",
    image: "https://www.3chub.com/cdn/shop/files/oraimo_92fc9b2a-329e-44a8-9ee5-c1e4fa891f4b.jpg?v=1715874897&width=1946"
  },
  {
    name: "MagSafe Wireless Charger",
    category: "Charger",
    price: 49,
    description: "Official magnetic Qi charger for iPhone.",
    image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/48/2287833/1.jpg?5119"
  },
  {
    name: "Baseus 15W Wireless Charger",
    category: "Accessory",
    price: 29,
    description: "Qi pad for fast wireless charging.",
    image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/34/3823932/1.jpg?5546"
  },
  {
    name: "Amazon Basics USB-C to Lightning 2 m",
    category: "Accessory",
    price: 12,
    description: "Braided 2 m cable for iPhone.",
    image: "https://m.media-amazon.com/images/I/41A9vyNxj7L._UF894,1000_QL80_.jpg"
  },
    {
    name: "Amazon Basics USB-C to Lightning 2 m",
    category: "Accessory",
    price: 12,
    description: "Braided 2 m cable for iPhone.",
    image: "https://m.media-amazon.com/images/I/41A9vyNxj7L._UF894,1000_QL80_.jpg"
  },
  {
    name: "UGREEN USB-C to USB-C Cable 1 m",
    category: "Accessory",
    price: 10,
    description: "Durable nylon cable for fast charging.",
    image: "https://eu.ugreen.com/cdn/shop/products/ugreen-usb-c-cable-3a-fast-charging-usb-to-type-c-lead-nylon-braided-970807.png?v=1697187414"
  },
  {
    name: "Spigen Tough Armor Case (iPhone 13)",
    category: "Accessory",
    price: 19,
    description: "Rugged TPU case with air cushion protection.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_mp-1SWUbdgufSlsjAiUZe7IkxJqACvb7EA&s"
  },
  {
    name: "Apple Watch SE (2nd Gen)",
    category: "Smartwatch",
    price: 249,
    description: "Lightweight fitness watch with heart-rate sensor.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-a79ZyUv_FmUMsfFAmmEW6AfUu2k9XOmaCw&s"
  },
  {
    name: "Samsung Galaxy Watch 6",
    category: "Smartwatch",
    price: 399,
    description: "Super AMOLED screen, Wear OS, health apps.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6sbuWnjcnhKgAkGQepK6wW3MASSfYz9ChJQ&s"
  },
  {
    name: "Fitbit Versa 4",
    category: "Smartwatch",
    price: 179,
    description: "Lightweight fitness tracker with GPS.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNOY4i8Y97fxJrvWzChP9zj7-6LqNFIcGvQ&s"
  },
  {
    name: "Garmin Forerunner 265",
    category: "Smartwatch",
    price: 399,
    description: "GPS running watch, AMOLED display.",
    image: "https://cdn.shoplightspeed.com/shops/622630/files/58863603/800x1024x2/garmin-forerunner-265.jpg"
  },
  {
    name: "Amazfit Bip 5",
    category: "Smartwatch",
    price: 119,
    description: "Long battery life, health features, budget price.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3cpqRbAffEZPvUKkXyNy2rG5Ig6_ln2yeEg&s"
  }
];



 const addProduct = async () => {
    console.log("adding products....");
    try {
      for (const product of mobiles) {
      const docRef = await addDoc(colRef, product);
      console.log("Added:", docRef.id);
        // const docRef = await addDoc(colRef,mobiles)
        // console.log(docRef);
      }
    } catch (error) {
        console.log(error);
    } finally{
        console.log("done!");
    }
    
 }
 addEl.addEventListener("click", addProduct)