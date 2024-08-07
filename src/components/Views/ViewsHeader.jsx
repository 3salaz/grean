import React from "react";

function ViewsHeader({ viewName }) {
  return (
    <header className="w-full h-[8%] flex items-center justify-centers container px-2">
      <div className="flex gap-2 rounded-lg w-full container bg-mRed p-2">
        <div className="text-xl font-bold text-white text-center w-full">
          {viewName}
        </div>
      </div>
    </header>
  );
}

export default ViewsHeader;
