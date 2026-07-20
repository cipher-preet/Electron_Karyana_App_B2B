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
  const getProductImage = (product: any) => {
    if (Array.isArray(product.images)) return product.images[0] ?? "";
    return product.images || "";
  };

  return (
    <aside className="trend-selected-panel">
      <div className="trend-selected-header">
        <div>
          <span>Step 3</span>
          <h3>Selected Products</h3>
        </div>
        <strong>{products.length}</strong>
      </div>

      {products.length === 0 && (
        <div className="trend-selected-empty">
          Pick products from the list to build this trend.
        </div>
      )}

      {products.map((product) => (
        <div key={product._id} className="trend-selected-item">
          <span className="trend-selected-image">
            {getProductImage(product) ? (
              <img src={getProductImage(product)} alt={product.name} />
            ) : (
              product.name?.charAt(0) || "P"
            )}
          </span>
          <div>
            <h4>{product.name}</h4>
            <p>Rs {product.mrp ?? product.price ?? "-"}</p>
          </div>
          <button onClick={() => removeProduct(product._id)}>Remove</button>
        </div>
      ))}
    </aside>
  );
};

export default SelectedProductsPanel;
