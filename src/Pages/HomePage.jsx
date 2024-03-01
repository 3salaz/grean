import React from "react";
import lasagna from "../Assets/lasagna.JPG";
import { Link } from "react-router-dom";
import Featured from "../Components/Featured";

import lasagnaIcon from "../Assets/lasagna-icon.webp";

const WelcomeMessage = () => <div>Welcome Message</div>;
const MenuHighlights = () => <div>Menu Highlights</div>;
const AboutUs = () => <div>About Us</div>;
const Reservation = () => <div>Reservation Form</div>;
const Gallery = () => <div>Photo Gallery</div>;
const Reviews = () => <div>Reviews/Testimonials</div>;
const ContactInfo = () => <div>Contact Information</div>;
const Footer = () => <div>Footer Links</div>;

function HomePage() {
  return (
    <div className="h-[100svh] overflow-auto snap-y snap-mandatory">
      <div className="h-full container mx-auto">
        <div className="h-full relative snap-start container">
          <img
            className="object-cover h-[90%] w-full rounded-b-2xl"
            src={lasagna}
            alt="Lasagna pan"
          ></img>
          <div className="absolute container bottom-10 h-[15%] z-5 w-full px-20">
            <div className="h-full grid grid-rows-3 grid-flow-col gap-2">
              <div className="bg-white drop-shadow-xl rounded-md row-span-4 col-span-1">
                <img
                  className="w-32 h-full"
                  src={lasagnaIcon}
                  alt="lasagna icon"
                />
              </div>
              <div className="row-span-1 col-span-3 flex items-center justify-end gap-4">
                <div className="instagram-logo text-white drop-shadow-xl rounded-md h-full aspect-square flex items-center justify-center">
                  <ion-icon size="large" name="logo-instagram"></ion-icon>
                </div>
                <div className="bg-[#4267B2] text-white drop-shadow-xl rounded-md h-full aspect-square flex items-center justify-center">
                  <ion-icon size="large" name="logo-facebook"></ion-icon>
                </div>
              </div>
              <div className="bg-white drop-shadow-xl rounded-md row-span-2 col-span-2 flex items-center justify-center">
                <button>Order Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full snap-start pt-20 px-2">
          <Featured />
        </div>
        <div className="h-full snap-start pt-20 px-2">Contact Form</div>

        {/* <WelcomeMessage />
      <MenuHighlights />
      <AboutUs />
      <Reservation />
      <Gallery />
      <Reviews />
      <ContactInfo />
      <Footer /> */}
      </div>
    </div>
  );
}

export default HomePage;
