"use client";

import { useEffect } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../Components/Home/ListItemsByTypeSection";
import { setSelectedCategorie, setSelectedCollection } from "../Redux/Slices/filtersSlice";
import { AppDispatch, RootState } from "../Redux/store";

interface FilterProps {
  onChange: (filters: string) => void;
}

export function Filter({}: FilterProps) {
  const filters = useSelector((state: RootState) => state.filters);

  const dispatch = useDispatch<AppDispatch>();

  const collectionsSet = Array.from(
    new Set(allProducts.map((item) => item.collection))
  );


  const onCollectionChange = (col: string) => {
    dispatch(setSelectedCollection(col));
  };

  const onCategorieChange = (cat: string) => {
    dispatch(setSelectedCategorie(cat));
  };

  // const onPriceRangeChange = (value) => {

  //   console.log(value)
  // }

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* Collections */}
      <div>
        <h3 className="font-semibold mb-2">Collections</h3>
        <ul className="space-y-1">
          <li>
            <label>
              <input
                type="radio"
                name="collection"
                onChange={() => {
                  onCollectionChange("all");
                }}
              />{" "}
              All
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="collection"
                onChange={() => {
                  onCollectionChange("trending");
                }}
              />{" "}
              Trending
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="collection"
                onChange={() => {
                  onCollectionChange("best sellers");
                }}
              />{" "}
              Best sellers
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="collection"
                onChange={() => {
                  onCollectionChange("new");
                }}
              />{" "}
              New arrivals
            </label>
          </li>

          {collectionsSet.map((c) => (
            <li key={c}>
              <label>
                <input
                  type="radio"
                  name="collection"
                  onChange={() => {
                    onCollectionChange(c);
                  }}
                />{" "}
                {c}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="space-y-1">
          <li>
            <label>
              <input
                type="radio"
                name="cat"
                onChange={() => {
                  onCategorieChange("Hoodie");
                }}
              />{" "}
              Hoodies
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="cat"
                onChange={() => {
                  onCategorieChange("Jersey");
                }}
              />{" "}
              Jerseys
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="cat"
                onChange={() => {
                  onCategorieChange("T-Shirt");
                }}
              />{" "}
              T-Shirts
            </label>
          </li>
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-2">Price</h3>
        <RangeSlider min={10} max={100} defaultValue={[15, 70]} onInput={(val) => {
          console.log(val)
        }}/>
        <div className="flex justify-between text-sm text-gray-500">
          <span>$0.00</span>
          <span>$120.00</span>
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-semibold mb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className="border px-2 py-1 text-sm rounded hover:bg-gray-100"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
