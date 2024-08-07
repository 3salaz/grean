import React from 'react';

function BallBounce() {
  return (
    <div className="flex justify-center items-center gap-1">
      <div className="flex justify-center items-center md:justify-start w-full gap-1">
        <div className="bg-mYellow p-1 w-[80%] max-w-[400px] rounded-full"></div>
        <span className="bg-mYellow p-1 w-1 h-1 rounded-full ball-bounce"></span>
        <span className="bg-mYellow p-1 w-1 h-1 rounded-full ball-bounce"></span>
        <span className="bg-mYellow p-1 w-1 h-1 rounded-full ball-bounce"></span>
      </div>
    </div>
  );
}

export default BallBounce;