import React from "react";
import ServiceItem from "./ServiceItem";
import plumberImg from "../assets/plumber@2x.png";
import homeRepImg from "../assets/repair@2x.png";
import mainAcImg from "../assets/maintenance@2x.png";
import pestConImg from "../assets/pest_control@2x.png";

const Services = () => {
  const serviceData = [
    {
      img: plumberImg,
      title: "Plumbing Services",
      description:
        "Are you having issues with your faucets and sinks? Common problems can include leaky faucets, low water pressure, clogged drains, hot water issues, loose faucet handles, and more.",
    },
    {
      img: homeRepImg,
      title: "Home Repair Services",
      description:
        "A smarter way to keep up with home maintenance. We provide home repair and maintenance services at your doorstep in Pakistan.",
    },
    {
      img: mainAcImg,
      title: "A.C Maintenance Services ",
      description:
        "Servicely offers flexible solutions for installation, removal and repair of your AC units at competitive prices in all Pakistani cities.",
    },
    {
      img: pestConImg,
      title: "Pest Control Services",
      description:
        "We provide professional pest control services for your home and business. Book highly experienced in-house professionals & get it done, Instantly.",
    },
  ];
  return (
    <>
      <main className="pt-20">
        <section className="w-4/5 m-auto ">
          <h1 className="text-base uppercase sm:text-xl md:text-3xl text-orange-500 font-medium text-center mb-20">
            HandyHome - Home Service Solution
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {serviceData.map((item, index) => {
              return (
                <ServiceItem
                  img={item.img}
                  title={item.title}
                  description={item.description}
                  key={index}
                />
              );
            })}
          </div>
        </section>
        <hr />
      </main>
    </>
  );
};

export default Services;
