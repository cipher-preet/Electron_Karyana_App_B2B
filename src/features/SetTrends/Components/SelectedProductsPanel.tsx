import React from "react";
import "./SelectedProductsPanel.css";

interface Props {
  products: any[];
  removeProduct: (id: string) => void;
}

const SelectedProductsPanel: React.FC<Props> = ({
  products,
  removeProduct,
}) => {
  return (
    <div className="selected-panel">
      <h3>Selected Products ({products.length})</h3>

      {products.length === 0 && (
        <p className="empty-text">No products selected</p>
      )}

      {products.map((product) => (
        <div key={product._id} className="selected-item">
          <div>
            <h4>{product.name}</h4>
            <p>₹ {product.mrp}</p>
          </div>
          <button onClick={() => removeProduct(product._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default SelectedProductsPanel;
