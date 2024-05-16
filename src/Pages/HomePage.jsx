import React from "react";
import FeaturedView from "../components/FeaturedView";
import FooterView from "../components/FooterView";
import LandingView from "../components/LandingView";
import SocialView from "../components/SocialView";
import ContactView from "../components/ContactView";

function HomePage() {
  return (
    <main className="h-[92svh] overflow-auto snap-y snap-mandatory hide-scroll overscroll-none w-full">
      <section className="h-full container w-full mx-auto">
        <LandingView />
        <FeaturedView />
        <SocialView />
        <ContactView />
        <FooterView />
      </section>
    </main>
  );
}

export default HomePage;
