import React from 'react';
import ViewsHeader from './ViewsHeader';
import { IonContent } from '@ionic/react';

function ViewWrapper({ header, main, viewName, footer }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify snap-center gap-2">
      {header && (
        <ViewsHeader viewName={viewName} />
      )}
      <IonContent className={`w-full h-full flex flex-col items-center justify-center ${header ? 'h-full' : 'h-[92%]'}`}>
        {main}
      </IonContent>
    </div>
  );
}

export default ViewWrapper;