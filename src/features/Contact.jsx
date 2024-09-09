import ContactSection from "./shared/ContactSection";
const Contact = () => {
  return (
    <div className="container mx-auto">
      {/* Contact Section */}
      <ContactSection />
      <h1
        className="text-2xl text-center md:text-left mb-4 
      ">
        What’s <span className="text-yellow-300">Stopping</span> you?
      </h1>
      {/* Google Map and Location Information */}
      <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row gap-8">
        {/* Google Map Section */}
        <div className="flex-1">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.498489892774!2d85.31476991506199!3d27.71312688278906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzQ3LjMiTiA4NcKwMTgnNTMuMSJF!5e0!3m2!1sen!2snp!4v1603262410185!5m2!1sen!2snp"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg shadow-md"></iframe>
        </div>

        {/* Location Information */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex-1">
            <img
              src="/src/assets/contactform.jpg"
              alt="Contact Us"
              className="w-max-sm h-[300px] rounded-lg shadow-md"
            />
          </div>
          <p className="mb-4">Visit us at:</p>
          <p className="font-semibold mb-2">Musclehub Fitness Center</p>
          <p>Budanilkantha, Bhangal 08, Kathmandu</p>
          <p>Contact Us: (123) 456-7890</p>
          <p>Email: info@musclehub.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
