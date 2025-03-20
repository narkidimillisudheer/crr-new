import React from "react";
import Button from "./Button";
import styles from "../../style";

const CTA = () => (
  <section
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient rounded-[20px] box-shadow`}
  >
    <div className="flex flex-col flex-1">
      <h2 className={styles.heading2}>
      Start Retaining Customers Today! <br />
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Discover which customers are at risk and take action with smart recommendations.  
      Boost loyalty, improve engagement, and make data-backed decisions — all in one place.
      </p>
    </div>
    <div>
      <Button styles="" />
    </div>
  </section>
);

export default CTA;
