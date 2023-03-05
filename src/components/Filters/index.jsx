import React from "react";
import "./filters.css";
import Form from "react-bootstrap/Form";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { CartState } from "../ContextData";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending
} from "react-icons/ai";

import { SiFastapi } from "react-icons/si";

const Filters = () => {
  const {
    productsDispatch,
    productsState: { byStock, byFastDelivery, sort, byRating }
  } = CartState();

  console.log(sort, byStock, byFastDelivery, byRating);

  const ratings = [0, 1, 2, 3, 4];

  const getPayload = i => {
    console.log(i);
    return i;
  };

  return (
    <div className="filter_section">
      <div className="title">Filter Products</div>
      <div>
        <Form.Check
          inline
          label="Sort by name"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productsDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh"
            })
          }
          checked={sort === "lowToHigh"}
        />
        <AiOutlineSortAscending />
      </div>

      <div>
        <Form.Check
          inline
          label="Sort by name"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productsDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow"
            })
          }
          checked={sort === "highToLow"}
        />
        <AiOutlineSortDescending />
      </div>
      <div>
        <Form.Check
          inline
          label="Fast Delivery"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            productsDispatch({
              type: "FILTER_BY_DELIVERY"
            })
          }
          checked={byFastDelivery}
        />
        <SiFastapi />
      </div>
      <div>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        {ratings.map(i => (
          <span
            key={i}
            onClick={() =>
              productsDispatch({
                type: "FILTER_BY_RATING",
                payload: getPayload(i + 1)
              })
            }
          >
            {byRating > i ? (
              <AiFillStar fontSize="15px" />
            ) : (
              <AiOutlineStar fontSize="15px" />
            )}
          </span>
        ))}
      </div>
      <div>
        <Button
          variant="light"
          onClick={() =>
            productsDispatch({
              type: "CLEAR_FILTERS"
            })
          }
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
