import React from "react";
import "./TrendList.css";

interface Props {
  trends: any[];
  onEdit: (trend: any) => void;
  onDelete: (id: string) => void;
}

const TrendList: React.FC<Props> = ({ trends, onEdit, onDelete }) => {
  return (
    <div className="trend-grid">
      {trends.map(trend => (
        <div key={trend._id} className="trend-card">
          <h3>{trend.name}</h3>
          <p>{trend.products.length} Products</p>

          <div className="trend-actions">
            <button className="edit-btn" onClick={() => onEdit(trend)}>
              Edit
            </button>
            <button
              className="delete-btn2"
              onClick={() => onDelete(trend._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendList;