import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiPrinter, FiTruck, FiX } from "react-icons/fi";
import "./OrderDetailPage.css";
import {
  useGetOrdersForDashboardQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/services/OrderManagementApi";
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

const filters = ["All", "packing", "packed", "outForDelivery"];

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

  const filteredOrders =
    filter === "All"
      ? orders.filter((order) => order.status !== "Delivered")
      : orders.filter((order) => order.status === filter);

  const activeOrders = orders.filter(
    (order) => order.status !== "Delivered",
  ).length;
  const deliveryOrders = orders.filter(
    (order) => order.status === "outForDelivery",
  ).length;
  const activeValue = orders
    .filter((order) => order.status !== "Delivered")
    .reduce((sum, order) => sum + order.total, 0);

  const getCount = (type: string) => {
    if (type === "All") return activeOrders;
    return orders.filter((order) => order.status === type).length;
  };

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      await updateOrderStatus({ id, status }).unwrap();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (isLoading) {
    return <div className="order-state-card">Loading orders...</div>;
  }

  return (
    <div className="order-page">
      <div className="order-header">
        <div>
          <p className="order-kicker">Fulfillment queue</p>
          <h1>Orders</h1>
        </div>
        <button
          className="delivered-link"
          onClick={() => navigate("/delivered-orders")}
        >
          Delivered Orders
        </button>
      </div>

      <div className="order-stats">
        <div className="order-stat-card">
          <p>Active Orders</p>
          <h3>{activeOrders}</h3>
        </div>
        <div className="order-stat-card">
          <p>Out For Delivery</p>
          <h3>{deliveryOrders}</h3>
        </div>
        <div className="order-stat-card highlight">
          <p>Active Order Value</p>
          <h3>{"\u20B9"}{activeValue}</h3>
        </div>
      </div>

      <div className="order-filters">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {getFilterLabel(item)} <span>{getCount(item)}</span>
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
                <span className={`status ${order.status}`}>
                  {formatStatus(order.status)}
                </span>
              </div>

              <div className="item-row">
                {order.items[0]?.name} x {order.items[0]?.qty}
              </div>

              <div className="total">{"\u20B9"}{order.total}</div>

              <div className="progress">
                {statusFlow.map((step, index) => (
                  <div
                    key={step}
                    className={`step ${
                      index <= statusFlow.indexOf(order.status) ? "active" : ""
                    }`}
                  />
                ))}
              </div>

              {nextStatus && (
                <button
                  className="primary-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedOrder(order);
                  }}
                >
                  <FiTruck /> Process Order
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

          const nextStatus = statusFlow[statusFlow.indexOf(selectedOrder.status) + 1];

          if (nextStatus) {
            handleStatusChange(selectedOrder.id, nextStatus);
            setSelectedOrder(null);
          }
        }}
      />
    </div>
  );
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
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const allChecked = checkedItems.length === order.items.length;

  return (
    <div className="order-drawer-overlay" onClick={onClose}>
      <div className="order-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="order-drawer-header">
          <div>
            <h3>{order.customer}</h3>
            <p>
              #{order.id.slice(0, 6).toUpperCase()} • {order.type}
            </p>
          </div>
          <button className="order-drawer-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="order-table-header">
          <span>
            <FiCheck />
          </span>
          <span>Item</span>
          <span>Qty</span>
          <span>Price</span>
        </div>

        <div className="order-drawer-content">
          {order.items.map((item, index) => (
            <div key={index} className="order-row">
              <input
                type="checkbox"
                checked={checkedItems.includes(index)}
                onChange={() => toggleItem(index)}
              />
              <span className="item-name">{item.name}</span>
              <span className="item-qty">{item.qty}</span>
              <span className="item-price">{"\u20B9"}{item.price}</span>
            </div>
          ))}
        </div>

        <div className="order-drawer-footer">
          <div className="total">Total: {"\u20B9"}{order.total}</div>

          <button
            className={`complete-btn ${allChecked ? "active" : ""}`}
            disabled={!allChecked}
            onClick={onComplete}
          >
            Move to Next Step
          </button>

          <button className="print-btn" onClick={() => printInvoice(order)}>
            <FiPrinter /> Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

const getFilterLabel = (filter: string) => {
  if (filter === "All") return "All";
  return formatStatus(filter as OrderStatus);
};

const formatStatus = (status: OrderStatus) => {
  const labels: Record<OrderStatus, string> = {
    Recieved: "Received",
    packing: "Packing",
    packed: "Packed",
    outForDelivery: "Out for Delivery",
    Delivered: "Delivered",
  };

  return labels[status] || status;
};

export default OrderPage;
