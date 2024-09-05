import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="">
      <nav className=" flex items-center justify-between  px-3 bg-black text-white">
        <div className="h-[80px] w-[80px]">
          <img className="w-[100%]" src="/src/assets/logo.png" alt="logo" />
        </div>
        <div className="space-x-3 ">
          <Link className="hover:text-yellow-400 " to="/">
            Home
          </Link>
          <Link className="hover:text-yellow-400" to="/about">
            About
          </Link>
          <Link className="hover:text-yellow-400" to="/reviews">
            Reviews
          </Link>
          <Link className="hover:text-yellow-400" to="/services">
            Services
          </Link>
          <Link className="hover:text-yellow-400" to="/contact">
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Header;
