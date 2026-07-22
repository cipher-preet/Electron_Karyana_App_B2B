import { useState } from "react";
import { FiX } from "react-icons/fi";
import "../Components/DeliveredOrderPage.css";
import { useGetOrdersForDashboardQuery } from "@/redux/services/OrderManagementApi";

const normalizeOrderStatus = (status?: string | null) => {
  const value = String(status || "").trim().toLowerCase();

  if (
    ["delivered", "complete", "completed", "done", "orders", "rated"].includes(
      value,
    )
  ) {
    return "Delivered";
  }

  if (["cancelled", "canceled"].includes(value)) {
    return "cancelled";
  }

  return status || "Recieved";
};

const DeliveredOrdersPage = () => {
  const { data, isLoading } = useGetOrdersForDashboardQuery({});
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const orders =
    data?.data?.map((order: any) => ({
      ...order,
      status: normalizeOrderStatus(order.orderStatus || order.status),
      items: order.items.map((item: any) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
      })),
    })) || [];

  const deliveredOrders = orders.filter(
    (order: any) => normalizeOrderStatus(order.status) === "Delivered",
  );
  const deliveredValue = deliveredOrders.reduce(
    (sum: number, order: any) => sum + (order.total || 0),
    0,
  );

  if (isLoading) {
    return <div className="delivered-state">Loading delivered orders...</div>;
  }

  return (
    <div className="delivered-page">
      <div className="delivered-header">
        <div>
          <p>Completed fulfillment</p>
          <h2>Delivered Orders</h2>
        </div>
      </div>

      <div className="delivered-stats">
        <div className="delivered-stat">
          <p>Delivered Orders</p>
          <h3>{deliveredOrders.length}</h3>
        </div>
        <div className="delivered-stat highlight">
          <p>Delivered Value</p>
          <h3>{"\u20B9"}{deliveredValue}</h3>
        </div>
      </div>

      <div className="delivered-grid">
        {deliveredOrders.map((order: any) => (
          <div key={order.id} className="delivered-card">
            <div className="delivered-card-header">
              <div>
                <h3>{order.customer}</h3>
                <p>
                  #{order.id.slice(0, 6).toUpperCase()} • {order.type}
                </p>
              </div>
              <span className="delivered-status">Delivered</span>
            </div>

            <div className="delivered-item-row">
              {order.items[0]?.name}
              {order.items.length > 1 && (
                <span> +{order.items.length - 1} more</span>
              )}
            </div>

            <div className="delivered-total">{"\u20B9"}{order.total}</div>

            <button
              className="details-btn"
              onClick={() => setSelectedOrder(order)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>{selectedOrder.customer}</h3>
                <p className="modal-sub">
                  #{selectedOrder.id.slice(0, 6).toUpperCase()} •{" "}
                  {selectedOrder.type}
                </p>
              </div>
              <button onClick={() => setSelectedOrder(null)}>
                <FiX />
              </button>
            </div>

            <div className="modal-items">
              {selectedOrder.items.map((item: any, index: number) => (
                <div key={index} className="modal-row">
                  <span>{item.name}</span>
                  <span>x {item.qty}</span>
                  <span>{"\u20B9"}{item.price}</span>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              Total: {"\u20B9"}{selectedOrder.total}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveredOrdersPage;
