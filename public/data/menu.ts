export type ServingKey = "one" | "three" | "five";

export type MenuItem = {
  id: number;
  name: string;
  slug: string;
  category: string;
  prices: {
    one: number;
    three?: number;
    five?: number;
  };
  image: string;
  description: string;
};
// Menu Items
export const menuItems: MenuItem[] = [
  // Kacchi
  {
    id: 1,
    name: "Basmati Kacchi",
    slug: "basmati-kacchi",
    category: "Kacchi",
    prices: { one: 330, three: 980, five: 1630 },
    image: "https://i.ibb.co.com/4w297JRL/25-agu-26-kacchi-1.jpg",
    description:
      "A traditional Basmati Kacchi, perfect blend of spices and tender meat.",
  },
  {
    id: 2,
    name: "Kacchi Khadak",
    slug: "kacchi-khadak",
    category: "Kacchi",
    prices: { one: 530, three: 1460, five: 2480 },
    image: "/kacchi_logo.jpeg",
    description:
      "Rich and flavorful Kacchi Khadak with a touch of traditional spices.",
  },
  {
    id: 3,
    name: "Basmati Kacchi with Borhani & Firni",
    slug: "basmati-kacchi-borhani-firni",
    category: "Kacchi",
    prices: { one: 460, three: 1370, five: 2280 },
    image:
      "https://i.ibb.co.com/zh8kygSJ/25-agu-26-muttton-kacchi-borhani-firni.jpg",
    description:
      "Classic Kacchi served with refreshing Borhani and sweet Firni.",
  },
  {
    id: 4,
    name: "Basmati Kacchi with Badam Sharbat & Jali Kabab",
    slug: "basmati-kacchi-badam-jali-kabab",
    category: "Kacchi",
    prices: { one: 470, three: 1390, five: 2300 },
    image:
      "https://i.ibb.co.com/xSj5L8NF/25-agu-26-muttton-kacchi-badam-sharbat-jali-kabeb.jpg",
    description:
      "Kacchi with Badam Sharbat and Jali Kabab for an exquisite combo.",
  },
  {
    id: 5,
    name: "Basmati Kacchi with Chicken Roast, Borhani & Jali Kabab",
    slug: "basmati-kacchi-chicken-roast",
    category: "Kacchi",
    prices: { one: 590, three: 1760, five: 2890 },
    image:
      "https://i.ibb.co.com/7JTNZ2fF/25-agu-26-muttton-kacchi-package-4.jpg",
    description:
      "Deluxe Kacchi combo with Chicken Roast, Borhani, and Jali Kabab.",
  },
  {
    id: 6,
    name: "Basmati Kacchi with Mutton Rezala, Borhani & Jali Kabab",
    slug: "basmati-kacchi-khasi-rezala",
    category: "Kacchi",
    prices: { one: 640, three: 1880, five: 3150 },
    image:
      "https://i.ibb.co.com/dwSQWP08/25-agu-26-muttton-kacchi-package-5.jpg",
    description: "Kacchi served with Mutton Rezala, Borhani, and Jali Kabab.",
  },

  // Chicken Dum Biryani
  {
    id: 7,
    name: "Chicken Dum Biryani",
    slug: "chicken-dum-biryani",
    category: "Chicken Biryani",
    prices: { one: 220, three: 650, five: 1070 },
    image: "https://i.ibb.co.com/9HZYY437/26-agu-26-dum-biriyani.jpg",
    description: "Classic Chicken Dum Biryani, aromatic and full of flavor.",
  },
  {
    id: 8,
    name: "Chicken Dum Biryani with Borhani & Firni",
    slug: "chicken-biryani-borhani-firni",
    category: "Chicken Biryani",
    prices: { one: 350, three: 1030, five: 1720 },
    image: "https://i.ibb.co.com/Fq7bdxgT/26-agu-26-dum-biriyani-jpg-02.jpg",
    description: "Chicken Biryani served with cooling Borhani and sweet Firni.",
  },
  {
    id: 9,
    name: "Chicken Dum Biryani with Badam Sharbat & Jali Kabab",
    slug: "chicken-biryani-badam-jali-kabab",
    category: "Chicken Biryani",
    prices: { one: 360, three: 1060, five: 1770 },
    image:
      "https://i.ibb.co.com/F4y89LhQ/26-agu-26-dum-biriyani-package-03.jpg",
    description:
      "Special Chicken Biryani combo with Badam Sharbat and Jali Kabab.",
  },

  // Mutton Tehari
  {
    id: 10,
    name: "Mutton Tehari",
    slug: "mutton-tehari",
    category: "Mutton Tehari",
    prices: { one: 270, three: 790, five: 1320 },
    image: "https://i.ibb.co.com/N6KnBPYM/25-agu-26-mutton-tehari.jpg",
    description: "Authentic Mutton Tehari cooked with perfect spices.",
  },
  {
    id: 11,
    name: "Mutton Tehari with Borhani & Firni",
    slug: "mutton-tehari-borhani-firni",
    category: "Mutton Tehari",
    prices: { one: 410, three: 1210, five: 2020 },
    image:
      "https://i.ibb.co.com/hFPYhrC1/25-agu-26-mutton-tehari-package-1.jpg",
    description: "Mutton Tehari combo with refreshing Borhani and Firni.",
  },
  {
    id: 12,
    name: "Mutton Tehari with Badam Sharbat & Jali Kabab",
    slug: "mutton-tehari-badam-jali-kabab",
    category: "Mutton Tehari",
    prices: { one: 410, three: 1210, five: 2020 },
    image:
      "https://i.ibb.co.com/hF12Bkdt/25-agu-26-mutton-tehari-package-2.jpg",
    description: "Special Mutton Tehari with Badam Sharbat and Jali Kabab.",
  },
  {
    id: 13,
    name: "Mutton Tehari with Chicken Roast, Borhani & Firni",
    slug: "mutton-tehari-chicken-roast",
    category: "Mutton Tehari",
    prices: { one: 550, three: 1630, five: 2720 },
    image: "/kacchi_logo.jpeg",
    description:
      "Premium combo of Mutton Tehari, Chicken Roast, Borhani & Firni.",
  },

  // Mutton Chaap
  {
    id: 22,
    name: "Plain Polao with Mutton Chaap",
    slug: "plain-polao-mutton-chaap",
    category: "Mutton Chaap",
    prices: { one: 290, three: 860, five: 1430 },
    image: "https://i.ibb.co.com/WpvkmBZD/25-agu-26-mutton-chaap.jpg",
    description: "Plain Polao served with traditional Mutton Chaap.",
  },
  {
    id: 23,
    name: "Plain Polao with Mutton Chaap, Borhani",
    slug: "plain-polao-mutton-chaap-borhani",
    category: "Mutton Chaap",
    prices: { one: 370, three: 1080, five: 1820 },
    image: "https://i.ibb.co.com/QFJsFHRj/25-agu-26-mutton-chaap-2.jpg",
    description: "Plain Polao with Mutton Chaap and refreshing Borhani.",
  },
  {
    id: 24,
    name: "Plain Polao with Mutton Chaap, Badam Sharbat & Jali Kabab",
    slug: "plain-polao-mutton-chaap-badam-jali-kabab",
    category: "Mutton Chaap",
    prices: { one: 440, three: 1300, five: 2170 },
    image: "https://i.ibb.co.com/qY7gLg8V/25-agu-26-mutton-chaap-3.jpg",
    description:
      "Mutton Chaap with Plain Polao, Badam Sharbat, and Jali Kabab.",
  },

  // Polao
  {
    id: 14,
    name: "Plain Polao with Chicken Roast & Borhani",
    slug: "plain-polao-chicken-roast",
    category: "Polao",
    prices: { one: 320, three: 950, five: 1580 },
    image: "https://i.ibb.co.com/yHNQTv8/25-agu-26-polao-roast.jpg",
    description: "Soft Plain Polao served with Chicken Roast and Borhani.",
  },
  {
    id: 15,
    name: "Plain Polao with Mutton Rezala & Borhani",
    slug: "plain-polao-khasi-rezala",
    category: "Polao",
    prices: { one: 360, three: 1050, five: 1750 },
    image: "https://i.ibb.co.com/sdXJbJqy/25-agu-26-polao-rezala.jpg",
    description: "Polao combo with Mutton Rezala and refreshing Borhani.",
  },
  {
    id: 16,
    name: "Plain Polao with Chicken Roast, Borhani & Jali Kabab",
    slug: "plain-polao-chicken-jali-kabab",
    category: "Polao",
    prices: { one: 390, three: 1150, five: 1920 },
    image: "https://i.ibb.co.com/sp1x034V/25-agu-26-polao-roast-jpg-3.jpg",
    description:
      "Complete Polao combo with Chicken Roast, Borhani, and Jali Kabab.",
  },

  // Others
  {
    id: 17,
    name: "Plain Polao",
    slug: "plain-polao",
    category: "Others",
    prices: { one: 120 },
    image: "/kacchi_logo.jpeg",
    description: "Simple and classic Plain Polao.",
  },
  {
    id: 18,
    name: "Chicken Roast",
    slug: "chicken-roast",
    category: "Others",
    prices: { one: 150 },
    image: "/kacchi_logo.jpeg",
    description: "Tender and juicy Chicken Roast.",
  },
  {
    id: 19,
    name: "Mutton Chaap",
    slug: "mutton-chaap",
    category: "Others",
    prices: { one: 220 },
    image: "/kacchi_logo.jpeg",
    description: "Traditional Mutton Chaap.",
  },
  {
    id: 20,
    name: "Mutton Rezala",
    slug: "mutton-rezala",
    category: "Others",
    prices: { one: 200 },
    image: "/kacchi_logo.jpeg",
    description: "Flavorful Mutton Rezala with aromatic spices.",
  },
  {
    id: 21,
    name: "Jali Kabab",
    slug: "jali-kabab",
    category: "Others",
    prices: { one: 60 },
    image: "/kacchi_logo.jpeg",
    description: "Crispy Jali Kabab, perfect side dish.",
  },
  {
    id: 25,
    name: "Chutney",
    slug: "chutney",
    category: "Others",
    prices: { one: 30 },
    image: "/kacchi_logo.jpeg",
    description: "Fresh chutney to complement your meal.",
  },

  // Desserts & Drinks
  {
    id: 26,
    name: "Badam Sharbat",
    slug: "badam-sharbat",
    category: "Desserts & Drinks",
    prices: { one: 90 },
    image: "/kacchi_logo.jpeg",
    description: "Refreshing Badam Sharbat.",
  },
  {
    id: 27,
    name: "Borhani",
    slug: "borhani",
    category: "Desserts & Drinks",
    prices: { one: 80 },
    image: "/kacchi_logo.jpeg",
    description: "Traditional spiced yogurt drink.",
  },
  {
    id: 28,
    name: "Firni",
    slug: "firni",
    category: "Desserts & Drinks",
    prices: { one: 70 },
    image: "/kacchi_logo.jpeg",
    description: "Traditional creamy Firni dessert.",
  },
  // {
  //   id: 29,
  //   name: "Jorda",
  //   slug: "jorda",
  //   category: "Desserts & Drinks",
  //   prices: { one: 70 },
  //   image: "/kacchi_logo.jpeg",
  //   description: "Sweet Bengali Jorda rice.",
  // },
  // {
  //   id: 30,
  //   name: "Doi",
  //   slug: "doi",
  //   category: "Desserts & Drinks",
  //   prices: { one: 70 },
  //   image: "/kacchi_logo.jpeg",
  //   description: "Traditional yogurt dessert.",
  // },
];

export const categories = [
  "Kacchi",
  "Chicken Biryani",
  "Mutton Chaap",
  "Mutton Tehari",
  "Polao",
  "Others",
];
