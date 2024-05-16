import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_d6aj2lw",
        "template_lmnmfvs",
        form.current,
        "tx3Q3atJsYPq2xTPe"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    
    <form ref={form} onSubmit={sendEmail} className="flex flex-col p-4 gap-2 text-mGreen">
      <label>Name</label>
      <input
        type="text"
        name="user_name"
        className="rounded-md border border-mGreen focus:ring-mGreen focus:border-mGreen"
      />
      <label>Email</label>
      <input
        type="text"
        name="subject"
        className="rounded-md border border-mGreen focus:ring-mGreen focus:border-mGreen"
      />
      <label>Subject</label>
      <input
        type="email"
        name="user_email"
        className="rounded-md border border-mGreen focus:ring-mGreen focus:border-mGreen line-clamp-1"
      />

      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-mGreen "
      >
        Your message
      </label>
      
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-mGreen bg-gray-50 rounded-lg border border-mGreen focus:ring-mGreen focus:border-mGreen"
        placeholder="Leave a comment..."
      ></textarea>
      <input
        onClick={sendEmail}
        type="submit"
        value="Send"
        className="rounded-lg bg-mRed drop-shadow-lg px-4 py-2 text-white "
      />
    </form>
  );
}

export default ContactForm;
