import React, { useState } from "react";
import "./TrendForm.css";

const TrendForm = () => {
  const [trendName, setTrendName] = useState("");

  return (
    <div className="trend-form">
      <h2>Create Trend</h2>
      <input
        type="text"
        placeholder="Enter Trend Name (Ex: Summer Sale)"
        value={trendName}
        onChange={(e) => setTrendName(e.target.value)}
      />
      <button className="save-btn">Save Trend</button>
    </div>
  );
};

export default TrendForm;
