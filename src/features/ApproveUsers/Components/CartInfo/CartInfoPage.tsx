import React from "react";
import "./CartInfoPage.css";
import { useGetUserCartInfoQuery } from "@/redux/services/BuidHomeApi";
import { useParams } from "react-router-dom";

const CartInfoPage = () => {
  const { id, actualUserId } = useParams();

  const { data, isLoading, isError } = useGetUserCartInfoQuery(
    actualUserId as string,
  );

  const cart = data?.data;

  if (isLoading) return <div className="loading">Loading Cart...</div>;

  if (isError) return <div className="loading">No Cart Found</div>;

  if (!cart) return <div className="loading">No Cart Found</div>;

  return (
    <div className="admin-cart-page">
      <div className="cart-header">
        <div>
          <h2>User Cart Details</h2>
          <p className="user-id">User ID: {cart.userId}</p>
        </div>
      </div>
      <div className="cart-stats">
        <div className="stat-card">
          <p>Total Products</p>
          <h3>{cart.items.length}</h3>
        </div>

        <div className="stat-card">
          <p>Total Quantity</p>
          <h3>{cart.totalItems}</h3>
        </div>

        <div className="stat-card highlight">
          <p>Cart Value</p>
          <h3>₹{cart.subtotal}</h3>
        </div>
      </div>
      <div className="cart-table-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {cart.items.map((item: any, index: any) => {
              const total = item.price * item.quantity;

              return (
                <tr key={index}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-img"
                    />
                  </td>

                  <td className="product-name">{item.name}</td>

                  <td>
                    {item.quantityPerUnit} {item.unit}
                  </td>

                  <td>₹{item.price}</td>

                  <td>{item.quantity}</td>

                  <td className="item-total">₹{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartInfoPage;
