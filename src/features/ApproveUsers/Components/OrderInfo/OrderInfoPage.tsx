import "./OrderInfoPage.css";
import { useParams } from "react-router-dom";
import { useGetUserOrderHistoryByUserIdQuery } from "@/redux/services/BuidHomeApi";

const OrderInfoPage = () => {
  const { id, actualUserId } = useParams();
  const { data, isLoading, isError } = useGetUserOrderHistoryByUserIdQuery(
    actualUserId as string,
  );

  const orders = data?.data?.userOrderData || [];

  if (isLoading) {
    return <p>Data is loading ......</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  if (orders.length === 0) {
    return <p>No Order Detail Present</p>;
  }

  return (
    <div className="page-wrapper">
      <h2 className="order-title">My Orders</h2>

      <div className="order-container">
        {orders.map((order: any) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <p className="order-id">Order ID: {order._id}</p>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className={`status ${order.status}`}>{order.status}</div>
            </div>

            <div className="order-section">
              <h4>Delivery Address</h4>
              <p>
                {order.addressId.name} ({order.addressId.type})
              </p>
              <p>{order.addressId.phone}</p>
              <p>
                {order.addressId.houseVillage}, {order.addressId.areaStreet}
              </p>
              <p>
                {order.addressId.city} - {order.addressId.pincode}
              </p>
            </div>

            <div className="order-section">
              <h4>Items</h4>
              {order.items.map((item: any) => (
                <div key={item._id} className="item-row">
                  <span>{item.name}</span>
                  <span>
                    ₹{item.price} × {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div>
                <p className="total">Total: ₹{order.totalAmount}</p>
                <p className="order-status">
                  Order Status: {order.orderStatus}
                </p>
              </div>

              {order.rating > 0 && (
                <div className="rating">⭐ {order.rating}</div>
              )}
            </div>

            {order.review && <p className="review">"{order.review}"</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderInfoPage;
