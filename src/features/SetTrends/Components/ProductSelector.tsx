import React, { useState } from "react";
import "./ProductSelector.css";

interface Props {
  addProduct: (product: any) => void;
}

const dummyProducts = Array.from({ length: 20 }).map((_, i) => ({
  _id: i.toString(),
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 500),
}));

const ProductSelector: React.FC<Props> = ({ addProduct }) => {
  const [search, setSearch] = useState("");

  const filtered = dummyProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="product-selector">
      <h3>Select Products</h3>

      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-list">
        {filtered.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => addProduct(product)}
          >
            <div>
              <h4>{product.name}</h4>
              <p>₹ {product.price}</p>
            </div>
            <button>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;
