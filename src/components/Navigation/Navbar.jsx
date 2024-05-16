import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo-Transparent.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky h-[8svh]">
      {/* Main Navigation Bar */}
      <nav className="bg-mGreen h-full text-white py-2 px-4 top-0 w-full z-10 drop-shadow-2xl flex items-center justify-center">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">
            <a href="/" className="hover:text-gray-300">
              <img
                className="w-32 rounded-md bg-white drop-shadow-2xl"
                src={Logo}
                alt="Logo"
              />
            </a>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-mRed bg-white rounded-full aspect-square h-10 p-1 drop-shadow-xl md:hidden"
          >
            <ion-icon name="menu-outline" size="large"></ion-icon>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-gray-300">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Side Menu for Mobile */}
      <nav
        className={`absolute drop-shadow-xl top-0 z-50 ${
          isOpen ? "left-0" : "-left-full"
        } h-full bg-white border-t-transparent border-r-transparent border-l-mGreen border-2 w-64 p-5 transition-all duration-300 md:hidden z-50`}
      >
        <ul className="flex flex-col space-y-4 bg-white">
          <li>
            <Link
              to="/"
              className="hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className="hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
