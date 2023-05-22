import React from "react";
// import { Link } from "react-router-dom";
import experienceImg from "../assets/goal.png";
import phoneImg from "../assets/phone.png";
import simImg from "../assets/sim.png";
import centreImg from "../assets/Business-center.png";
import ageImg from "../assets/age.png";
import bgCheckImg from "../assets/bgcheck.png";
import SellerItem from "./SellerItem";

const Requirements = () => {
  const reqData = [
    {
      img: experienceImg,
      title: "Experience",
      desc: `You should have atleats 2 years of Experince forin relative field to register with HandyHome.`,
    },
    {
      img: phoneImg,
      title: "Smartphone",
      desc: `You will need an Android or iPhone device to receive bookings on HandyHome.`,
    },
    {
      img: simImg,
      title: "Registered Mobile Number",
      desc: `You should have registered mobile number where customer can call after booking the job.`,
    },
    {
      img: centreImg,
      title: "Registered Business Center Address",
      desc: `You should have a registered business center address such as office or shop address.`,
    },
    {
      img: ageImg,
      title: "Age",
      desc: `You have to be over 18 years of age with a valid CNIC card to register with HandyHome.`,
    },
    {
      img: bgCheckImg,
      title: "Background Check",
      desc: `The Background Check process may include drug tests, police reports, credit checks etc.`,
    },
  ];
  return (
    <>
      <main className="py-8">
        <section className="w-4/5 m-auto">
          <h1 className="text-base uppercase sm:text-xl md:text-3xl text-orange-500 font-medium text-center mb-12">
            Requirements
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {reqData.map((item, index) => {
              return (
                <SellerItem
                  key={index}
                  img={item.img}
                  title={item.title}
                  description={item.desc}
                />
              );
            })}
          </div>
        </section>

        {/* <div className="flex justify-center items-center mb-10">
          <Link
            to="/create-profile"
            className="bg-transparent text-[#f44336] border border-[#f44336] hover:text-[#fff] hover:bg-[#f44336] transition-all duration-300 rounded-sm w-fit p-1 px-4"
          >
            Become Service Provider
          </Link>
        </div> */}
        <hr />
      </main>
    </>
  );
};

export default Requirements;
