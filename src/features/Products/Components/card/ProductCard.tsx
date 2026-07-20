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
    image,
    sku,
    mrp,
    sellingPrice,
    unit,
    rating,
    reviewCount,
    isActive,
    categoryId,
    subcategoryId,
    brandId,
    offPercentage,
  } = product as any;

  return (
    <article className="product-card-professional">
      <div className="product-image">
        {image ? (
          <img src={image} alt={name || "Product"} />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
      </div>

      <div className="card-right">
        <div className="card-header">
          <div className="title-group">
            <h4 title={name}>{name || "Unnamed Product"}</h4>
            <span title={sku}>SKU: {sku || "-"}</span>
          </div>
          <span className={`status ${isActive ? "active" : "inactive"}`}>
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="card-meta">
          <div>
            <span className="meta-label">Brand</span>
            <span title={brandId?.name}>{brandId?.name ?? "-"}</span>
          </div>
          <div>
            <span className="meta-label">Category</span>
            <span title={categoryId?.name}>{categoryId?.name ?? "-"}</span>
          </div>
          <div>
            <span className="meta-label">Subcategory</span>
            <span title={subcategoryId?.name}>{subcategoryId?.name ?? "-"}</span>
          </div>
          <div>
            <span className="meta-label">Unit</span>
            <span title={unit}>{unit || "-"}</span>
          </div>
        </div>

        <div className="price-box">
          <div className="price-item">
            <span className="price-label">MRP</span>
            <span className="price-value">Rs {mrp ?? "-"}</span>
          </div>

          <div className="price-item">
            <span className="price-label">Discount</span>
            <span className="price-value discount">
              {offPercentage ? `${offPercentage}%` : "-"}
            </span>
          </div>

          <div className="price-item highlight">
            <span className="price-label">Selling</span>
            <span className="price-value selling">Rs {sellingPrice ?? "-"}</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="card-rating">
            <span className="rating-star">★</span>
            <span>{rating ?? 0}</span>
            <small>({reviewCount ?? 0} reviews)</small>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
