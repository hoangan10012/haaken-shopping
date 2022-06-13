
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  addDoc,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import * as firebase from 'firebase/app'
import {Product} from'../models/product.model'



const firebaseConfig = {
  apiKey: "AIzaSyDR6ZinhTJKK-Ju5ug9GJgWXWyTN__khDs",
  authDomain: "haaken-shop.firebaseapp.com",
  projectId: "haaken-shop",
  storageBucket: "haaken-shop.appspot.com",
  messagingSenderId: "241499310386",
  appId: "1:241499310386:web:9cefd22b16b22b2394ef2b",
  measurementId: "G-3Q9X8HYGX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app);
const storage = getStorage(app);

// const addProduct =async (product={}) => {
//   try{
//     await addDoc(collection(db,"products"),product);
//   }catch(err:any){
//     console.error(err);
//     alert(err.message);
//   }
// }
export {
  auth,
  db,
  storage,
}
export async function getProducts():Promise<Product[]>{
  const proCall = await getDocs(collection(db, "products"));
  const products=[];
  for(const doc of proCall.docs){
    products.push({
      ...doc.data(),
      id:doc.id,
    })
  }
return products as unknown as Product[];
}
export async function productById(id:string):Promise<Product|null> {
  // const snap = await getDoc(doc(db, 'products', id))
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data())
    return {id:docSnap.id,...docSnap.data()}  as unknown as Product; 
}
