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

const Dashboard = () => {
  // 🔥 Charts Data
  const salesData = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 2100 },
    { day: "Wed", sales: 1800 },
    { day: "Thu", sales: 2400 },
    { day: "Fri", sales: 3000 },
    { day: "Sat", sales: 2800 },
    { day: "Sun", sales: 3500 },
  ];

  const ordersData = [
    { day: "Mon", orders: 20 },
    { day: "Tue", orders: 35 },
    { day: "Wed", orders: 28 },
    { day: "Thu", orders: 40 },
    { day: "Fri", orders: 55 },
    { day: "Sat", orders: 48 },
    { day: "Sun", orders: 60 },
  ];

  // 🔥 Dynamic Data (replace with API later)
  const recentOrders = [
    { id: "#12345", amount: 560, status: "paid" },
    { id: "#12346", amount: 320, status: "pending" },
    { id: "#12347", amount: 890, status: "paid" },
    { id: "#12348", amount: 120, status: "pending" },
    { id: "#12349", amount: 760, status: "paid" },
  ];

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
          <h2>85</h2>
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
          <h2>₹2,45,000</h2>
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
            {recentOrders.map((order) => (
              <div key={order.id}>
                <span>{order.id}</span>
                <span>₹{order.amount}</span>
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
