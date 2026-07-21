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
  CartesianGrid,
} from "recharts";
import AppLoader from "@/shared/Apploader/AppLoader";
import { FiAlertTriangle, FiPackage, FiShoppingBag, FiTrendingUp } from "react-icons/fi";

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
  const pendingOrders = topOrders.filter((order: any) =>
    String(order.status).toLowerCase().includes("pending"),
  ).length;
  const todayRevenue = salesData.at?.(-1)?.sales || 0;

  if (graphLoading || orderLoading) return <AppLoader />;

  if (graphError || orderError) {
    return <div className="dashboard-state">Something went wrong</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div>
          <p className="dashboard-kicker">Business overview</p>
          <h1>Dashboard</h1>
          <span>Track orders, sales, inventory alerts, and customer activity.</span>
        </div>
        <div className="dashboard-live-pill">Live metrics</div>
      </div>

      <div className="kpi-grid">
        <KpiCard
          icon={<FiTrendingUp />}
          label="Today Revenue"
          value={`\u20B9${todayRevenue}`}
          variant="primary"
        />
        <KpiCard
          icon={<FiShoppingBag />}
          label="Orders"
          value={totalOrders}
        />
        <KpiCard
          icon={<FiPackage />}
          label="Pending"
          value={pendingOrders}
          variant="warning"
        />
        <KpiCard
          icon={<FiAlertTriangle />}
          label="Low Stock"
          value={lowStock.length}
          variant="danger"
        />
      </div>

      <div className="analytics-grid">
        <div className="dashboard-card chart-card large">
          <div className="dashboard-card-header">
            <div>
              <p>Sales performance</p>
              <h3>Last 7 Days Sales</h3>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={salesData}>
              <CartesianGrid stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#047857"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "#ffffff" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card chart-card">
          <div className="dashboard-card-header">
            <div>
              <p>Order volume</p>
              <h3>Orders Trend</h3>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ordersData}>
              <CartesianGrid stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card revenue-card">
          <p>Last 30 Days</p>
          <h2>{"\u20B9"}{last30DaysSales}</h2>
          <span>+12% growth</span>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="dashboard-card large scroll-card">
          <div className="dashboard-card-header">
            <div>
              <p>Latest activity</p>
              <h3>Recent Orders</h3>
            </div>
            <span className="view-all">View All</span>
          </div>

          <div className="dashboard-list scroll">
            {topOrders.map((order: any) => (
              <div key={order._id} className="dashboard-list-row">
                <span>#{String(order._id).slice(0, 6).toUpperCase()}</span>
                <strong>{"\u20B9"}{order.totalAmount}</strong>
                <span className={`dashboard-status ${order.status}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card scroll-card">
          <div className="dashboard-card-header">
            <div>
              <p>Product movement</p>
              <h3>Top Products</h3>
            </div>
          </div>

          <div className="dashboard-list scroll">
            {topProducts.map((product, index) => (
              <div key={product.name} className="dashboard-list-row">
                <span>
                  {index + 1}. {product.name}
                </span>
                <strong>{product.sold} sold</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card scroll-card">
          <div className="dashboard-card-header">
            <div>
              <p>Inventory watch</p>
              <h3>Low Stock</h3>
            </div>
          </div>

          <div className="dashboard-list scroll warning-list">
            {lowStock.map((item) => (
              <div key={item.name} className="dashboard-list-row">
                <span>{item.name}</span>
                <strong>{item.qty} left</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({
  icon,
  label,
  value,
  variant = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  variant?: string;
}) => (
  <div className={`kpi ${variant}`}>
    <div className="kpi-icon">{icon}</div>
    <div>
      <p>{label}</p>
      <h2>{value}</h2>
    </div>
  </div>
);

const tooltipStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  boxShadow: "0 12px 28px rgba(15, 23, 42, 0.12)",
};

export default Dashboard;
