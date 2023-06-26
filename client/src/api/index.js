import axios from "axios";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../config/firebase.config";

const db = getFirestore(app);
const generateRandomId = () => {
  const timestamp = new Date().getTime();
  const randomId = `product_${timestamp}`;
  return randomId;
};

//add new Product
export const addNewProduct = async (data) => {
  try {
    const response = await axios.post(
      `https://firestore.googleapis.com/v1/projects/${process.env.REACT_APP_FIREBASE_PROJECT_ID}/databases/(default)/documents/Products`,
      {
        fields: {
          // Specify the fields and their values in the data object
          id: { stringValue: generateRandomId() },
          product_name: { stringValue: data.product_name },
          product_category: { stringValue: data.product_category },
          product_price: { stringValue: data.product_price },
          imageUrl: { stringValue: data.imageUrl },
          // Add more fields as needed
        },
      }
    );

    console.log("Data posted to Firestore:", response.data);
  } catch (error) {
    console.error("Error posting data to Firestore:", error);
  }
};

//fetch all the products from firebase
export const getAllProducts = async () => {
  try {
    const response = await axios.get(
      `https://firestore.googleapis.com/v1/projects/${process.env.REACT_APP_FIREBASE_PROJECT_ID}/databases/(default)/documents/Products?pageSize=1000`
    );

    // Extract the products from the response
    const products = response.data.documents.map((document) => {
      const product = document.fields;
      return {
        id: document.name.split("/").pop(),
        product_name: product.product_name.stringValue,
        product_price: product.product_price.stringValue,
        product_category: product.product_category.stringValue,
        imageUrl: product.imageUrl.stringValue,
        // Add more fields as needed
      };
    });

    console.log("Products fetched from Firestore:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
};

export const deleteProductById = async (productId) => {
  try {
    const queryResponse = await axios.delete(
      `https://firestore.googleapis.com/v1/projects/${process.env.REACT_APP_FIREBASE_PROJECT_ID}/databases/(default)/documents/Products/${productId}`
    );

    console.log("Product deleted from Firestore:", queryResponse.data);
  } catch (error) {
    console.error("Error deleting product from Firestore:", error);
  }
};

export const addToCart = async (userId, product) => {
  const productId = product.id;
  try {
    const cartItemsRef = collection(db, "cartItems", userId, "items");
    const querySnapshot = await getDocs(cartItemsRef);
    const existingCartItem = querySnapshot.docs.find(
      (doc) => doc.id === productId
    );

    if (existingCartItem) {
      const quantity = existingCartItem.data().quantity + 1;
      const docRef = doc(db, "cartItems", userId, "items", productId);
      await updateDoc(docRef, { quantity });
      return;
    } else {
      const data = {
        product_name: product.product_name,
        product_category: product.product_category,
        product_price: product.product_price,
        imageUrl: product.imageUrl,
        quantity: 1,
      };

      const itemDocRef = doc(db, "cartItems", userId, "items", productId);
      await setDoc(itemDocRef, data);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCartItems = async (userId) => {
  try {
    const cartItemsRef = collection(db, "cartItems", userId, "items");
    const querySnapshot = await getDocs(cartItemsRef);
    const response = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id, // Add the document ID as "id"
        ...data, // Include the rest of the document data
      };
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (userId, productId, type) => {
  console.log("UserId=", userId, "prodcutId-", productId, "type--", type);
  try {
    const cartItemsRef = collection(db, "cartItems", userId, "items");
    const querySnapshot = await getDocs(cartItemsRef);
    console.log("query Snapshot");
    console.log(querySnapshot);
    const existingCartItem = querySnapshot.docs.find(
      (doc) => doc.id === productId
    );
    console.log("Existing cart Item");
    console.log(existingCartItem);
    if (existingCartItem) {
      const { quantity } = existingCartItem.data();
      if (type === "increment") {
        const updatedQuantity = quantity + 1;
        const docRef = doc(db, "cartItems", userId, "items", productId);
        await updateDoc(docRef, { quantity: updatedQuantity });
      } else {
        if (quantity === 1) {
          const docRef = doc(db, "cartItems", userId, "items", productId);
          await deleteDoc(docRef);
        } else {
          const updatedQuantity = quantity - 1;
          const docRef = doc(db, "cartItems", userId, "items", productId);
          await updateDoc(docRef, { quantity: updatedQuantity });
        }
      }
    }

    // Get updated cart items
    const updatedSnapshot = await getDocs(cartItemsRef);
    const updatedCartItems = updatedSnapshot.docs.map((doc) => doc.data());
    return updatedCartItems;
  } catch (error) {
    console.log(error);
  }
};

export const orderItems = async (userId, cart, address) => {
  try {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += parseInt(cart[i].product_price);
    }
    const cartData = {
      userId,
      items: cart,
      address,
      status: "pending",
      total,
    }; // Append address to cartData object
    const ordersRef = collection(db, "orders");
    const docRef = await addDoc(ordersRef, cartData);
    console.log("Order added successfully with ID:", docRef.id);
    deleteCart(userId, cart).then(() => {
      console.log("Items deleted from cart of customer");
    });
  } catch (error) {
    console.error("Error adding cart to Firestore:", error);
  }
};

const deleteCart = async (userId, items) => {
  try {
    const deletePromises = items.map((data) => {
      const docRef = doc(db, "cartItems", userId, "items", data.id);
      return deleteDoc(docRef);
    });

    await Promise.all(deletePromises);
    console.log("Cart deleted successfully!");
  } catch (error) {
    console.error("Error deleting cart:", error);
  }
};
export const getAllOrder = async () => {
  try {
    const ordersRef = collection(db, "orders");
    const querySnapshot = await getDocs(ordersRef);
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orders;
  } catch (error) {
    console.log("Error fetching orders:", error);
    return [];
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
    console.log("Order status updated successfully!");
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};
