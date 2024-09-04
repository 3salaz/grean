import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";

function Loader() {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <div role="status" aria-live="polite">
            Loading...
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default Loader;
