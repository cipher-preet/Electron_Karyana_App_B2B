import React from "react";
import "./TrendList.css";

interface Props {
  trends: any[];
  onEdit: (trend: any) => void;
  onDelete: (id: string) => void;
}

const TrendList: React.FC<Props> = ({ trends, onEdit, onDelete }) => {
  const getTrendName = (trend: any) =>
    trend.TrendName || trend.trendname || trend.name || "Untitled trend";

  const getProductImage = (product: any) => {
    if (Array.isArray(product.images)) return product.images[0] ?? "";
    return product.images || "";
  };

  return (
    <div className="trend-grid">
      {trends?.map((trend) => (
        <div key={trend._id} className="trend-card">
          <div className="trend-card-top">
            <div>
              <span>Trend</span>
              <h3 title={getTrendName(trend)}>{getTrendName(trend)}</h3>
            </div>
            <strong>{trend.products?.length ?? 0}</strong>
          </div>

          <div className="trend-product-strip">
            {(trend.products ?? []).slice(0, 4).map((product: any) => (
              <span key={product._id} className="trend-product-thumb">
                {getProductImage(product) ? (
                  <img src={getProductImage(product)} alt={product.name} />
                ) : (
                  product.name?.charAt(0) || "P"
                )}
              </span>
            ))}
            {(trend.products?.length ?? 0) > 4 && (
              <span className="trend-product-more">
                +{trend.products.length - 4}
              </span>
            )}
          </div>

          <div className="trend-actions">
            <button className="edit-btn" onClick={() => onEdit(trend)}>
              Edit
            </button>
            <button className="delete-btn2" onClick={() => onDelete(trend._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendList;
