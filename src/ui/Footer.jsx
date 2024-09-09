import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" container mx-auto  ">
      <hr className="border-t-2 border-yellow-500 pb-7" />
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: About Musclehub */}
        <div>
          <img
            src="/src/assets/logo1.png"
            alt="Musclehub Logo"
            className="mb-4 h-20"
          />
          <p className="text-sm">
            Welcome to Musclehub, your ultimate fitness destination. We offer
            state-of-the-art facilities, expert trainers, and a variety of
            classes to help you achieve your fitness goals.
          </p>
          <p className="mt-4">Budanilkantha, Bhangal 08, Kathmandu</p>
        </div>

        {/* Middle Section: Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Classes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Trainers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Membership
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Contact Us
              </a>
            </li>
          </ul>
          <div className="mt-4 flex space-x-2">
            <a href="#" className="text-white hover:text-yellow-500">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white hover:text-yellow-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-white hover:text-yellow-500">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-yellow-500">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Right Section: Newsletter & Contact */}
        <div>
          <h4 className="font-bold mb-4">Stay Updated</h4>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 mb-4 w-full text-black rounded-md"
            />
            <button className="bg-yellow-500 text-white p-2 w-full rounded-md">
              Subscribe
            </button>
          </form>
          <p className="mt-4">Contact Us: (123) 456-7890</p>
          <p>Email: info@musclehub.com</p>
        </div>
      </div>
      <div className="text-center mt-8 text-sm p">
        © 2024 Musclehub. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
