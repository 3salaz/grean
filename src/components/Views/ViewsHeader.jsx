import React from "react";

function ViewsHeader({ viewName }) {
  return (
    <header className="w-full h-[10%] bg-mRed flex items-center justify-center shadow-xl">
      <div className="flex gap-2 rounded-lg w-full container">
        <div className="text-3xl font-bold text-white text-center w-full">
          {viewName}
        </div>
      </div>
    </header>
  );
}

export default ViewsHeader;
