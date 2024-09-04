import { Button } from "antd";
import React from "react";
import localGemsLogo from "../../assets/localgem.webp";

function LocalGems() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-between p-2 container">
      <header className="text-mRed text-xl flex items-center justify-center w-full h-[10%]">
        <div className="text-xl">3rd Party Services</div>
      </header>
      <main className="h-[78%] w-full bg-orange-200">
        <section>Although we don't offer our own catering, you can check out local gem to place a catering order along with other services.<p>This is not a service done by us, this is a 3rd Party</p></section>
      </main>
      <section className="relative flex items-center justify-center h-[12%]  max-w-xl w-full gap-2">
        <div className="flex items-center justify-between gap-2 w-full h-full p-2">
          <div className="basis-2/4 h-full drop-shadow-xl flex items-end justify-start">
            <img
              className="object-cover h-full rounded-xl"
              src={localGemsLogo}
              alt=""
            />
          </div>

          <div className="basis-1/4 flex flex-col gap-2 items-center h-full justify-center">
            <Button
              size="large"
              className="flex flex-col h-auto drop-shadow-xl p-2"
            >
              Visit Website
            </Button>
            <Button
              size="large"
              className="flex flex-col h-auto drop-shadow-xl p-2"
            >
              Visit Website
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LocalGems;
