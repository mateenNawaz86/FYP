import React from "react";
import OrangeButton from "../UI/OrangeButton";

const ContactForm = () => {
  return (
    <>
      <form className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          className="block w-full border border-[#757575] py-2 px-3 rounded-sm outline-none hover:border-[#E74133]"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          className="block w-full border border-[#757575] py-2 px-3 rounded-sm outline-none hover:border-[#E74133]"
        />
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Enter your subject"
          className="block w-full border border-[#757575] py-2 px-3 rounded-sm outline-none hover:border-[#E74133]"
        />
        <textarea name="message" id="message" cols="30" rows="5"  className="block w-full border border-[#757575] py-2 px-3 rounded-sm outline-none hover:border-[#E74133] resize-y"></textarea>
        <OrangeButton>Send Message</OrangeButton>
      </form>
    </>
  );
};

export default ContactForm;
