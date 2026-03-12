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
  name: string;
  products: Product[];
}

const TrendManagementPage = () => {
  const { data, isLoading, isError } = useGetTrendsForDashboardQuery();
  const [editTrendApi] = useEditTrendsMutation();

  const [deleteTrendApi] = useDeleteTrendsMutation();

  const [trends, setTrends] = useState<Trend[]>([]);
  const [showTrends, setShowTrends] = useState(false);
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

  if (isLoading) return <p>Loading trends...</p>;
  if (isError) return <p>Failed to load trends</p>;

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
