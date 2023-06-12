import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import moment from "moment";

const Feedbacks = () => {
  const [data, setData] = useState([]);

  const token = useSelector((state) => state.profile.token);
  const sellerId = useSelector((state) => state.profile.userId);
  const name = useSelector((state) => state.profile.user);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/feedback?sellerId=${sellerId}`,
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

      setData(jsonData.feedback);
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderStarRating = (rating) => {
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return null; // Return null or handle the invalid rating case accordingly
    }

    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;

    return (
      <div className="star-rating">
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} className="star filled text-yellow-500" />
        ))}
        {[...Array(remainingStars)].map((_, index) => (
          <FaStar key={filledStars + index} className="star text-gray-400" />
        ))}
      </div>
    );
  };

  return (
    <main className="py-4 md:py-10">
      <section className="max-w-eighty m-auto mb-12">
        <h1 className="text-base uppercase sm:text-xl md:text-3xl text-orange-500 font-medium text-center mb-12">
          {name} Client Say's
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-red-500 text-center text-xl font-medium">
                Not reviewed yet
              </p>
            </div>
          ) : (
            data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-[#f6f6f6] p-6 rounded-lg shadow-2xl active:shadow-2xl transition-all duration-200 hover:shadow-none"
              >
                <p className="mb-4 text-[#757575] text-left">{item.feedback}</p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center flex-grow ml-6">
                    {item.imgURL && (
                      <img
                        src={item.imgURL}
                        alt={item.userName}
                        className="w-10 h-10 rounded-full mt-2"
                      />
                    )}
                    <div className="flex flex-col ml-4">
                      <h2 className="text-base font-medium">{item.userName}</h2>
                      <p className="text-gray-500 text-sm">
                        {moment(item.date).format("MMMM Do, YYYY")}
                      </p>
                    </div>
                  </div>
                  {renderStarRating(item.rating)}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <hr />
    </main>
  );
};

export default Feedbacks;
