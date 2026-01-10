import React from "react";
import { Product } from "../../../../shared/types/types";
import "./ProductCard.css";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onEdit }) => {
  const {
    name,
    images,
    sku,
    mrp,
    marketPrice,
    sellingPrice,
    unit,
    rating,
    reviewCount,
    isActive,
    categoryId,
    subcategoryId,
    brandId,
  } = product as any;

  return (
    <div className="product-card-professional">
      {/* Image */}
      <div className="card-left">
        <div className="product-image">
          {images ? (
            <img src={images} alt={name} />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="card-right">
        {/* Header */}
        <div className="card-header">
          <h4 title={name}>{name}</h4>
          <span className={`status ${isActive ? "active" : "inactive"}`}>
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Meta Info */}
        <div className="card-meta">
          <div>
            <span className="meta-label">SKU</span>
            <span>{sku}</span>
          </div>
          <div>
            <span className="meta-label">Brand</span>
            <span>{brandId?.name ?? "-"}</span>
          </div>
          <div>
            <span className="meta-label">Category</span>
            <span>{categoryId?.name ?? "-"}</span>
          </div>
          <div>
            <span className="meta-label">Subcategory</span>
            <span>{subcategoryId?.name ?? "-"}</span>
          </div>
        </div>

        {/* Pricing Box */}
        <div className="price-box">
          <div className="price-item">
            <span className="price-label">MRP</span>
            <span className="price-value mrp-bold">₹{mrp}</span>
          </div>

          <div className="price-item">
            <span className="price-label">Market Price</span>
            <span className="price-value market">₹{marketPrice}</span>
          </div>

          <div className="price-item highlight">
            <span className="price-label">Selling Price</span>
            <span className="price-value selling">₹{sellingPrice}</span>
          </div>

          <div className="unit">Unit: {unit}</div>
        </div>

        {/* Rating */}
        <div className="card-rating">
          ⭐ {rating} <span>({reviewCount} reviews)</span>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <span className="stock">Stock: {sku}</span>
          <button onClick={() => onEdit(product)}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
