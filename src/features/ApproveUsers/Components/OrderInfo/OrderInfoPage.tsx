import "./OrderInfoPage.css";
import { useParams } from "react-router-dom";
import { useGetUserOrderHistoryByUserIdQuery } from "@/redux/services/BuidHomeApi";

const OrderInfoPage = () => {
  const { actualUserId } = useParams();
  const { data, isLoading, isError } = useGetUserOrderHistoryByUserIdQuery(
    actualUserId as string,
  );

  const orders = data?.data?.userOrderData || [];

  if (isLoading) {
    return <div className="user-order-state">Loading order history...</div>;
  }

  if (isError) {
    return <div className="user-order-state">Something went wrong</div>;
  }

  if (orders.length === 0) {
    return <div className="user-order-state">No order details present</div>;
  }

  const totalValue = orders.reduce(
    (sum: number, order: any) => sum + (order.totalAmount || 0),
    0,
  );

  return (
    <div className="user-order-page">
      <div className="user-order-header">
        <div>
          <p>Customer activity</p>
          <h2>Order History</h2>
        </div>
      </div>

      <div className="user-order-stats">
        <div className="user-order-stat">
          <p>Total Orders</p>
          <h3>{orders.length}</h3>
        </div>
        <div className="user-order-stat highlight">
          <p>Order Value</p>
          <h3>{"\u20B9"}{totalValue}</h3>
        </div>
      </div>

      <div className="user-order-container">
        {orders.map((order: any) => (
          <div key={order._id} className="user-order-card">
            <div className="user-order-card-header">
              <div>
                <p className="user-order-id">
                  #{String(order._id).slice(0, 8).toUpperCase()}
                </p>
                <p className="user-order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className={`user-order-status ${order.status}`}>
                {order.status}
              </div>
            </div>

            <div className="user-order-section">
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

            <div className="user-order-section">
              <h4>Items</h4>
              {order.items.map((item: any) => (
                <div key={item._id} className="user-order-item-row">
                  <span>{item.name}</span>
                  <span>
                    {"\u20B9"}{item.price} x {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="user-order-footer">
              <div>
                <p className="user-order-total">
                  Total: {"\u20B9"}{order.totalAmount}
                </p>
                <p className="user-order-progress">
                  Order Status: {order.orderStatus}
                </p>
              </div>

              {order.rating > 0 && (
                <div className="user-order-rating">Rating {order.rating}</div>
              )}
            </div>

            {order.review && <p className="user-order-review">"{order.review}"</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderInfoPage;
