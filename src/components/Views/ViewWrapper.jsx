import React from 'react';
import ViewsHeader from './ViewsHeader';

function ViewWrapper({ header, main, viewName, footer }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify snap-center gap-2">
      {header && (
        <ViewsHeader viewName={viewName} />
      )}
      <section className={`w-full h-full flex flex-col items-center justify-center ${header ? 'h-full' : 'h-[92%]'}`}>
        {main}
      </section>
    </div>
  );
}

export default ViewWrapper;