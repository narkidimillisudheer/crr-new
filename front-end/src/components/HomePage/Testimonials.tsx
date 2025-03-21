import styles from "../../style";
import FeedBackCard from "./FeedBackCard";
import { feedback } from "../../constants";

const Testimonials = () => (
  <section
    id="clients"
    className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
  >
    <div className="z-[0] absolute w-2/3 h-2/3 -right-1/2 rounded-full blue__gradient" />
    <div
      className={`w-full full justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]`}
    >
      <h1 className={styles.heading2}>
      What our users <br className="sm:block hidden" /> say about us
      </h1>
      <div className={`w-full md:mt-0 mt-6`}>
        <p className={`${styles.paragraph} text-left max-w-[690px]`}>
        Our platform has helped teams proactively engage with customers, reduce churn, and make data-driven decisions.  
        See how businesses are using Customer Retention Radar to stay one step ahead and build stronger relationships.
        </p>
      </div>
    </div>

    <div
      className={`flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]`}
    >
      {feedback.map((item, index) => (
        <FeedBackCard key={item.id} {...item} />
      ))}
    </div>
  </section>
);

export default Testimonials;
