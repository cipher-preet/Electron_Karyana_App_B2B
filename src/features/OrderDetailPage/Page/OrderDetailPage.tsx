
import React, { useState } from "react";
import "./OrderDetailPage.css";

type OrderStatus = "packing" | "packed" | "outForDelivery";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  type: string;
  time: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
}

const initialOrders: Order[] = [
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [
      { name: "Scrambled Eggs", qty: 1, price: 16.99 },
      { name: "Scrambled Eggs", qty: 1, price: 16.99 },
      { name: "Scrambled Eggs", qty: 1, price: 16.99 },
      { name: "Scrambled Eggs", qty: 1, price: 16.99 },
    ],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [
      { name: "Scrambled Eggs", qty: 1, price: 16.99 },
      { name: "Scrambled Eggs", qty: 1, price: 16.99 },
      { name: "Scrambled Eggs", qty: 1, price: 16.99 },
      { name: "Scrambled Eggs", qty: 1, price: 16.99 },
      { name: "Scrambled Eggs", qty: 1, price: 16.99 },
    ],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#925",
    customer: "Ariel Hikmat",
    type: "Dine In",
    time: "06:12 PM",
    status: "packing",
    total: 87.34,
    items: [{ name: "Scrambled Eggs", qty: 1, price: 16.99 }],
  },
  {
    id: "#921",
    customer: "Denis Freeman",
    type: "Takeaway",
    time: "06:18 PM",
    status: "packed",
    total: 57.87,
    items: [{ name: "Burger", qty: 2, price: 10.99 }],
  },
  {
    id: "#919",
    customer: "Morgan Cox",
    type: "Delivery",
    time: "06:25 PM",
    status: "outForDelivery",
    total: 120,
    items: [{ name: "Pizza", qty: 1, price: 120 }],
  },
  {
    id: "#919",
    customer: "Morgan Cox",
    type: "Delivery",
    time: "06:25 PM",
    status: "outForDelivery",
    total: 120,
    items: [{ name: "Pizza", qty: 1, price: 120 }],
  },
];

const statusFlow: OrderStatus[] = ["packing", "packed", "outForDelivery"];

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleStatusChange = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const getCount = (type: string) => {
    if (type === "All") return orders.length;
    return orders.filter((o) => o.status === type).length;
  };

  const OrderDrawer = ({
    order,
    onClose,
    onComplete,
  }: {
    order: Order | null;
    onClose: () => void;
    onComplete: () => void;
  }) => {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    if (!order) return null;

    const toggleItem = (index: number) => {
      setCheckedItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      );
    };

    const allChecked = checkedItems.length === order.items.length;

    return (
      <div className="order-drawer-overlay" onClick={onClose}>
        <div className="order-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="order-drawer-header">
            <div>
              <h3>{order.customer}</h3>
              <p>
                {order.id} • {order.type}
              </p>
            </div>
            <button className="order-drawer-close" onClick={onClose}>
              <span style={{ fontSize: 18 }}>×</span>
            </button>
          </div>

          <div className="order-table-header">
            <span>✔</span>
            <span>Item</span>
            <span>Qty</span>
            <span>Price</span>
          </div>

          <div className="order-drawer-content">
            {order.items.map((item, i) => (
              <div key={i} className="order-row">
                <input
                  type="checkbox"
                  checked={checkedItems.includes(i)}
                  onChange={() => toggleItem(i)}
                />

                <span className="item-name">{item.name}</span>
                <span className="item-qty">{item.qty}</span>
                <span className="item-price">₹{item.price}</span>
              </div>
            ))}
          </div>

          <div className="order-drawer-footer">
            <div className="total">Total: ₹{order.total}</div>

            <button
              className={`complete-btn ${allChecked ? "active" : ""}`}
              disabled={!allChecked}
              onClick={onComplete}
            >
              Move to Next Step →
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="order-page">
      <div className="order-header">
        <h1>Orders</h1>
        <span>Today</span>
      </div>

      <div className="order-filters">
        {["All", "packing", "packed", "outForDelivery"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f} ({getCount(f)})
          </button>
        ))}
      </div>

      <div className="order-grid">
        {filteredOrders.map((order) => {
          const nextIndex = statusFlow.indexOf(order.status) + 1;
          const nextStatus = statusFlow[nextIndex];

          return (
            <div
              key={order.id}
              className="order-card"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="card-header">
                <div>
                  <h3>{order.customer}</h3>
                  <p>
                    {order.id} • {order.type}
                  </p>
                </div>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>

              <div className="item-row">
                {order.items[0]?.name} × {order.items[0]?.qty}
              </div>

              <div className="total">₹{order.total}</div>

              <div className="progress">
                {statusFlow.map((step, i) => (
                  <div
                    key={step}
                    className={`step ${
                      i <= statusFlow.indexOf(order.status) ? "active" : ""
                    }`}
                  />
                ))}
              </div>

              {nextStatus && (
                <button
                  className="primary-btn"
                  onClick={() => handleStatusChange(order.id, nextStatus)}
                >
                  Move → {nextStatus}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <OrderDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onComplete={() => {
          if (!selectedOrder) return;

          const nextIndex = statusFlow.indexOf(selectedOrder.status) + 1;

          const nextStatus = statusFlow[nextIndex];

          if (nextStatus) {
            handleStatusChange(selectedOrder.id, nextStatus);
            setSelectedOrder(null);
          }
        }}
      />
    </div>
  );
};

export default OrderPage;
