import React from "react";
import ServiceItem from "./ServiceItem";
import plumberImg from "../assets/plumber@2x.png";
import homeRepImg from "../assets/repair@2x.png";
import mainAcImg from "../assets/maintenance@2x.png";
import elecSvcImg from "../assets/electrical@2x.png";
import carWashImg from "../assets/carwash.png";
import pestConImg from "../assets/pest_control@2x.png";
import carPenImg from "../assets/carpenter@2x.png";
import cleaningImg from "../assets/cleaning.png";
import firstAdImg from "../assets/medic.png";
import catSolImg from "../assets/degh.png";
import homeShiftImg from "../assets/HomeShift.png";

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
    {
      img: elecSvcImg,
      title: "Electricity Services",
      description:
        "We provide the best residential and commercial electrical services for your power needs. Request service and get offers from best service providers in all electrical services.",
    },
    {
      img: carWashImg,
      title: "Car Wash Service",
      description:
        "Servicely offers complete solution for car washing, car cleaning, auto detailing and dry cleaning services at doorstep; simultaneously it is environment friendly and suitable for saving the precious time.",
    },
    {
      img: carPenImg,
      title: "Carpentry Services",
      description:
        "Our professional carpenters will redesign your home, making it appear exceptionally stylish at an affordable price. Book online furniture repair and carpentry services.",
    },
    {
      img: cleaningImg,
      title: "Cleaning Service",
      description:
        "Are you having issues with your faucets and sinks? Common problems can include leaky faucets, low water pressure, clogged drains, hot water issues, loose faucet handles, and more.",
    },
    {
      img: firstAdImg,
      title: "First Aid",
      description:
        "Servicely provides facility of First Aid Treatment at your doorstep. In case of an emergency with the help of Servicely app you can directly connect with nearest clinic.",
    },
    {
      img: catSolImg,
      title: "Catering Solution",
      description:
        "Servicely offers complete prepared food solution for your events/parties with professionals and experienced partners.",
    },
    {
      img: homeShiftImg,
      title: "Home Shifting Services",
      description:
        "Servicely helps to take the entire relocation burden off from the customers shoulders and helps to provide the most trusted shifting service solution.",
    },
  ];
  return (
    <>
      <main className="pt-20">
        <section className="w-4/5 m-auto ">
          <h1 className="text-base sm:text-xl md:text-3xl text-orange-500 font-medium text-center mb-20">
            HandyHome - Home Service Solution
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
