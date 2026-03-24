import { useState } from "react";
import "../Components/DeliveredOrderPage.css";
import { useGetOrdersForDashboardQuery } from "@/redux/services/OrderManagementApi";

const DeliveredOrdersPage = () => {
  const { data, isLoading } = useGetOrdersForDashboardQuery({});
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const orders =
    data?.data?.map((order: any) => ({
      ...order,
      items: order.items.map((item: any) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
      })),
    })) || [];

  const deliveredOrders = orders.filter((o: any) => o.status === "Delivered");

  if (isLoading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div className="delivered-page">
      <h2 className="page-title">Delivered Orders</h2>

      <div className="order-grid">
        {deliveredOrders.map((order: any) => (
          <div key={order.id} className="order-card delivered">
            <div className="card-header">
              <div>
                <h3>{order.customer}</h3>
                <p>
                  #{order.id.slice(0, 6).toUpperCase()} • {order.type}
                </p>
              </div>
              <span className="status delivered">Delivered</span>
            </div>

            <div className="item-row">
              {order.items[0]?.name}
              {order.items.length > 1 && (
                <span> +{order.items.length - 1} more</span>
              )}
            </div>

            <div className="total">₹{order.total}</div>

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
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedOrder.customer}</h3>
              <button onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <p className="modal-sub">
              #{selectedOrder.id.slice(0, 6).toUpperCase()} •{" "}
              {selectedOrder.type}
            </p>

            <div className="modal-items">
              {selectedOrder.items.map((item: any, i: number) => (
                <div key={i} className="modal-row">
                  <span>{item.name}</span>
                  <span>× {item.qty}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="modal-footer">Total: ₹{selectedOrder.total}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveredOrdersPage;
