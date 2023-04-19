import React from "react";
import { SlCallIn } from "react-icons/sl";
import { TbMailForward } from "react-icons/tb";
import ContactForm from "../components/ContactForm";

const ContactUs = () => {
  return (
    <>
      <main>
        <section className="max-w-eighty m-auto mb-12">
          <h1 className="text-base uppercase sm:text-xl md:text-3xl text-orange-500 font-medium text-center mb-20">
            Get In Touch
          </h1>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="flex items-center">
                <SlCallIn className="text-xl font-semibold text-[#E74133]" />
                <div className="flex flex-col ml-6">
                  <h2 className="text-lg font-medium">+92 332 1234543</h2>
                  <p className="text-[#757575] text-sm">
                    Monday to Saturday, 7am to 8pm
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <TbMailForward className="text-xl font-semibold text-[#E74133]" />
                <div className="flex flex-col ml-6">
                  <h2 className="text-lg font-medium">info@gmail.com</h2>
                  <p className="text-[#757575] text-sm">
                    Email us for your query
                  </p>
                </div>
              </div>
            </div>
            <div className="form">
              <ContactForm />
            </div>
          </div>
        </section>
        <hr />
      </main>
    </>
  );
};

export default ContactUs;
