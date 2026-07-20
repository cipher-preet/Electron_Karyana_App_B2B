import React, { useState } from "react";
import "./TrendModulePage.css";
import SetTrendPage from "@/features/SetTrends/Components/SetTrendPage";
import TrendManagementPage from "./TrendManagementPage";

const TrendModulePage = () => {
  const [activeView, setActiveView] = useState<"create" | "manage">("manage");

  return (
    <div className="trend-module-container">
      <div className="trend-module-header">
        <div>
          <span className="trend-module-eyebrow">Merchandising</span>
          <h2>Trend Management</h2>
          <p>Create, review, and refine the product groups shown as trends.</p>
        </div>

        <div className="trend-toggle-buttons">
          <button
            className={activeView === "create" ? "active-btn" : ""}
            onClick={() => setActiveView("create")}
          >
            Create Trend
          </button>

          <button
            className={activeView === "manage" ? "active-btn" : ""}
            onClick={() => setActiveView("manage")}
          >
            Manage Trends
          </button>
        </div>
      </div>

      <div className="trend-module-content">
        {activeView === "create" && <SetTrendPage />}
        {activeView === "manage" && <TrendManagementPage />}
      </div>
    </div>
  );
};

export default TrendModulePage;
