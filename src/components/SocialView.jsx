import React from "react";
import InstagramEmbed from "./InstagramEmbed";

import { FaYelp, FaGoogle } from "react-icons/fa";
import ViewsHeader from "./ViewsHeader";
import IG from '../assets/Screenshot 2024-05-14 at 12.47.32 PM.png';
import {motion } from 'framer-motion';

function SocialView() {
  return (
    <div className="h-full snap-center">
      <div className="w-full h-full flex flex-col md:flex-row justify-between items-center">
        <ViewsHeader viewName="Social" />

        <div className="flex flex-col items-center justify-between h-full w-full px-2">
          <div className="flex-items-center justify-center w-full basis-1/2">
            {/* <InstagramEmbed url="https://www.instagram.com/marcellaslasagneriasf/?utm_source=ig_embed&amp;utm_campaign=loading" /> */}
            <img className="object-cover h-full w-full" src={IG} alt="ig header" />
          </div>

          <div className="flex flex-col items-center justify-center w-full basis-1/2 gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-3xl font-bold text-center w-full">Reviews</div>
              <div className="text-lg line-clamp-3 text-center">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae est assumenda pariatur ducimus corrupti eos nostrum
                ea minus, officia recusandae ratione beatae ut placeat adipisci
                iure, facere delectus id tempora.
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 container">
              <div className="basis-1/2 h-full w-full flex items-center justify-center">
                <motion.button className="bg-[#4081EC] rounded-full text-white w-[80%] px-2 py-2 flex flex-col items-center gap-4"                 whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                  <a
                    href="https://g.page/r/CbAgFdPSOXVFEB0/review"
                    rel="noreferrer"
                    target="_blank"
                    className="w-full flex items-center justify-center"
                  >
                    <FaGoogle className="text-3xl" />
                  </a>
                </motion.button>
              </div>
              <div className="basis-1/2 h-full w-full flex items-center justify-center">
                <motion.button className="bg-[#EF0000] rounded-full text-white w-[80%] px-2 py-3 flex flex-col items-center gap-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                  <a href="https://www.yelp.com/writeareview/biz/F7UZBVdp69mTI_1M7stq2Q?return_url=%2Fbiz%2FF7UZBVdp69mTI_1M7stq2Q&review_origin=biz-details-war-button" rel="noreferrer" target="_blank" className="w-full flex items-center justify-center">
                    <FaYelp className="text-3xl" />
                  </a>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialView;
