import React from "react";
import { Product } from "../../../../shared/types/types";
import "./ProductCard.css";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onEdit }) => {
  return (
    <div className="product-card professional">
      <div className="card-left">
        <div className="product-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </div>
      </div>

      <div className="card-right">
        <div className="card-header">
          <h4 title={product.name}>{product.name}</h4>
          <span className={`status ${product.status.toLowerCase()}`}>
            {product.status}
          </span>
        </div>

        <div className="card-meta">
          <div>
            SKU: <span>{product.id}</span>
          </div>
          <div>
            Brand: <span>{product.brand}</span>
          </div>
          <div>
            Category: <span>{product.category}</span>
          </div>
        </div>

        <div className="card-pricing">
          <span className="selling">₹{product.sellingPrice}</span>
          <span className="mrp">₹{product.price}</span>
          <span className="gst">GST {product.gst}%</span>
        </div>

        <div className="card-footer">
          <span
            className={`stock ${
              product.stock <= product.reorderLevel ? "low" : ""
            }`}
          >
            Stock: {product.stock}
          </span>

          <button onClick={() => onEdit(product)}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
