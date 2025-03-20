import { people01, people02, people03, facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, send, shield, star  } from "../assets"

export const navLinks = [
  {
    id: "#home",
    title: "Home",
  },
  {
    id: "#features",
    title: "Features",
  },
  {
    id: "#product",
    title: "Product",
  },
  {
    id: "#clients",
    title: "Clients",
  },
  {
    id:"/customer-login",
    title: "Customer Login",
  },
  {
    id: "/employee-login",
    title: "Employee Login",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Predictive Analytics",
    content:
      "Utilize machine learning models to accurately predict customers likely to leave and address churn proactively.",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "Secure Data Insights",
    content:
      "Your customer data is handled with utmost security while providing actionable insights for retention strategies.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Personalized Recommendations",
    content:
      "Generate real-time, sentiment-based suggestions and tailored offers to re-engage customers at risk of attrition.",
  },
];


export const feedback = [
  {
    id: "feedback-1",
    content:
      "The Retention Radar helped us identify customers at risk and retain them with timely offers. A game-changer!",
    name: "Herman Jensen",
    title: "Branch Manager, ABC Bank",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Thanks to predictive analytics, we’ve reduced churn and improved customer loyalty like never before.",
    name: "Steve Mark",
    title: "Customer Success Head, XYZ Bank",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "The recommendation engine provided actionable insights that transformed our retention strategy.",
    name: "Kenn Gallagher",
    title: "Director, Customer Relations",
    img: people03,
  },
];


export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];