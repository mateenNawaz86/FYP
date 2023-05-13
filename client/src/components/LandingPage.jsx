import React from "react";
import BlueButton from "../UI/BlueButton";

import landingImg from "../assets/landing.png";
import mobLandingImg from "../assets/mobile-landing.png";

const LandingPage = () => {
  return (
    <>
      <div>
        <img
          src={mobLandingImg}
          alt="Landing"
          className="object-cover w-auto lg:hidden"
        />
        <img
          src={landingImg}
          alt="Landing"
          className="object-cover w-auto hidden lg:block"
        />
      </div>
      <div className="flex flex-col px-4 py-10 md:bg-white md:shadow-lg md:p-10 md:w-11/13 md:mx-auto md:-translate-y-10 md:rounded lg:shadow-none lg:absolute lg:top-48 lg:left-24 lg:bg-transparent lg:w-fit xl:top-52">
        <h2 className="text-xl font-semibold lg:text-2xl xl:text-3xl">
          The Efficient & Rapid Approach
        </h2>
        <p className="py-3 text-base font-normal lg:py-4 lg:w-1/2 ">
          Looking for a reliable and hassle-free way to tackle household tasks?
          Our platform is the ultimate destination for homeowners seeking
          top-rated and verified service providers. With our trusted network of
          local companies and on-site authentication, finding nearby service
          providers has never been easier. Trust us to connect you with trusted
          professionals who will get the job done right.
        </p>
        <div className="mt-3 flex flex-col items-start xsm:flex-row xsm:justify-start xsm:items-center lg:flex-col lg:items-start lg:mt-0 xl:flex-row xl:items-baseline">
          <BlueButton>Get In Touch</BlueButton>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
