import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./UI/Modal";
import menuLunch1 from "../assets/marcellas_menu_2023-1.png";
import menuLunch2 from "../assets/marcellas_menu_2023-2.png";
import menuCatering1 from "../assets/catering-menu-1.png";
import menuCatering2 from "../assets/catering-menu-2.png";
import Lightbox from "./Lightbox";
import Button from "./UI/Button";
import { useNavigate } from "react-router-dom";

function ActionBtnGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuType, setMenuType] = useState("lunch");
  const carouselRef = useRef(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const navigate = useNavigate();

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const resetScroll = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="container mx-auto grid grid-rows-5 grid-cols-5 grid-flow-col h-32 px-4">
      {/* Call */}
      <div className="flex items-center justify-center col-span-2 row-span-3">
        <Button
          color="danger"
          size="large"
          roundness="full"
          className="aspect-square border-2 border-white drop-shadow-xl"
          withIcon={<ion-icon name="call-outline" size="large"></ion-icon>}
          iconPosition="left"
          link="tel:+14159202225"
        />
      </div>

      {/* Social Links
      <div className="flex items-center justify-center gap-2 col-span-3 row-span-2 p-1">
        <a
          href="https://www.facebook.com/marcellaslasagneria/"
          target="_blank"
          rel="noreferrer"
          className="bg-[#4267B2] text-white drop-shadow-xl rounded-md h-[90%] aspect-square flex items-center justify-center"
        >
          <ion-icon size="large" name="logo-facebook"></ion-icon>
        </a>

        <a
          href="https://www.youtube.com/channel/UCvSzZgB-27Llh-IllTqGL7Q"
          target="_blank"
          rel="noreferrer"
          className="bg-[#FF0000] text-white drop-shadow-xl rounded-md h-[90%] aspect-square flex items-center justify-center"
        >
          <ion-icon size="large" name="logo-youtube"></ion-icon>
        </a>

        <a
          href="https://www.instagram.com/marcellaslasagneriasf/?hl=en"
          target="_blank"
          rel="noreferrer"
          className="instagram-logo text-white drop-shadow-xl rounded-md h-[90%] aspect-square flex items-center justify-center "
        >
          <ion-icon size="large" name="logo-instagram"></ion-icon>
        </a>
      </div> */}

      {/* Menu Link */}
      <div className="flex flex-col gap-2 items-center justify-center col-span-3 row-span-3">
        <motion.button
          className="bg-white drop-shadow-xl shadow-xl rounded-md w-full h-[80%] font-bold p-2"
          onClick={() => navigate("/preorder")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Preorder
        </motion.button>
        <motion.button
          className="bg-mYellow drop-shadow-xl shadow-xl rounded-md w-full h-[80%] font-bold p-2"
          onClick={openModal}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Menu
        </motion.button>
      </div>
      <AnimatePresence>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-3xl font-bold py-4">
            {menuType === "lunch" ? "Lunch" : "Catering"} Menu
          </h1>

          {menuType === "lunch" ? (
            <div
              className="flex items-center rounded-lg justify-start gap-4 overflow-auto snap-x snap-mandatory hide-scroll overscroll-none w-full h-[55vh] aspect-[3/4] bg-mGreen drop-shadow-2xl"
              ref={carouselRef}
            >
              <div className="rounded-md text-white snap-center h-full drop-shadow-xl aspect-[3/4] bg-mGreen">
                <img
                  className="h-full object-fit cursor-pointer"
                  src={menuLunch1}
                  alt="lunch menu 1"
                  onClick={() => openLightbox(menuLunch1)}
                />
              </div>
              <div className="bg-mGreen text-white snap-center h-full drop-shadow-xl aspect-[3/4]">
                <img
                  className="h-full object-fit cursor-pointer"
                  src={menuLunch2}
                  alt="lunch menu 2"
                  onClick={() => openLightbox(menuLunch2)}
                />
              </div>
            </div>
          ) : (
            <div
              className="flex items-center rounded-lg justify-start gap-4 overflow-auto snap-x snap-mandatory hide-scroll overscroll-none w-full h-[55vh] aspect-[3/4] bg-mGreen"
              ref={carouselRef}
            >
              <div className="rounded-md text-white snap-center h-full aspect-[3/4]">
                <img
                  className="h-full object-fit cursor-pointer"
                  src={menuCatering1}
                  alt="Catering Menu"
                  onClick={() => openLightbox(menuCatering1)}
                />
              </div>
              <div className="bg-mGreen text-white snap-center h-full drop-shadow-xl aspect-[3/4]">
                <img
                  className="h-full object-fit cursor-pointer"
                  src={menuCatering2}
                  alt="Catering Menu"
                  onClick={() => openLightbox(menuCatering2)}
                />
              </div>
            </div>
          )}

          <div className="flex item-center justify-end gap-2 w-full">
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="bg-white text-mGreen rounded-full p-2 aspect-square flex items-center justify-center border-mGreen border-1 border"
            >
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="bg-white text-mGreen rounded-full p-2 aspect-square flex items-center justify-center border-mGreen border-1 border"
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
          </div>

          <button
            className="border-1 border-white border bg-mGreen text-white px-3 py-2 rounded-md"
            onClick={() => {
              setMenuType((prevMenuType) => {
                const newMenuType =
                  prevMenuType === "lunch" ? "catering" : "lunch";
                resetScroll();
                return newMenuType;
              });
            }}
          >
            Switch to {menuType === "lunch" ? "Catering" : "Lunch"} Menu
          </button>
        </div>
      </Modal>
      </AnimatePresence>

      {lightboxImage && (
        <Lightbox
          src={lightboxImage}
          alt="Enlarged Menu"
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}

export default ActionBtnGrid;
