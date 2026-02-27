import React, { useState } from "react";
import "./TrendManagementPage.css";
import TrendList from "../Components/TrendList";
import TrendEditModal from "../Components/TrendEditModal";


const dummyTrends = [
  {
    _id: "1",
    name: "Summer Sale",
    products: [
      { _id: "p1", name: "Product 1", price: 120 },
      { _id: "p2", name: "Product 2", price: 200 },
    ],
  },
  {
    _id: "2",
    name: "Top Selling",
    products: [
      { _id: "p3", name: "Product 3", price: 150 },
    ],
  },
];

const TrendManagementPage = () => {
  const [trends, setTrends] = useState(dummyTrends);
  const [showTrends, setShowTrends] = useState(false);
  const [editingTrend, setEditingTrend] = useState<any>(null);

  const deleteTrend = (id: string) => {
    setTrends(prev => prev.filter(trend => trend._id !== id));
  };

  const updateTrend = (updatedTrend: any) => {
    setTrends(prev =>
      prev.map(trend =>
        trend._id === updatedTrend._id ? updatedTrend : trend
      )
    );
    setEditingTrend(null);
  };

  return (
    <div className="trend-page">
      <div className="trend-header">
        <h2>Trend Management</h2>
        <button onClick={() => setShowTrends(!showTrends)}>
          {showTrends ? "Hide Trends" : "View Existing Trends"}
        </button>
      </div>

      {showTrends && (
        <TrendList
          trends={trends}
          onEdit={setEditingTrend}
          onDelete={deleteTrend}
        />
      )}

      {editingTrend && (
        <TrendEditModal
          trend={editingTrend}
          onClose={() => setEditingTrend(null)}
          onSave={updateTrend}
        />
      )}
    </div>
  );
};

export default TrendManagementPage;