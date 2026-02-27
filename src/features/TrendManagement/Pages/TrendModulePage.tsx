import React, { useState } from "react";
import "./TrendModulePage.css";
import SetTrendPage from "@/features/SetTrends/Components/SetTrendPage";
import TrendManagementPage from "./TrendManagementPage";

const TrendModulePage = () => {
  const [activeView, setActiveView] = useState<"create" | "manage">("create");

  return (
    <div className="trend-module-container">
      
      <div className="trend-module-header">
        <h2>Trend Module</h2>

        <div className="trend-toggle-buttons">
          <button
            className={activeView === "create" ? "active-btn" : ""}
            onClick={() => setActiveView("create")}
          >
            Set Trend
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