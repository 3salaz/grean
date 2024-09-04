import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo-Transparent.png";
import {
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonMenu,
  IonMenuButton,
  IonNav,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import App from "../../App";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">This is the menu content.</IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Tap the button in the toolbar to open the menu.</IonContent>
    </IonPage>
  </>
  );
};

export default Navbar;
