import React, { useState } from "react";
import "./TrendForm.css";
import { useCreateTrendMutation } from "@/redux/services/SetTrend";

const TrendForm: React.FC<{ selectedProducts: any[] }> = ({
  selectedProducts,
}) => {
  const [trendName, setTrendName] = useState("");

  const [createTrend] = useCreateTrendMutation();

  const handleSaveTrend = async () => {
    if (!trendName.trim()) {
      alert("Please enter trend name");
      return;
    }

    if (selectedProducts.length === 0) {
      alert("Please select at least one product");
      return;
    }
    try {
      const body = {
        trendName: trendName,
        productId: selectedProducts.map((product) => product._id),
      };
      await createTrend(body);
      alert("Trend created successfully");
      setTrendName("");
    } catch (error) {
      console.error("Error creating trend:", error);
    }
  };

  return (
    <div className="trend-form">
      <h2>Create Trend</h2>
      <input
        type="text"
        placeholder="Enter Trend Name (Ex: Summer Sale)"
        value={trendName}
        onChange={(e) => setTrendName(e.target.value)}
      />
      <button className="save-btn" onClick={handleSaveTrend}>
        Save Trend
      </button>
    </div>
  );
};

export default TrendForm;
