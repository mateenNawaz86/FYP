import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SellerEarnings = () => {
  const [earnings, setEarnings] = useState({
    currentMonthEarnings: 0,
    totalEarnings: 0,
  });
  const token = useSelector((state) => state.profile.token);
  const name = useSelector((state) => state.profile.user);

  useEffect(() => {
    fetchEarnings();
    // eslint-disable-next-line
  }, []);

  const fetchEarnings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/seller-earnings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();

      setEarnings(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="py-4 md:py-6">
      <section className="w-4/5 m-auto mb-12">
        <h1 className="text-lg uppercase sm:text-xl md:text-3xl text-orange-500 font-semibold text-center mb-6">
          {name} Earning
        </h1>
        {earnings.currentMonthEarnings === 0 && earnings.totalEarnings === 0 ? (
          <h2 className="text-red-500 font-semibold text-2xl text-center">
            No Earning Yet!
          </h2>
        ) : (
          <div className="flex flex-col bg-[#f6f6f6] p-6 rounded-lg shadow-2xl active:shadow-2xl transition-all duration-200 hover:shadow-none">
            <h2 className="text-xs sm:text-lg text-orange-600 font-medium">
              Current Month Earnings:
              <span className="text-[#757575] ml-4">
                ${earnings.currentMonthEarnings}
              </span>
            </h2>
            <h2 className="text-xs sm:text-lg text-orange-600 font-medium">
              Total Earnings:
              <span className="text-[#757575] ml-4">
                ${earnings.totalEarnings}
              </span>
            </h2>
          </div>
        )}
      </section>

      <hr />
    </main>
  );
};

export default SellerEarnings;
