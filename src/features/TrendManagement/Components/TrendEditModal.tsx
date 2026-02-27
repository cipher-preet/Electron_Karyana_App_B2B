import React, { useState } from "react";
import "./TrendEditModal.css";

interface Props {
  trend: any;
  onClose: () => void;
  onSave: (trend: any) => void;
}

const TrendEditModal: React.FC<Props> = ({ trend, onClose, onSave }) => {
  const [products, setProducts] = useState(trend.products);

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter((p: any) => p._id !== id));
  };

  const handleSave = () => {
    onSave({ ...trend, products });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit {trend.name}</h3>

        {products.map((product: any) => (
          <div key={product._id} className="modal-product">
            <span>{product.name}</span>
            <button onClick={() => removeProduct(product._id)}>
              Remove
            </button>
          </div>
        ))}

        <div className="modal-actions">
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendEditModal;