import React, { useState } from "react";
import "./TrendEditModal.css";

interface Props {
  trend: any;
  onClose: () => void;
  onSave: (trend: any) => void;
}

const TrendEditModal: React.FC<Props> = ({ trend, onClose, onSave }) => {
  const [products, setProducts] = useState(trend.products);
  const trendName = trend.TrendName || trend.trendname || trend.name || "trend";

  const removeProduct = (id: string) => {
    setProducts((prev: any) => prev.filter((p: any) => p._id !== id));
  };

  const handleSave = () => {
    onSave({ ...trend, products });
  };

  return (
    <div className="trend-edit-overlay">
      <div className="trend-edit-modal">
        <div className="trend-edit-header">
          <div>
            <span>Edit trend</span>
            <h3>{trendName}</h3>
          </div>
          <button onClick={onClose} aria-label="Close edit modal">
            x
          </button>
        </div>

        <div className="trend-edit-products">
          {products.length === 0 ? (
            <div className="trend-edit-empty">No products left in this trend.</div>
          ) : (
            products.map((product: any) => (
              <div key={product._id} className="trend-edit-product">
                <div>
                  <strong title={product.name}>{product.name}</strong>
                  <span>Rs {product.mrp ?? product.price ?? "-"}</span>
                </div>
                <button onClick={() => removeProduct(product._id)}>Remove</button>
              </div>
            ))
          )}
        </div>

        <div className="trend-edit-actions">
          <button onClick={onClose} className="trend-edit-cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="trend-edit-save">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendEditModal;
