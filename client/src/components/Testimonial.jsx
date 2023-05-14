import React from "react";
import userOneImg from "../assets/user1.jpg";
import userTwoImg from "../assets/user2.jpg";
import userThreeImg from "../assets/user-3.jpg";
import userFourImg from "../assets/user-4.jpg";
import { FaStar } from "react-icons/fa";

const Testimonial = () => {
  const rating = [...Array(5)].map(() => <FaStar />);
  const userData = [
    {
      name: "Marry",
      feedback:
        "I am very impressed with the service I received from this seller. The product I purchased was of high quality and arrived promptly.",
      userImg: userOneImg,
      date: "December 2022",
    },
    {
      name: "John Smith",
      feedback:
        "I recently used this service seller and I must say I was thoroughly impressed with their professionalism and attention to detail.",
      userImg: userTwoImg,
      date: "August 2021",
    },
    {
      name: "Mark Miller",
      feedback:
        "Great experience with this seller! The service provided was top-notch and delivered promptly. Communication was clear and professional, making the process smooth and stress-free.",
      userImg: userThreeImg,
      date: "May 2022",
    },
    {
      name: "Horeena",
      feedback:
        "I had a fantastic experience working with this seller. Their attention to detail and dedication to providing the best possible service was evident in every step of the process. The end result exceeded my expectations and I couldn't be happier.",
      userImg: userFourImg,
      date: "June 2020",
    },
  ];

  return (
    <main className="py-4 md:py-10">
      <section className="max-w-eighty m-auto mb-12">
        <h1 className="text-base uppercase sm:text-xl md:text-3xl text-orange-500 font-medium text-center mb-12">
          What Our Client Say's
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {userData.map((item, index) => {
            return (
              <div
                key={index}
                // eslint-disable-next-line
                className="flex flex-col bg-[#fff] p-6 rounded-lg shadow-2xl active:shadow-2xl transition-all duration-200 hover:shadow-none"
              >
                <p className="mb-4 text-[#757575] text-left">{item.feedback}</p>

                <div className="flex justify-between items-center">
                  <img
                    src={item.userImg}
                    alt="User"
                    className="rounded-full h-14"
                  />
                  <div className="flex flex-col flex-grow ml-6">
                    <h2 className="text-base font-medium">{item.name}</h2>
                    <p className="text-[#757575] text-xs">{item.date}</p>
                  </div>
                  <span className="text-orange-500">{rating}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr />
    </main>
  );
};

export default Testimonial;
