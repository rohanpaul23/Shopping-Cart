import React from "react";
import { faker } from "@faker-js/faker";
import { createContext, useContext, useReducer } from "react";
import { cartReducer, productsReducer } from "./Reducers.js";

const Cart = createContext();

faker.seed(99); // Only renders one type of data, doesn't change on every render

const ContextData = ({ children }) => {
  // Creates an array of 50 items and add random data
  const products = [...Array(50)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.fashion(200, 200, true),
    inStock: faker.random.numeric(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.numeric()
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: []
  });

  const [productsState, productsDispatch] = useReducer(productsReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: ""
  });

  return (
    <Cart.Provider value={{ state, dispatch, productsState, productsDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default ContextData;

export const CartState = () => {
  return useContext(Cart);
};
