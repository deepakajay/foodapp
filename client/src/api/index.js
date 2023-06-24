import axios from "axios";

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

export const getAllUsers = async () => {};
