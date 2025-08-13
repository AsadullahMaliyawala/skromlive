import React from "react";
import HeroBanner from "./HeroBanner";
import PlayModes from "./PlayModes";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";

const Home = () => {
  return (
    <main>
      <HeroBanner />
      <PlayModes />
      {/* <Categories /> */}
      <NewArrival />
      <PromoBanner />
      {/* <CounDown /> */}
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
