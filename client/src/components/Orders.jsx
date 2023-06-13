import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Orders = (props) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();

      setData(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      // Set the selected service provider
      const selectedProvider = data.find((item) => item._id === orderId);

      if (!selectedProvider) {
        throw new Error("Service provider not found");
      }

      const sellerId = selectedProvider.serviceProvider;
      navigate(`/feedback/${sellerId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filteredOrders = data.filter((item) => item.status === props.status);

  return (
    <>
      {filteredOrders.map((item) => {
        const formattedTime = moment(item.date).format("HH:mm");
        const formattedDate = moment(item.date).format("DD-MM-YYYY");
        return (
          <div
            key={item._id}
            className="flex justify-around items-center flex-col mb-3 sm:flex-row py-4 px-6 bg-[#f6f6f6] rounded shadow-md w-full"
          >
            <p>${item.price}</p>
            <div className="flex flex-col">
              <p>{formattedTime}</p>
              <p>{formattedDate}</p>
            </div>
            <p>{item.status}</p>
            <div className="flex flex-col gap-2 mt-4 sm:mt-0">
              {item.status === "active" && (
                <button
                  onClick={() => handleStatusUpdate(item._id, "complete")}
                  className="bg-green-500 hover:bg-green-600 transition-all ease-linear py-1 px-2 rounded text-white"
                >
                  Mark as Complete
                </button>
              )}
              {item.status === "active" && (
                <button
                  onClick={() => handleStatusUpdate(item._id, "cancel")}
                  className="bg-red-500 hover:bg-red-600 transition-all ease-linear py-1 px-2 rounded text-white"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Orders;
