import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const SellerOrders = (props) => {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.profile.token);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/seller-orders", {
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

  const getStatusClassName = (status) => {
    if (status === "active") {
      return "bg-green-600";
    } else if (status === "complete") {
      return "bg-blue-500";
    } else if (status === "cancel") {
      return "bg-red-500";
    }
    return ""; // Return an empty string if the status doesn't match any condition
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
            <div className="flex flex-col justify-center items-center">
              <p>{formattedTime}</p>
              <p>{formattedDate}</p>
            </div>
            <p
              className={`text-white font-medium text-lg py-1 mt-3 sm:mt-0 px-3 rounded ${getStatusClassName(
                item.status
              )}`}
            >
              {item.status}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default SellerOrders;
