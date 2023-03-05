import React, { useState, useEffect } from "react";
import "./cart.css";
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  Container
} from "react-bootstrap";
import { CartState } from "../ContextData";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    state: { cart },
    dispatch
  } = CartState();

  const [total, setTotal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(cart);
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const goToProductsList = () => {
    navigate("/");
  };

  const getOptions = product => {
    let length = parseInt(product.inStock);
    let options = [];
    for (let i = 0; i < length; i++) {
      options.push(<option key={i + 1}>{i + 1}</option>);
    }
    return options;
  };

  return (
    <div className="totalCart">
      <div className="cartDetails">
        <ListGroup className="list-group ">
          {cart.map(prod => (
            <ListGroup.Item className="list-group-item" key={prod.id}>
              <Container fluid="md">
                <Row md={4}>
                  <Col md={2}>
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col md={2}>₹ {prod.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={prod.qty}
                      onChange={e =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: prod.id,
                            qty: e.target.value
                          }
                        })
                      }
                    >
                      {getOptions(prod)}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
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
                  </Col>
                </Row>
              </Container>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="checkout">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <div className="action_buttons">
          <Button type="button" disabled={cart.length === 0}>
            Proceed to Checkout
          </Button>
          <Button type="button" onClick={() => goToProductsList()}>
            Back to products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
