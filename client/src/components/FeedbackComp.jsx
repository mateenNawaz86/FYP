import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const FeedbackComp = ({ selectedServiceProvider }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleFeedbackSubmit = async (selectedServiceProviderId) => {
    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          serviceProviderId: selectedServiceProviderId,
          rating,
          feedback,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      // Handle successful feedback submission, e.g., show a success message or redirect to a confirmation page
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFeedbackSubmit(selectedServiceProvider._id);
    navigate("/service-seaker");
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const renderStarIcons = () => {
    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
      starIcons.push(
        <FaStar
          key={i}
          className={
            i <= rating
              ? "text-yellow-500 cursor-pointer text-4xl"
              : "text-gray-400 cursor-pointer text-4xl"
          }
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return starIcons;
  };

  return (
    <main className="py-4 md:py-8">
      <section className="w-4/5 md:w-1/2 m-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <label
              htmlFor="rating"
              className="text-xl sm:text-3xl text-orange-400 font-medium tracking-wider"
            >
              Leave a rating
            </label>
            <div className="flex items-center justify-center">
              {renderStarIcons()}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="feedback"
              className="text-xl sm:text-3xl text-orange-400 font-medium tracking-wider"
            >
              Leave a Feedback
            </label>
            <textarea
              name="feedback"
              id="feedback"
              cols="30"
              rows="5"
              className="bg-[#f6f6f6] py-1 px-2"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <Button type="submit" variant="contained" className="w-fit">
            Booking
          </Button>
        </form>
      </section>
    </main>
  );
};

export default FeedbackComp;
