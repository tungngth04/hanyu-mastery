"use client";

import Banner from "../../atoms/landing-page/banner";
import Features from "../../atoms/landing-page/features";
import Footer from "../../atoms/landing-page/footer";
import Header from "../../atoms/landing-page/header";
import Section from "../../atoms/landing-page/section";
import Stats from "../../atoms/landing-page/stats";

const LandingPage: React.FC = () => {
  return (
    <div className={`landing-page flex flex-col min-h-screen bg-white`}>
      <Header />
      <Banner />
      <Features />
      <Stats />
      <Section />
      <Footer />
    </div>
  );
};

export default LandingPage;
