export const expert1 = {
  whatICreate: [
    {
      brandOrProject: "SolCity",
      contentDescription: "Sunglasses for young and adult people",
      contentCategories: [
        {
          label: "Educational",
          value: "educational",
        },
        {
          label: "Fun",
          value: "fun",
        },
      ],
      contentPreferences: [
        {
          label: "Videos",
          value: "videos",
        },
        {
          label: "Blogs",
          value: "blogs",
        },
      ],
      contentLanguages: [
        {
          label: "English",
          value: "english",
        },
        {
          label: "Spanish",
          value: "spanish",
        },
      ],
    },
  ],
  userRole: "Expert",
}

export const user1 = {
  nickname: "dientelargo",
  mainGoal: "To know about sunglases",
  gender: "male",
  generalInterests: [
    {
      label: "Technology",
      value: "technology",
    },
  ],
  contentPreferences: [
    {
      label: "Blogs",
      value: "blogs",
    },
    {
      label: "Videos",
      value: "videos",
    },
  ],
  spokenLanguages: [
    {
      label: "English",
      value: "english",
    },
    {
      label: "Spanish",
      value: "spanish",
    },
  ],
  userRole: "User",
}

export const expertEmpty = {
  personalInformation: {
    id: "",
    name: "",
    email: "",
    role: "",
    gender: "",
    spokenLanguages: [""],
  },
  brandsOrProjects: [
    {
      id: "",
      brandOrProject: "",
      contentDescription: "",
      contentCategories: [""],
      contentPreferences: [""],
      contentLanguages: [""],
    },
  ],
  courses: [
    {
      id: "",
      title: "",
      description: "",
      tags: [""],
      level: "",
      duration: "",
      modulesOrLessons: "",
      price: "",
      supplementaryMaterial: "",
      prerequisites: "",
      certification: "",
      language: "",
    },
  ],
}

export const expertWal = {
  personalInformation: {
    id: "109",
    name: "Sarah Johnson",
    email: "sarah.johnson@financewise.com",
    role: "Expert",
    gender: "Female",
    spokenLanguages: ["English", "German"],
  },
  brandsOrProjects: [
    {
      id: "B901",
      brandOrProject: "FinanceWise",
      contentDescription:
        "A platform offering financial planning advice and courses.",
      contentCategories: [
        "Financial Planning",
        "Investing",
        "Personal Finance",
      ],
      contentPreferences: ["Articles", "Workshops", "Webinars"],
      contentLanguages: ["English", "German"],
    },
    {
      id: "B902",
      brandOrProject: "Wealth Management Insights",
      contentDescription:
        "A project focused on wealth management and retirement planning.",
      contentCategories: [
        "Wealth Management",
        "Retirement Planning",
        "Investment Strategies",
      ],
      contentPreferences: ["Podcasts", "Interactive Tools", "Videos"],
      contentLanguages: ["English"],
    },
  ],
  courses: [
    {
      id: "C901",
      title: "Introduction to Financial Planning",
      description:
        "A beginner's course on managing personal finances and planning for the future.",
      tags: ["financial planning", "personal finance", "budgeting"],
      level: "Beginner",
      duration: "4 weeks",
      modulesOrLessons: "8 lessons",
      price: "$50",
      supplementaryMaterial: "Budgeting templates, financial calculators",
      prerequisites: "None",
      certification: "Certificate of Completion",
      language: "English",
    },
    {
      id: "C902",
      title: "Advanced Investment Strategies",
      description:
        "Learn advanced techniques for investing in stocks, bonds, and other assets.",
      tags: ["investment", "finance", "wealth management"],
      level: "Advanced",
      duration: "8 weeks",
      modulesOrLessons: "16 lessons",
      price: "$150",
      supplementaryMaterial: "Investment guides, stock market tools",
      prerequisites: "Basic knowledge of finance",
      certification: "Investment Strategy Certificate",
      language: "English",
    },
  ],
}

export const userXX = {
  personalInformation: {
    nickname: "dientelargo",
    name: "",
    email: "",
    role: "consumer",
    gender: "male",
    spokenLanguages: ["english", "spanish"],
  },
  preferences: {
    mainGoal: ["To know about sunglases", "learn guitar", "go to the beach"],
    generalInterests: ["technology"],
    contentPreferences: ["blogs", "videos"],
  },
}

export const userEmpty = {
  personalInformation: {
    nickname: "",
    name: "",
    email: "",
    role: "",
    gender: "",
    spokenLanguages: [""],
  },
  preferences: {
    mainGoal: [""],
    generalInterests: [""],
    contentPreferences: [""],
  },
}

export const couser1 = {
  title: "Personal Finance 101",
  description:
    "A beginner's guide to understanding the basics of personal finance, including budgeting, saving, and managing debt.",
  tags: ["personal finance", "budgeting", "saving", "debt management"],
  level: "Beginner",
  duration: "4 weeks",
  modulesOrLessons: "8 lessons",
  price: "$50",
  supplementaryMaterial: "Workbooks, spreadsheets, and interactive quizzes",
  prerequisites: "None",
  certification: "Certificate of Completion",
  language: "english",
}

const courses = [
  {
    title: "Personal Finance 101",
    description:
      "A beginner's guide to understanding the basics of personal finance, including budgeting, saving, and managing debt.",
    tags: ["personal finance", "budgeting", "saving", "debt management"],
    level: "Beginner",
    duration: "4 weeks",
    modulesOrLessons: "8 lessons",
    price: "$50",
    supplementaryMaterial: "Workbooks, spreadsheets, and interactive quizzes",
    prerequisites: "None",
    certification: "Certificate of Completion",
    language: "English",
  },
  {
    title: "Investing for Beginners",
    description:
      "Learn the fundamentals of investing, including stocks, bonds, mutual funds, and ETFs, and how to build a diversified portfolio.",
    tags: ["investing", "stocks", "bonds", "portfolio management"],
    level: "Beginner",
    duration: "6 weeks",
    modulesOrLessons: "12 lessons",
    price: "$75",
    supplementaryMaterial:
      "Investment calculators, case studies, and reading materials",
    prerequisites: "Basic understanding of personal finance",
    certification: "Certificate of Achievement",
    language: "English",
  },
  {
    title: "Advanced Personal Finance: Building Wealth",
    description:
      "A course for those looking to deepen their financial knowledge and learn advanced strategies for building wealth over the long term.",
    tags: ["personal finance", "wealth building", "advanced strategies"],
    level: "Advanced",
    duration: "8 weeks",
    modulesOrLessons: "16 lessons",
    price: "$120",
    supplementaryMaterial: "Videos, expert interviews, and strategy guides",
    prerequisites:
      "Intermediate understanding of personal finance and investing",
    certification: "Advanced Finance Certificate",
    language: "English",
  },
  {
    title: "Financial Independence and Early Retirement",
    description:
      "Explore the principles of the FIRE (Financial Independence, Retire Early) movement and learn how to achieve financial freedom.",
    tags: ["financial independence", "early retirement", "FIRE"],
    level: "Intermediate",
    duration: "5 weeks",
    modulesOrLessons: "10 lessons",
    price: "$90",
    supplementaryMaterial:
      "Budget templates, retirement planning tools, and community support",
    prerequisites: "Basic understanding of budgeting and investing",
    certification: "Certificate of Completion",
    language: "English",
  },
  {
    title: "Mastering Credit and Debt Management",
    description:
      "Gain control over your credit and learn effective strategies for managing and eliminating debt to improve your financial health.",
    tags: ["credit management", "debt reduction", "financial health"],
    level: "All levels",
    duration: "3 weeks",
    modulesOrLessons: "6 lessons",
    price: "$40",
    supplementaryMaterial:
      "Credit score tracking tools, debt reduction plans, and expert advice",
    prerequisites: "None",
    certification: "Certificate of Achievement",
    language: "English",
  },
]
