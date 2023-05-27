import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
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
          method: "PUT", // or "PATCH" depending on your API implementation
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      // Refresh the order data
      fetchData();
      navigate(`/api/orders/${orderId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  

  return (
    <>
      {data.map((item) => {
        const formattedTime = moment(item.date).format("HH:mm");
        return (
          <div
            key={item._id}
            className="flex justify-between items-center flex-col sm:flex-row py-4 px-6 bg-[#f6f6f6] rounded shadow-md w-full"
          >
            <img src="" alt="" className="hidden sm:block" />
            <p>${item.price}</p>
            <p>{formattedTime}</p>
            <p>{item.status}</p> {/* Display the status */}
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
