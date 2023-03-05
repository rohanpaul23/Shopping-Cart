import React from "react";
import "./singleitem.css";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { CartState } from "../ContextData";

const SingleItem = ({ product }) => {
  const {
    state: { cart },
    dispatch
  } = CartState();

  console.log(cart);

  return (
    <div className="product">
      <div className="product_img">
        <img src={product.image} alt="Product" />
      </div>
      <div className="product_details">
        <div className="product_name">{product.name}</div>
        <div className="product_price">
          <span>
            <BiRupee />
          </span>
          {product.price}
        </div>
        <div className="product_ratings">
          {[...Array(5)].map((_, i) => (
            <span key={i} onClick={() => {}}>
              {product.ratings > i ? (
                <AiFillStar fontSize="15px" />
              ) : (
                <AiOutlineStar fontSize="15px" />
              )}
            </span>
          ))}
        </div>
        <div className="product_delivery">
          {product.fastDelivery ? (
            <div>Fast Delivery</div>
          ) : (
            <div>4 days delivery</div>
          )}
        </div>
      </div>
      <div className="add_cart">
        {cart.some(p => p.id === product.id) ? (
          <Button
            variant="danger"
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: product
              })
            }
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: product
              })
            }
            disabled={!product.inStock}
          >
            {!product.inStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
