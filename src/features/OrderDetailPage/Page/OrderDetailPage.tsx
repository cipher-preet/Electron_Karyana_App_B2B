import React, { useState } from "react";
import "./OrderDetailPage.css";
import {
  useGetOrdersForDashboardQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/services/OrderManagementApi";
import { useNavigate } from "react-router-dom";
import { printInvoice } from "@/shared/utils/helper";

type OrderStatus =
  | "Recieved"
  | "packing"
  | "packed"
  | "outForDelivery"
  | "Delivered";

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
const statusFlow: OrderStatus[] = [
  "Recieved",
  "packing",
  "packed",
  "outForDelivery",
  "Delivered",
];

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetOrdersForDashboardQuery({});

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const orders: Order[] =
    data?.data?.map((order: any) => ({
      id: order.id,
      customer: order.customer,
      type: order.type,
      time: order.time,
      status: order.status === "Recieved" ? "packing" : order.status,
      total: order.total,

      items: order.items.map((item: any) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
      })),
    })) || [];

  const [filter, setFilter] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      const data = {
        id,
        status,
      };
      await updateOrderStatus(data).unwrap();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };
  const filteredOrders =
    filter === "All"
      ? orders.filter((o) => o.status !== "Delivered")
      : orders.filter((o) => o.status === filter);

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

    if (isLoading) {
      return <div style={{ padding: 20 }}>Loading orders...</div>;
    }

    return (
      <div className="order-drawer-overlay" onClick={onClose}>
        <div className="order-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="order-drawer-header">
            <div>
              <h3>{order.customer}</h3>
              <p>
                #{order.id.slice(0, 6).toUpperCase()} • {order.type}
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

            <button className="print-btn" onClick={() => printInvoice(order)}>
              🖨 Print Invoice
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
        <span
          className="delivered-link"
          onClick={() => navigate("/delivered-orders")}
        >
          Delivered
        </span>
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
                    #{order.id.slice(0, 6).toUpperCase()} • {order.type}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOrder(order);
                  }}
                >
                  Process Order →
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
