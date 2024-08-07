import React from 'react';
import lasagna from '../../assets/lasagna.JPG';
import ActionBtnGrid from '../ActionBtnGrid';
import BallBounce from '../BallBounce';

function Welcome() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();
  const isOpen = dayOfWeek >= 2 && dayOfWeek <= 6 && hour >= 10 && hour < 14;

  const welcomeContent = (
    <div id="welcome" className="h-full w-full rounded-b-3xl relative container">
      <div className="absolute h-full flex flex-col items-center justify-center">
        <div className="text-banner w-full max-w-[375px] drop-shadow-2xl flex flex-row justify-around">
          <div className="bg-white container rounded-bl-md px-4 py-2 flex flex-col justify-center items-start gap-2">
            <div className="flex items-center justify-center gap-2 w-full">
              <div id="days" className="flex flex-col flex-center justify-center items-center">
                <h3 className="text-sm font-bold">Tuesday - Saturday</h3>
                <h3 className="text-xs">10am-2pm</h3>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className={`text-xl ${isOpen ? 'bg-green-600' : 'bg-red-600'} text-white text-center text-sm font-bold p-1 rounded-br-lg h-full w-full flex items-center justify-center px-2`}>
              {isOpen ? "We're Open" : "We're Closed"}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center flex-wrap-reverse h-full">
          <div className="font-bold text-5xl text-white pb-40 drop-shadow-2xl">
            <div className="bg-white text-black p-2 py-4">
              <span className="text-mGreen stroke-2">Best</span> Lasagna In The <span className="text-mRed">City</span>
            </div>
          </div>
        </div>
      </div>
      <img className="object-cover h-[88%] w-full rounded-b-3xl" src={lasagna} alt="Lasagna pan" />
      <div className="absolute bottom-2 w-full rounded-lg px-4 flex flex-col gap-4">
        <ActionBtnGrid />
        <BallBounce />
      </div>
    </div>
  );

  return welcomeContent;
}

export default Welcome;
