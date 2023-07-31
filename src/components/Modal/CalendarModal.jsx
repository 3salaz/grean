import Backdrop from "../Backdrop";
import { motion } from "framer-motion";

function CalendarModal({ handleClose}) {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex items-center justify-center min-h-screen from-red-100 via-red-300 to-red-500 bg-gradient-to-br"
      >
        <div className="w-full flex items-end justify-end">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 stroke-slate-400 text-white rounded-xl p-1 w-8 h-8 flex justify-center text-center items-center"
            onClick={handleClose}
          >
            <ion-icon
              className="stroke-slate-500"
              size="large"
              name="close-circle-outline"
            ></ion-icon>
          </motion.button>
        </div>
        <div className="w-full max-w-lg p-6 mx-auto bg-white rounded-2xl shadow-xl flex flex-col">
          <div className="flex justify-between pb-4">
            <div className="-rotate-90 cursor-pointer">
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.001 6L6.00098 1L1.00098 6"
                  stroke="black"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="uppercase text-sm font-semibold text-gray-600">
              january - 2022
            </span>
            <div className="rotate-90 cursor-pointer">
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.001 6L6.00098 1L1.00098 6"
                  stroke="black"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
            <div className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-red-500 text-red-500 shadow-md">
              sun
            </div>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              mon
            </span>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              tue
            </span>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              wed
            </span>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              thu
            </span>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              fri
            </span>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              sat
            </span>
          </div>

          <div className="flex justify-between font-medium text-sm pb-2">
            <span className="px-1 text-gray-400 w-14 flex justify-center items-center">
              30
            </span>

            <span className="px-1 text-gray-400 w-14 flex justify-center items-center">
              31
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              01
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              02
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              03
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              04
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              05
            </span>
          </div>

          <div className="flex justify-between font-medium text-sm pb-2">
            <span className="px-1 w-14 flex justify-center items-center border border-red-500 text-red-500 cursor-pointer">
              06
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              07
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              08
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              09
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              10
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              11
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              12
            </span>
          </div>

          <div className="flex justify-between font-medium text-sm pb-2">
            <span className="px-1 w-14 flex justify-center items-center border border-red-500 text-red-500 cursor-pointer">
              13
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              14
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              15
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              16
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              17
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              18
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              19
            </span>
          </div>

          <div className="flex justify-between font-medium text-sm pb-2">
            <span className="px-1 w-14 flex justify-center items-center border border-red-500 text-red-500 cursor-pointer">
              20
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              21
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              22
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              23
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              24
            </span>

            <span className="px-1 w-14 flex justify-center items-center border border-green-500 text-white bg-green-500 rounded-2xl cursor-pointer shadow-md">
              25
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              26
            </span>
          </div>

          <div className="flex justify-between font-medium text-sm pb-2">
            <span className="px-1 w-14 flex justify-center items-center border border-red-500 text-red-500 cursor-pointer">
              27
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              28
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              29
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              30
            </span>

            <span className="px-1 text-gray-400 w-14 flex justify-center items-center">
              01
            </span>

            <span className="px-1 text-gray-400 w-14 flex justify-center items-center">
              02
            </span>

            <span className="px-1 text-gray-400 w-14 flex justify-center items-center">
              03
            </span>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default CalendarModal;
