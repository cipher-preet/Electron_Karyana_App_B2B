import React, { useState } from "react";
import "./TrendForm.css";
import { useCreateTrendMutation } from "@/redux/services/SetTrend";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";

const TrendForm: React.FC<{ selectedProducts: any[] }> = ({
  selectedProducts,
}) => {
  const [trendName, setTrendName] = useState("");
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  const [createTrend, { isLoading }] = useCreateTrendMutation();

  const handleSaveTrend = async () => {
    if (!trendName.trim()) {
      setAlertInfo({
        title: "Trend Name Required",
        message: "Enter a trend name before saving.",
        variant: "warning",
      });
      return;
    }

    if (selectedProducts.length === 0) {
      setAlertInfo({
        title: "Select Products",
        message: "Choose at least one product to create this trend.",
        variant: "warning",
      });
      return;
    }
    try {
      const body = {
        trendName: trendName,
        productId: selectedProducts.map((product) => product._id),
      };
      await createTrend(body).unwrap();
      setAlertInfo({
        title: "Trend Created",
        message: "The selected products have been saved as a trend.",
        variant: "success",
      });
      setTrendName("");
    } catch (error) {
      console.error("Error creating trend:", error);
      const message =
        (error as any)?.data?.message ||
        (error as any)?.data?.data?.message ||
        "Something went wrong while creating the trend.";

      setAlertInfo({
        title: "Create Failed",
        message,
        variant: "error",
      });
    }
  };

  return (
    <section className="set-trend-form-card">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="set-trend-form-heading">
        <div>
          <span>Step 1</span>
          <h2>Create Trend</h2>
          <p>Name the trend and save it with the selected products.</p>
        </div>
        <strong>{selectedProducts.length} selected</strong>
      </div>

      <label className="set-trend-field">
        <span>Trend name</span>
        <input
          type="text"
          placeholder="Ex: Summer Sale"
          value={trendName}
          onChange={(e) => setTrendName(e.target.value)}
        />
      </label>

      <button
        className="set-trend-save-btn"
        onClick={handleSaveTrend}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Trend"}
      </button>
    </section>
  );
};

export default TrendForm;
