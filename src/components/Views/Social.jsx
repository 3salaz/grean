import React from "react";
import { FaYelp, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import IG from "../../assets/Screenshot 2024-05-14 at 12.47.32 PM.png";

function Social() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-start snap-center">
      <div className="h-full w-full flex flex-col md:flex-row justify-between items-center px-2">
        <motion.a
          href="https://www.instagram.com/marcellaslasagneriasf/?hl=en"
          className="flex items-center justify-center w-full basis-1/2 bg-white rounded-lg drop-shadow-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            className="object-cover h-full w-full rounded-xl drop-shadow-xl"
            src={IG}
            alt="Instagram header"
          />
        </motion.a>

        <div className="flex flex-col items-center justify-center w-full basis-1/2 gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-3xl font-bold text-center w-full text-mGreen">
              Reviews
            </div>
            <div className="text-lg text-center">
              Help us grow by leaving a little review!
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <motion.button
              className="bg-[#4081EC] rounded-full text-white w-[80%] px-2 py-2 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                href="https://g.page/r/CbAgFdPSOXVFEB0/review"
                rel="noreferrer"
                target="_blank"
                className="w-full flex items-center justify-center"
              >
                <FaGoogle className="text-3xl" />
              </a>
            </motion.button>
            <motion.button
              className="bg-[#EF0000] rounded-full text-white w-[80%] px-2 py-3 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                href="https://www.yelp.com/writeareview/biz/F7UZBVdp69mTI_1M7stq2Q?return_url=%2Fbiz%2FF7UZBVdp69mTI_1M7stq2Q&review_origin=biz-details-war-button"
                rel="noreferrer"
                target="_blank"
                className="w-full flex items-center justify-center"
              >
                <FaYelp className="text-3xl" />
              </a>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Social;

