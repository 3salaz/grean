import React from "react";
import Featured from "../components/Views/Featured";
import Footer from "../components/Views/Footer";
import Welcome from "../components/Views/Welcome";
import Social from "../components/Views/Social";
import Contact from "../components/Views/Contact";
import ViewWrapper from "../components/Views/ViewWrapper";

function HomePage() {
  return (
    <div className="h-full w-full snap-y snap-mandatory overflow-y-scroll">
      <ViewWrapper header={false} main={<Welcome />}  />
      <ViewWrapper header={true} main={<Featured />} viewName="Featured" />
      <ViewWrapper header={true} main={<Social />} viewName="Social" />
      <ViewWrapper header={true} main={<Contact />} viewName="Contact" />
      <ViewWrapper header={false} main={<Footer />} />
    </div>
  );
}

export default HomePage;