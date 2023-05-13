import React from "react";
import { TbArrowBadgeRight } from "react-icons/tb";

const Working = () => {
  const workingData = [
    {
      step: 1,
      title: "Register Yourself",
      desc: `Users can create an account by providing their necessary details
            such as name, email, and password. Implement a registration form
            and a secure authentication system to manage user accounts.`,
    },
    {
      step: 2,
      title: "Service Provider Listings",
      desc: `Service providers create profiles on our web app. They can provide information about their expertise, experience, services offered, pricing, and other relevant details.`,
    },
    {
      step: 3,
      title: "Service Search",
      desc: `Users can browse and search for service providers based on various criteria such as location, service category, ratings, and reviews.`,
    },
    {
      step: 4,
      title: "Select Service Provider",
      desc: `Find and review nearby service providers. Browse profiles, read reviews, and choose the perfect match for your needs. Simplify your search process with our platform.`,
    },
    {
      step: 5,
      title: "Book Service",
      desc: `Find, review, and book top service providers effortlessly. Browse profiles, assess expertise, and make informed decisions for seamless service booking.`,
    },
    {
      step: 6,
      title: "Call / Chat to Service Provider",
      desc: `Reach out to service provider, discuss job details over call, share visuals if needed, and determine fair price for services.`,
    },
    {
      step: 7,
      title: "Receive Email & SMS Verification",
      desc: `We have implemented a secure and efficient system where buyers will receive both email and SMS verifications upon successfully booking a service. This verification process ensures the authenticity and confirmation of their booking.`,
    },
    {
      step: 8,
      title: "Finish Job & Payment to Provider",
      desc: `Upon successful completion of the work, proceed to make the payment to the service provider and obtain confirmation of the transaction to ensure a seamless and professional transaction process.`,
    },
    {
      step: 9,
      title: "Review & Rating",
      desc: `Rate the job and provide feedback on the service and provider.`,
    },
  ];
  return (
    <>
      <main className="py-4 md:py-10">
        <section className="w-4/5 m-auto mb-12">
          <h1 className="text-lg uppercase sm:text-xl md:text-3xl text-orange-500 font-semibold text-center mb-12">
            How it Works
          </h1>
          <article className="flex justify-between flex-col gap-4">
            {workingData.map((item, index) => {
              return (
                <div
                  className="flex justify-between flex-col gap-2"
                  key={index}
                >
                  <div className="flex items-center text-orange-500">
                    <TbArrowBadgeRight className="text-3xl" />
                    <span className=" ml-1 bg-[#4280EA] w-fit py-1 px-6 text-sm rounded-full text-white">
                      Step {item.step}
                    </span>
                  </div>
                  <div className="ml-10">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-[#757575]"> {item.desc} </p>
                  </div>
                </div>
              );
            })}
          </article>
        </section>
        <hr />
      </main>
    </>
  );
};

export default Working;
