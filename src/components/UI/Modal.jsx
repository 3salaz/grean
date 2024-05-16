import React from "react";
import ReactDOM from "react-dom";
import {motion} from "framer-motion";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-green-800 bg-opacity-90 flex items-center justify-center z-20 px-2">
      <div className="relative w-full p-2 bg-mYellow rounded-md max-w-[600px] min-h-[80vh] overflow-y-auto drop-shadow-2xl flex items-center justify-center">
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-5 right-5 cursor-pointer rounded-full bg-mRed text-white aspect-square"
        >
          <ion-icon size="large" name="close-circle-outline"></ion-icon>
        </motion.button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
