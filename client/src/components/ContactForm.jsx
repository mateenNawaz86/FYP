import React, { useState } from "react";
import OrangeButton from "../UI/OrangeButton";

const ContactForm = () => {
  const [enteredInp, setEnteredInp] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const inputChangeHandler = (event) => {
    setEnteredInput({
      ...enteredInp,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { name, email, subject, message };

    // Send form data to the backend API
    fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Email sent successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("Error sending email");
      });
  };
  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={enteredInp.name}
          onChange={inputChangeHandler}
          className="block w-full border border-[#757575] py-2 px-3 rounded-sm outline-none hover:border-[#E74133]"
        />
        <input
          type="email"
          name="email"
          id="email"
          value={enteredInp.email}
          onChange={inputChangeHandler}
          placeholder="Enter your email"
          className="block w-full border border-[#757575] py-2 px-3 rounded-sm outline-none hover:border-[#E74133]"
        />
        <input
          type="text"
          name="subject"
          id="subject"
          value={enteredInp.subject}
          onChange={inputChangeHandler}
          placeholder="Enter your subject"
          className="block w-full border border-[#757575] py-2 px-3 rounded-sm outline-none hover:border-[#E74133]"
        />
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="5"
          value={enteredInp.message}
          onChange={inputChangeHandler}
          className="block w-full border border-[#757575] py-2 px-3 rounded-sm outline-none hover:border-[#E74133] resize-y"
        ></textarea>
        <OrangeButton>Send Message</OrangeButton>
      </form>
    </>
  );
};

export default ContactForm;
