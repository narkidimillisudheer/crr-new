import React from "react";
import styles, { layout } from "../../style";
import Button from "./Button";
import { card } from "../../assets";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Get actionable customer <br className="sm:block hidden" /> retention insights in minutes.
      </h2>
      <p className={`${styles.paragraph} mt-5 max-w-[47-px]`}>
      Easily identify customers likely to leave, view their behavior patterns, and receive AI-powered recommendations.  
      Empower your team to take proactive measures and improve customer satisfaction — all through one smart dashboard.
      </p>
      <Button styles="mt-10"/>
    </div>
    <div className={layout.sectionImg}>
      <img src={card} alt="card image" className="h-full w-full" />
    </div>
  </section>
);

export default CardDeal;
