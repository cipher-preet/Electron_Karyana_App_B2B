import {
  useGetGraphsStatsForDashboardQuery,
  useGetOrderStatsForDashboardQuery,
} from "@/redux/services/DashboardStats";
import "./Dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import AppLoader from "@/shared/Apploader/AppLoader";

const Dashboard = () => {
  const {
    data: graphStats,
    isLoading: graphLoading,
    isError: graphError,
  } = useGetGraphsStatsForDashboardQuery();

  const {
    data: orderStats,
    isLoading: orderLoading,
    isError: orderError,
  } = useGetOrderStatsForDashboardQuery();

  const orderData = (orderStats as any)?.data?.[0] || {};

  const salesData = (graphStats as any)?.data?.salesData || [];
  const ordersData = (graphStats as any)?.data?.ordersData || [];

  const topOrders = orderData.topOrders || [];
  const totalOrders = orderData.totalCount || 0;
  const last30DaysSales = orderData.last30DaysSales || 0;

  if (graphLoading || orderLoading) return <><AppLoader/></>;

  if (graphError || orderError) return <p>Something went wrong</p>;

  const topProducts = [
    { name: "Aloo Bhujia", sold: 120 },
    { name: "Milk", sold: 95 },
    { name: "Bread", sold: 80 },
    { name: "Rice", sold: 60 },
    { name: "Sugar", sold: 50 },
  ];

  const lowStock = [
    { name: "Oil", qty: 5 },
    { name: "Sugar", qty: 3 },
    { name: "Rice", qty: 2 },
    { name: "Salt", qty: 4 },
  ];

  return (
    <div className="dashboard">
      <div className="kpi-grid">
        <div className="kpi primary">
          <p>Today Revenue</p>
          <h2>₹12,450</h2>
        </div>
        <div className="kpi">
          <p>Orders</p>
          <h2>{totalOrders}</h2>
        </div>
        <div className="kpi warning">
          <p>Pending</p>
          <h2>12</h2>
        </div>
        <div className="kpi danger">
          <p>Low Stock</p>
          <h2>8</h2>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="card large">
          <h3>Last 7 Days Sales</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salesData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#4a6cf7" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Orders Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ordersData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Last 30 Days</h3>
          <h2>₹{last30DaysSales}</h2>
          <p className="growth">+12% growth</p>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="card large scroll-card">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <span className="view-all">View All</span>
          </div>

          <div className="list scroll">
            {topOrders.map((order: any) => (
              <div key={order._id}>
                <span>#{order._id.slice(0, 5)}</span>
                <span>₹{order.totalAmount}</span>
                <span className={order.status}>{order.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card scroll-card">
          <div className="card-header">
            <h3>Top Products</h3>
          </div>

          <div className="list scroll">
            {topProducts.map((p, i) => (
              <div key={i}>
                <span>{p.name}</span>
                <span>{p.sold} sold</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card scroll-card">
          <div className="card-header">
            <h3>Low Stock</h3>
          </div>

          <div className="list scroll warning-list">
            {lowStock.map((item, i) => (
              <div key={i}>
                <span>{item.name}</span>
                <span>{item.qty} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
