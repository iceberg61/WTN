'use client'
import React from "react";
import HeaderSlider from "../components/shop/HeaderSlider";
import HomeProducts from "../components/shop/HomeProducts";
// import Banner from "@components/shop/Banner";
// import NewsLetter from "@/components/shop/NewsLetter";
// import FeaturedProduct from "@/components/shop/FeaturedProduct";
import Navbar from "../components/shop/Navbar";
// import Footer from "@/components/shop/Footer";


const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts /> 
        {/*<FeaturedProduct />
        <Banner />
        <NewsLetter /> */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
