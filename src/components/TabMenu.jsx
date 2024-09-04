import React from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import {
  playCircle,
  radio,
  library,
  search,
  radioOutline,
  listOutline,
  cartOutline,
  homeOutline,
} from "ionicons/icons";
import { Route, Redirect } from "react-router-dom";

import HomePage from "../pages/Home";
import MenuPage from "../pages/MenuPage";
import Preorder from "../pages/Preorder";

function TabMenu() {
  return (
    <IonTabs color="primary">
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        <Route path="/tabs/home" component={HomePage} exact={true} />
        <Route path="/tabs/preorder" component={Preorder} exact={true} />
        <Route path="/tabs/menu" component={MenuPage} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" color="primary">
        <IonTabButton tab="home" href="/preorder">
          <IonIcon icon={cartOutline} />
          <IonLabel>Preorder</IonLabel>
        </IonTabButton>

        <IonTabButton tab="home" href="/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="radio" href="/menu">
          <IonIcon icon={listOutline} />
          <IonLabel>Menu</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default TabMenu;
