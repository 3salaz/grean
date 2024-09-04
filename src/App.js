import React from "react";
import {
  IonApp,
  IonPage,
  IonTabs,
  IonTabButton,
  IonTabBar,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navigation/Navbar";
import LoginComponent from "./components/Auth/LoginComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import { MenuProvider } from "./context/MenuContext";
import ErrorBoundary from "./components/ErrorBoundry";
import Preorder from "./pages/Preorder";
import Loader from "./components/Loader";
import MenuPage from "./pages/MenuPage";
import { cartOutline, homeOutline, listOutline } from "ionicons/icons";

// Lazy load your main pages
const Home = lazy(() => import("./pages/Home"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <MenuProvider>
          <ErrorBoundary>
            <IonPage id="main-content">
              {/* Navbar Section */}
              <Navbar />

              {/* Tabs and Main Content Section */}
              <IonTabs>
                <IonRouterOutlet>
                  <Suspense fallback={<Loader />}>
                    <Switch>
                      <Route exact path="/home" component={Home} />
                      <Route path="/login" component={LoginComponent} />
                      <Route path="/preorder" component={Preorder} />
                      <Route path="/menu" component={MenuPage} />
                      <ProtectedRoute path="/admin" component={AdminPage} />
                      <Redirect exact path="/" to="/home" />
                    </Switch>
                  </Suspense>
                </IonRouterOutlet>

                {/* Tab Bar Section */}
                <IonTabBar slot="bottom">
                  <IonTabButton tab="preorder" href="/preorder">
                    <IonIcon icon={cartOutline} />
                    <IonLabel>Preorder</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="home" href="/home">
                    <IonIcon icon={homeOutline} />
                    <IonLabel>Home</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="menu" href="/menu">
                    <IonIcon icon={listOutline} />
                    <IonLabel>Menu</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonPage>
          </ErrorBoundary>
        </MenuProvider>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
