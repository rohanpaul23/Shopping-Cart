import React from "react";
import "./header.css";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Badge, Button, Dropdown } from "react-bootstrap";
import { CartState } from "../ContextData";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const {
    state: { cart },
    dispatch
  } = CartState();
  const navigate = useNavigate();

  const gotToCart = () => {
    navigate("/cart");
  };
  return (
    <div className="header_items">
      <div className="logo">Shopping cart</div>
      <div className="cart">
        <Dropdown>
          <Dropdown.Toggle>
            <FaShoppingCart color="white" fontSize="25px" />
            <Badge>{cart.length}</Badge>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: 370 }}>
            {cart.length > 0 ? (
              <>
                {cart.map(prod => (
                  <span className="cartitem" key={prod.id}>
                    <img
                      src={prod.image}
                      className="cartItemImg"
                      alt={prod.name}
                    />
                    <div className="cartItemDetail">
                      <span>{prod.name}</span>
                      <span>₹ {prod.price.split(".")[0]}</span>
                    </div>
                    <Tooltip title="Remove from cart">
                      <IconButton>
                        <AiFillDelete
                          fontSize="20px"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod
                            })
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </span>
                ))}
                <div className="cart_button">
                  <Button onClick={() => gotToCart()}>Go To Cart</Button>
                </div>
              </>
            ) : (
              <span style={{ padding: 10 }}>Cart is Empty!</span>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
