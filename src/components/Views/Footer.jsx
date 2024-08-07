import React from "react";
import Logo from "../../assets/Logo-Transparent.png";
import marcellasVideo from "../../assets/footer.MP4";

function Footer() {
  return (
    <footer id="footer" className="bg-white rounded-lg  w-full snap-center h-full">
      <div className="relative h-full w-full flex flex-col justify-end">
        <div className="absolute h-full w-full bg-green-300">
          <video className="w-full h-full object-cover" autoPlay={true} muted={true} loop src={marcellasVideo}></video>
        </div>
        <div className="relative w-full max-w-screen-xl mx-auto p-4 md:py-8 z-20 bg-white">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={Logo} className="h-8" alt="Marcellas Lasagneria Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                🍝 🇮🇹
              </span>
            </a>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-mGreen lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:underline">
              Marcellas Lasagneria™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
