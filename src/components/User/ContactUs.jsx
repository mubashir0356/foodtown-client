import axios from "axios";
import React, { useState } from "react";
import configVariables from "../../configurations/config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const jwtToken = Cookies.get("jwtToken");
  const navigate = useNavigate();

  const handleContactForm = async (e) => {
    e.preventDefault();
    const body = {
      name,
      email,
      subject,
      message,
    };

    try {
      const response = await axios.post(
        `${configVariables.ipAddress}/contact/queryform`,
        body,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Your Query is sent successfully!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log("Contact Us :: Form Error: ", error);
    }
  };

  return (
    <div className="px-3 sm:px-10 pb-8 mb-12 sm:mb-0 min-h-96 dark:bg-gray-800">
      <h1 className="mb-5 text-center font-bold underline text-lg dark:text-white">
        Contact For Any Query
      </h1>
      <form
        id="contactForm"
        className="mx-auto max-w-xl p-6 border border-slate-300 shadow-md rounded-lg dark:border-gray-600"
        onSubmit={handleContactForm}
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="full-name"
              className="text-lg font-semibold dark:text-white"
            >
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="full-name"
              className="mt-1 w-full shadow-sm sm:text-sm border border-slate-400 rounded-md focus:outline-none px-2 py-2 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="email-address"
              className="text-lg font-semibold dark:text-white"
            >
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email-address"
              className="mt-1 w-full shadow-sm sm:text-sm border border-slate-400 rounded-md focus:outline-none px-2 py-2 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="subject"
              className="text-lg font-semibold dark:text-white"
            >
              Subject
            </label>
            <input
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              name="subject"
              id="subject"
              className="mt-1 w-full shadow-sm sm:text-sm border border-slate-400 rounded-md focus:outline-none px-2 py-2 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Subject"
              required
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="message"
              className="text-lg font-semibold dark:text-white"
            >
              Message
            </label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              name="message"
              rows="5"
              className="mt-1 w-full shadow-sm sm:text-sm border border-slate-400 rounded-md focus:outline-none px-2 py-2 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Leave a message here"
              required
            ></textarea>
          </div>
          <div className="col-span-6">
            <button
              type="submit"
              className="w-full py-3 border border-slate-400 rounded-md shadow-md focus:outline-none dark:border-gray-600 dark:text-white dark:bg-gray-700"
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactUs;
