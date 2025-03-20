import { apple, bill, google } from "../../assets";
import styles, { layout } from "../../style";

const Billing = () => {
  return (
    <section id="product" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img
          src={bill}
          alt="billing"
          className="h-[100%] w-[100%] relative z-[5]"
        />
        <div className="absolute z-[3] -left-1/2 top-0 w-1/2 h-1/2 rounded-full white__gradient" />
        <div className="absolute z-[0] -left-1/2 bottom-0 w-1/2 h-1/2 rounded-full pink__gradient" />
      </div>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
        Seamlessly monitor and <br className="sm:block hidden" /> track customer retention
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Gain full control over customer churn predictions and actionable insights.  
        Stay updated with real-time data, track leaving customers, and offer personalized retention strategies — all from one unified dashboard.
        </p>
      </div>
    </section>
  );
};

export default Billing;
