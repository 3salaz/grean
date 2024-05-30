import React from 'react';
import ViewsHeader from './ViewsHeader';

function ViewWrapper({ header, main, viewName }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify snap-center p-2 gap-2">
      {header && (
        <ViewsHeader viewName={viewName} />
      )}
      <section className={`w-full flex flex-col items-center justify-center ${header ? 'h-full' : 'bg-white h-[90%]'}`}>
        {main}
      </section>
    </div>
  );
}

export default ViewWrapper;
