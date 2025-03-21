import { features } from "../../constants";
import styles, { layout } from "../../style";
import Button from "./Button";

const FeatureCard = ({title, content, icon, index }:any) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length-1 ? 'mb-6': 'mb-0'} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full bg-dimBlue ${styles.flexCenter}`}>
      <img src={icon} alt="icon" className="h-1/2 w-1/2 object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">{title}</h4>
      <p className="font-poppins text-dimWhite text-[18px] leading-[23px] mb-1">{content}</p>
    </div>
  </div>
);


const Business = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Focus on Your Customers, <br className="sm:block hidden" /> We’ll Help
      Retain Them.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Our Customer Retention Radar uses predictive analytics and feedback
        analysis to identify customers likely to leave. We help you engage them
        with personalized offers, actionable insights, and proactive retention
        strategies to strengthen relationships and reduce churn.
      </p>
      <Button styles="mt-10"/>
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {
        features.map((feature) => (
          <FeatureCard key={feature.id} {...feature}/>)
        )
      }
    </div>
  </section>
);

export default Business;
