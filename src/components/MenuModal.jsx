import React from "react";
import menu1 from "../../Assets/marcellas_menu_2023-1.png";
import menu2 from "../../Assets/marcellas_menu_2023-2.png";

function MenuModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed flex items-center justify-center top-0 overflow-auto snap-x snap-mandatory hide-scroll overscroll-none w-full bg-white">
      <div className="container w-full mx-auto bg-green-300">
        <div className="h-full relative snap-start container z-20 flex flex-col items-center justify-center gap-3">
          <img className="" src={menu1} alt="menu 1"></img>
          <img src={menu2} alt="menu 2"></img>
        </div>
        <div className="h-full relative snap-start container z-20">
            
        </div>

        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default MenuModal;
