"use client";
import React from "react";
import { allProducts } from "../Home/ListItemsByTypeSection";
import ItemsLister from "../Common/ItemsLister";

const itemsToList = allProducts.filter((item) => item.collectionId === 1);

const ItemsGrid = () => {

  return (
    <section>
      <ItemsLister title="The Joker Collection" items={itemsToList} />
    </section>
  );
};

export default ItemsGrid;
