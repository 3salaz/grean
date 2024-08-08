import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_marcellas",
        "template_4y4xx4h",
        form.current,
        "OXVmMrXHHOEpr832j"
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset(); // Reset the form fields
          toast.success("Your message has been sent successfully!"); // Show success toast notification
        },
        (error) => {
          console.log(error.text);
          toast.error("There was an error sending your message. Please try again."); // Show error toast notification
        }
      );
  };

  return (
    <section className="w-full h-full flex items-center justify-center bg-mYellow px-4">
      <ToastContainer />
      <div className="container max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-mGreen">Send Us A Message!</h2>
            <p className="text-xs text-gray-700 mt-2">
              Bringing a large group? Looking to collab on our social media?
              Maybe you just want to send some love to the crew! Whatever it is,
              just send us a message and we'll get back to you as soon as we
              can.
            </p>
          </div>

          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 text-mGreen">
            <div className="flex flex-col">
              <label className="mb-1">Name</label>
              <input
                type="text"
                name="user_name"
                className="rounded-md border border-mGreen focus:ring-mGreen focus:border-mGreen p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Email</label>
              <input
                type="email"
                name="user_email"
                className="rounded-md border border-mGreen focus:ring-mGreen focus:border-mGreen p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                className="rounded-md border border-mGreen focus:ring-mGreen focus:border-mGreen p-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-1">Your message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="block w-full text-sm text-mGreen bg-gray-50 rounded-lg border border-mGreen focus:ring-mGreen focus:border-mGreen p-2.5"
                placeholder="Leave a comment..."
                required
              ></textarea>
            </div>
            <div className="text-center mt-4">
              <input
                type="submit"
                value="Send"
                className="rounded-lg bg-mRed drop-shadow-lg px-4 py-2 text-white cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
