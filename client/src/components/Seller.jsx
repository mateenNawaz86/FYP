import React from "react";
import customerImg from "../assets/customer.png";
import businessImg from "../assets/growth.png";
import wealthImg from "../assets/wealth.png";
import moneyImg from "../assets/money.png";
import SellerItem from "./SellerItem";

const Seller = () => {
  const data = [
    {
      img: customerImg,
      title: "Empowering Millions of Lives Through Technology.",
      desc: `Revolutionize your Business with Geo-Expansion using HandyHome's Innovative Web App`,
    },
    {
      img: businessImg,
      title:
        "Unlock Unlimited Growth Potential with Cost-Free Business Expansion Strategies.",
      desc: `Maximize Your Business Potential with HandyHome services - The All-Inclusive Platform for Seamless Growth and Enhanced Service Delivery.`,
    },
    {
      img: wealthImg,
      title:
        "Goodwill - The Foundation of Lasting Relationships and Successful Businesses.",
      desc: `Partner with HandyHome and Build Strong Customer Relationships to Boost Your Brand's Goodwill and Achieve Long-Term Success.`,
    },
    {
      img: moneyImg,
      title: "Maximize Profits, Zero Ads",
      desc: `With HandyHome services, focus on Exceptional Customer Service and Let Us Handle the Advertising for More Profitable Business Growth. No Ad Costs, More Earnings!`,
    },
  ];
  return (
    <>
      <main className="py-8">
        <section className="w-4/5 m-auto">
          <h1 className="text-base uppercase sm:text-xl md:text-3xl text-orange-500 font-medium text-center mb-12">
            Why become handyhome - service provider
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {data.map((item, index) => {
              return <SellerItem key={index} img={item.img} title={item.title} description={item.desc}/>;
            })}
          </div>
        </section>

        <hr />
      </main>
    </>
  );
};

export default Seller;
