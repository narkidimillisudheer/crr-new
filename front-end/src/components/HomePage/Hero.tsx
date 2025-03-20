import React from "react";
import styles from "../../style";
import { discount, robot } from "../../assets";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row justify-between items-center w-full text-white">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[44px] text-[40px] ss:leading-[100px] leading-[75px]">
          The Future of  <br className="sm:block hidden" />
            <span className="text-gradient">Customer Retention. </span>
          </h1>
          <div className="flex-1 ss:flex hidden md:mr-8 mr-0">
            <GetStarted />
          </div>
        </div>

        <h1 className="text-white flex-1 font-poppins font-semibold ss:text-[44px] text-[52px] ss:leading-[100px] leading-[75px]">
        Predict. Engage. Retain.
        </h1>
        <p className={`${styles.paragraph} mt-5 max-w-[470px]`}>
          Our intelligent system identifies customers likely to leave the bank 
          and suggests tailored offers and recommendations to retain them. 
          Leverage predictive analytics and feedback analysis to strengthen customer 
          relationships and stay ahead in today's competitive banking environment.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img
          src={robot}
          alt="robot image"
          className="w-full h-full relative z-[5]"
        />
        <div className="absolute z-0 w-[40%] h-[35%] top-0 pink__gradient"></div>
        <div className="absolute z-1 w-[80%] h-[85%] rounded-full bottom-40 white__gradient"></div>
        <div className="absolute z-0 w-[50%] h-[50%] right-20  bottom-20 blue__gradient"></div>
      </div>
      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted/>
      </div>
    </section>
  );
};

export default Hero;
