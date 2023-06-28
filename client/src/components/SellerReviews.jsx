import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import Spinner from "../UI/Spinner";

const BuyerReviews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();
      setData(jsonData.feedbacks);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  const renderStarRating = (rating) => {
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return null;
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
          Seller Reviews
        </h1>
        {loading ? (
          // Render spinner when loading is true
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.length === 0 ? (
              <div className="flex items-center justify-center">
                <p className="text-red-500 text-center text-xl font-medium">
                  No reviews found
                </p>
              </div>
            ) : (
              data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-[#f6f6f6] p-6 rounded-lg shadow-2xl active:shadow-2xl transition-all duration-200 hover:shadow-none"
                >
                  <p className="mb-4 text-[#757575] text-left">
                    {item.feedback}
                  </p>

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
                        <h2 className="text-base font-medium">
                          {item.userName}
                        </h2>
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
        )}
      </section>
      <hr />
    </main>
  );
};

export default BuyerReviews;
