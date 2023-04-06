import React from "react";
import aboutImg from "../assets/electerician.jpg";
import Button from "./Button";

const About = () => {
  return (
    <>
      <main>
        <section className="w-4/5 m-auto py-20">
          <h1 className="text-3xl text-[#4280EA] font-medium text-center">
            About Us
          </h1>
          <p className="text-center text-base text-[#212529] font-medium md:text-xl tracking-wide py-6">
            HandyHome is a platform providing facility of various kind of
            services on an web app.
          </p>
          <article className="flex justify-between flex-col md:flex-row">
            <div className="flex justify-center flex-col items-center basis-2/7">
              <p className="text-base text-[#757575] md:text-lg pb-6">
                At HandyHome, we are a team of dedicated professionals who are
                passionate about providing high-quality home services to our
                customers. We understand that maintaining a home can be a
                daunting task, which is why we offer a range of services to help
                you keep your home in top condition. Our team is carefully
                selected and trained to ensure that they provide exceptional
                service with a personal touch. We believe in transparency and
                honesty, which is why we provide upfront pricing and customized
                solutions to meet your unique needs. Our goal is to make your
                life easier by providing reliable, convenient, and affordable
                home services. Contact us today to schedule your service and
                experience the difference!
              </p>
              <Button>Read More</Button>
            </div>
            <div className="right-side mt-10 basis-2/7">
              <img src={aboutImg} alt="aboutImg" className="rounded-md" />
            </div>
          </article>
        </section>
        <hr />
      </main>
    </>
  );
};

export default About;