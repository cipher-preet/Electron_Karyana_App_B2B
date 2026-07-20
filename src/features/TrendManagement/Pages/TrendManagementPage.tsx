import React, { useEffect, useState } from "react";
import "./TrendManagementPage.css";
import TrendList from "../Components/TrendList";
import TrendEditModal from "../Components/TrendEditModal";
import {
  useGetTrendsForDashboardQuery,
  useDeleteTrendsMutation,
  useEditTrendsMutation,
} from "@/redux/services/SetTrend";

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface Trend {
  _id: string;
  name?: string;
  TrendName?: string;
  trendname?: string;
  products: Product[];
}

const TrendManagementPage = () => {
  const { data, isLoading, isError } = useGetTrendsForDashboardQuery();
  const [editTrendApi] = useEditTrendsMutation();

  const [deleteTrendApi] = useDeleteTrendsMutation();

  const [trends, setTrends] = useState<Trend[]>([]);
  const [editingTrend, setEditingTrend] = useState<Trend | null>(null);

  useEffect(() => {
    if (data?.data) {
      setTrends(data.data);
    }
  }, [data]);

  const deleteTrend = async (id: string) => {
    try {
      await deleteTrendApi({ trendId: id }).unwrap();

      setTrends((prev) => prev.filter((trend) => trend._id !== id));
    } catch (error) {
      console.error("Failed to delete trend", error);
    }
  };
  const updateTrend = async (updatedTrend: any) => {
    const productIds = updatedTrend.products.map((p: any) => p._id);

    await editTrendApi({
      trendId: updatedTrend._id,
      productId: productIds,
    }).unwrap();

    setTrends((prev) =>
      prev.map((trend) =>
        trend._id === updatedTrend._id ? updatedTrend : trend,
      ),
    );
    setEditingTrend(null);
  };

  if (isLoading) {
    return (
      <div className="trend-page">
        <div className="trend-state-card">Loading trends...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="trend-page">
        <div className="trend-state-card error">Failed to load trends.</div>
      </div>
    );
  }

  return (
    <div className="trend-page">
      <div className="trend-header">
        <div>
          <h2>Manage Trends</h2>
          <p>Review live trend sections and remove products that no longer fit.</p>
        </div>
        <span>{trends.length} trends</span>
      </div>

      {trends.length > 0 ? (
        <TrendList
          trends={trends}
          onEdit={setEditingTrend}
          onDelete={deleteTrend}
        />
      ) : (
        <div className="trend-empty-state">
          <strong>No trends created yet</strong>
          <p>Create a trend first, then it will appear here for editing.</p>
        </div>
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
