// MyOrders.jsx
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';
import '../pagesStylesheet/MyOrders.css';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="my-orders-container">
      <div className="orders-header">
        <p className="orders-title">My Orders</p>
        <div className="orders-underline"></div>
      </div>

      {myOrders.map((order, index) => (
        <div key={index} className="order-card">
          <p className="order-info">
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: {currency}{order.amount}</span>
          </p>

          {order.items.map((item, idx) => (
            <div
              key={idx}
              className={`order-item ${order.items.length !== idx + 1 ? 'with-border' : ''}`}
            >
              <div className="item-details">
                <div className="item-image-wrapper">
                  <img src={item.product.image[0]} alt="" className="item-image" />
                </div>
                <div className="item-info">
                  <h2 className="item-name">{item.product.name}</h2>
                  <p>Category: {item.product.category}</p>
                </div>
              </div>

              <div className="item-meta">
                <p>Quantity: {item.quentity || "1"}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <p className="item-amount">
                Amount: {currency}{item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
