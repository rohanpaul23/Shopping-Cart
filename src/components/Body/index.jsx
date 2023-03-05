import React, { useEffect, useState } from "react";
import "./body.css";
import { CartState } from "../ContextData";
import SingleItem from "../SingleItem";
import Filters from "../Filters";

const Body = () => {
  const {
    state: { products },
    productsState: { sort, byFastDelivery, byRating, searchQuery },
    productsDispatch
  } = CartState();

  console.log(JSON.stringify(byRating));

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    productsDispatch({
      type: "FILTER_BY_SEARCH",
      payload: debouncedSearchTerm
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const filteredProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter(prod => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(prod => prod.ratings >= byRating);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter(prod =>
        prod.name.includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="body">
      <div className="filters">
        <Filters />
      </div>
      <div className="items_container">
        <div>
          <input
            className="search_bar"
            type="search"
            placeholder="Search an item"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="all_items">
          {filteredProducts().map(product => {
            return <SingleItem product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

// Hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export default Body;
