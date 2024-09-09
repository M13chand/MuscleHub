import React from "react";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-8  lg:px-16 flex flex-col md:flex-row items-center gap-8">
      {/* Contact Image */}
      <div className="flex-1">
        <img
          src="/src/assets/contactsection.jpg"
          alt="Contact Us"
          className="w-full rounded-lg shadow-md"
        />
      </div>

      {/* Contact Form */}
      <div className="flex-1 container">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactSection;
