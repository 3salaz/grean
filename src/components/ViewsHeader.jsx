import React from 'react'

function ViewsHeader({viewName}) {
  return (
    <header className="w-full flex items-center justify-center p-2">
    <div className="flex gap-2 p-4 bg-mRed rounded-lg w-full shadow-xl container">
      <div className="text-3xl font-bold text-white text-center w-full">
        {viewName}
      </div>
    </div>
  </header>
  )
}

export default ViewsHeader