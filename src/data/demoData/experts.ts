import { ExpertProps } from "@/components/abis/types/generalTypes"

const expert1: ExpertProps = {
  id: "001",
  personalInformation: {
    name: "John Smith",
    email: "john.smith@financeguru.com",
    walletAddress: "",
    role: "Expert",
    gender: "Male",
    spokenLanguages: ["English", "Spanish"],
  },
  brandsOrProjects: [
    {
      id: "P001",
      brandOrProject: "Finance Guru",
      contentDescription:
        "A platform providing resources and guidance on personal finance and investment.",
      contentCategories: ["Personal Finance", "Investing", "Wealth Management"],
      contentPreferences: ["Articles", "Webinars", "Podcasts"],
      contentLanguages: ["English", "Spanish"],
    },
  ],
  courses: [
    {
      id: "C001",
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
  ],
}

const expert2: ExpertProps = {
  id: "002",
  personalInformation: {
    name: "Sarah Johnson",
    email: "sarah.johnson@marketstrategies.com",
    walletAddress: "",
    role: "Expert",
    gender: "Female",
    spokenLanguages: ["English", "French"],
  },
  brandsOrProjects: [
    {
      id: "P002",
      brandOrProject: "Market Strategies",
      contentDescription:
        "Specialized in developing and implementing innovative digital marketing strategies.",
      contentCategories: ["Digital Marketing", "SEO", "Content Marketing"],
      contentPreferences: ["Videos", "E-books", "Case Studies"],
      contentLanguages: ["English", "French"],
    },
  ],
  courses: [
    {
      id: "C002",
      title: "Digital Marketing Masterclass",
      description:
        "An advanced course covering all aspects of digital marketing including SEO, SEM, and social media marketing.",
      tags: ["digital marketing", "SEO", "social media"],
      level: "Advanced",
      duration: "6 weeks",
      modulesOrLessons: "12 lessons",
      price: "$150",
      supplementaryMaterial:
        "Templates, SEO tools, and access to a private marketing community",
      prerequisites: "Basic understanding of marketing concepts",
      certification: "Digital Marketing Specialist Certificate",
      language: "English",
    },
  ],
}

const expert3: ExpertProps = {
  id: "003",
  personalInformation: {
    name: "Michael Davis",
    email: "michael.davis@datasciencepro.com",
    walletAddress: "",
    role: "Expert",
    gender: "Male",
    spokenLanguages: ["English", "German"],
  },
  brandsOrProjects: [
    {
      id: "P003",
      brandOrProject: "Data Science Pro",
      contentDescription:
        "A hub for data science resources, tutorials, and projects.",
      contentCategories: ["Data Science", "Machine Learning", "AI"],
      contentPreferences: ["Blogs", "Workshops", "Online Courses"],
      contentLanguages: ["English", "German"],
    },
  ],
  courses: [
    {
      id: "C003",
      title: "Data Science for Beginners",
      description:
        "Introduction to the field of data science, covering basics of Python, statistics, and machine learning.",
      tags: ["data science", "python", "machine learning"],
      level: "Beginner",
      duration: "8 weeks",
      modulesOrLessons: "16 lessons",
      price: "$100",
      supplementaryMaterial: "Python scripts, datasets, and Jupyter notebooks",
      prerequisites: "Basic programming knowledge",
      certification: "Data Science Foundation Certificate",
      language: "English",
    },
  ],
}

const expert4: ExpertProps = {
  id: "004",
  personalInformation: {
    name: "Emily Brown",
    email: "emily.brown@codingmastery.com",
    walletAddress: "",
    role: "Expert",
    gender: "Female",
    spokenLanguages: ["English", "Chinese"],
  },
  brandsOrProjects: [
    {
      id: "P004",
      brandOrProject: "Coding Mastery",
      contentDescription:
        "An online platform offering coding tutorials, courses, and mentoring services.",
      contentCategories: [
        "Software Development",
        "Web Development",
        "Programming Languages",
      ],
      contentPreferences: [
        "Tutorials",
        "Live Coding Sessions",
        "Code Challenges",
      ],
      contentLanguages: ["English", "Chinese"],
    },
  ],
  courses: [
    {
      id: "C004",
      title: "Full-Stack Web Development",
      description:
        "Learn to build complete web applications using JavaScript, React, Node.js, and MongoDB.",
      tags: ["web development", "full-stack", "javascript"],
      level: "Intermediate",
      duration: "10 weeks",
      modulesOrLessons: "20 lessons",
      price: "$200",
      supplementaryMaterial:
        "Project codebases, development tools, and video tutorials",
      prerequisites: "Basic understanding of HTML, CSS, and JavaScript",
      certification: "Full-Stack Developer Certificate",
      language: "English",
    },
  ],
}

const expert5: ExpertProps = {
  id: "005",
  personalInformation: {
    name: "Daniel Lee",
    email: "daniel.lee@wellnesscoach.com",
    walletAddress: "",
    role: "Expert",
    gender: "Male",
    spokenLanguages: ["English", "Korean"],
  },
  brandsOrProjects: [
    {
      id: "P005",
      brandOrProject: "Wellness Coach",
      contentDescription:
        "A wellness platform providing guidance on fitness, nutrition, and mental health.",
      contentCategories: ["Health and Wellness", "Fitness", "Nutrition"],
      contentPreferences: ["Podcasts", "Articles", "Guided Sessions"],
      contentLanguages: ["English", "Korean"],
    },
  ],
  courses: [
    {
      id: "C005",
      title: "Holistic Health for a Better Life",
      description:
        "Explore the principles of holistic health, including nutrition, exercise, and mindfulness.",
      tags: ["holistic health", "nutrition", "mindfulness"],
      level: "All levels",
      duration: "6 weeks",
      modulesOrLessons: "12 lessons",
      price: "$80",
      supplementaryMaterial:
        "Meal plans, workout routines, and meditation guides",
      prerequisites: "None",
      certification: "Holistic Health Certificate",
      language: "English",
    },
  ],
}

const expert6: ExpertProps = {
  id: "101",
  personalInformation: {
    name: "Alice Carter",
    email: "alice.carter@cybersecure.com",
    walletAddress: "",
    role: "Expert",
    gender: "Female",
    spokenLanguages: ["English", "Russian"],
  },
  brandsOrProjects: [
    {
      id: "B101",
      brandOrProject: "CyberSecure Academy",
      contentDescription:
        "An educational platform focused on teaching cybersecurity practices and principles.",
      contentCategories: [
        "Cybersecurity",
        "Network Security",
        "Ethical Hacking",
      ],
      contentPreferences: ["Webinars", "Online Courses", "Tutorials"],
      contentLanguages: ["English"],
    },
    {
      id: "B102",
      brandOrProject: "SecureTech",
      contentDescription:
        "A consultancy providing cybersecurity solutions to businesses.",
      contentCategories: [
        "Cybersecurity",
        "Data Protection",
        "Risk Management",
      ],
      contentPreferences: ["Articles", "Workshops", "Podcasts"],
      contentLanguages: ["English", "Russian"],
    },
  ],
  courses: [
    {
      id: "C101",
      title: "Introduction to Cybersecurity",
      description: "A beginner's course on the fundamentals of cybersecurity.",
      tags: ["cybersecurity", "network security", "data protection"],
      level: "Beginner",
      duration: "4 weeks",
      modulesOrLessons: "8 lessons",
      price: "$60",
      supplementaryMaterial: "E-books, security software trials",
      prerequisites: "None",
      certification: "Certificate of Completion",
      language: "English",
    },
    {
      id: "C102",
      title: "Advanced Ethical Hacking",
      description:
        "Learn advanced techniques in ethical hacking to protect systems from threats.",
      tags: ["ethical hacking", "penetration testing", "cybersecurity"],
      level: "Advanced",
      duration: "6 weeks",
      modulesOrLessons: "12 lessons",
      price: "$150",
      supplementaryMaterial: "Lab exercises, hacking tools",
      prerequisites: "Basic knowledge of cybersecurity",
      certification: "Ethical Hacking Certificate",
      language: "English",
    },
  ],
}

const expert7: ExpertProps = {
  id: "102",
  personalInformation: {
    name: "Daniel Brown",
    email: "daniel.brown@earthwise.com",
    walletAddress: "",
    role: "Expert",
    gender: "Male",
    spokenLanguages: ["English", "Spanish"],
  },
  brandsOrProjects: [
    {
      id: "B201",
      brandOrProject: "Earthwise",
      contentDescription:
        "A non-profit organization dedicated to promoting environmental awareness.",
      contentCategories: [
        "Environmental Science",
        "Sustainability",
        "Climate Change",
      ],
      contentPreferences: ["Articles", "Videos", "Workshops"],
      contentLanguages: ["English", "Spanish"],
    },
    {
      id: "B202",
      brandOrProject: "Green Planet",
      contentDescription:
        "An initiative focused on developing sustainable technologies.",
      contentCategories: [
        "Sustainable Technology",
        "Green Energy",
        "Environmental Conservation",
      ],
      contentPreferences: ["Podcasts", "E-books", "Interactive Content"],
      contentLanguages: ["English"],
    },
  ],
  courses: [
    {
      id: "C201",
      title: "Introduction to Environmental Science",
      description:
        "An overview of environmental science and its importance in today's world.",
      tags: ["environmental science", "sustainability", "ecology"],
      level: "Beginner",
      duration: "5 weeks",
      modulesOrLessons: "10 lessons",
      price: "$70",
      supplementaryMaterial: "Fieldwork guides, reading materials",
      prerequisites: "None",
      certification: "Certificate of Completion",
      language: "English",
    },
    {
      id: "C202",
      title: "Climate Change and Its Impact",
      description:
        "A course on understanding climate change and its effects on the environment.",
      tags: ["climate change", "global warming", "sustainability"],
      level: "Intermediate",
      duration: "6 weeks",
      modulesOrLessons: "12 lessons",
      price: "$90",
      supplementaryMaterial: "Case studies, research articles",
      prerequisites: "Basic knowledge of environmental science",
      certification: "Climate Change Specialist Certificate",
      language: "English",
    },
  ],
}

const expert8: ExpertProps = {
  id: "103",
  personalInformation: {
    name: "Sophia Harris",
    email: "sophia.harris@creativedesign.com",
    walletAddress: "",
    role: "Expert",
    gender: "Female",
    spokenLanguages: ["English", "French"],
  },
  brandsOrProjects: [
    {
      id: "B301",
      brandOrProject: "Creative Design Hub",
      contentDescription:
        "A platform offering graphic design tutorials and resources.",
      contentCategories: ["Graphic Design", "Illustration", "Digital Art"],
      contentPreferences: ["Tutorials", "Webinars", "Online Courses"],
      contentLanguages: ["English", "French"],
    },
    {
      id: "B302",
      brandOrProject: "Visual Storytellers",
      contentDescription:
        "A project focusing on visual storytelling through design and illustration.",
      contentCategories: ["Visual Storytelling", "Graphic Design", "Animation"],
      contentPreferences: ["Videos", "Interactive Content", "Blogs"],
      contentLanguages: ["English"],
    },
  ],
  courses: [
    {
      id: "C301",
      title: "Graphic Design Basics",
      description:
        "A course covering the fundamental principles of graphic design.",
      tags: ["graphic design", "visual arts", "creativity"],
      level: "Beginner",
      duration: "4 weeks",
      modulesOrLessons: "8 lessons",
      price: "$50",
      supplementaryMaterial: "Design templates, software trials",
      prerequisites: "None",
      certification: "Certificate of Completion",
      language: "English",
    },
    {
      id: "C302",
      title: "Advanced Illustration Techniques",
      description:
        "Learn advanced techniques in digital illustration and concept art.",
      tags: ["illustration", "digital art", "creative techniques"],
      level: "Advanced",
      duration: "8 weeks",
      modulesOrLessons: "16 lessons",
      price: "$120",
      supplementaryMaterial: "Brush packs, digital canvas access",
      prerequisites: "Basic knowledge of graphic design",
      certification: "Illustration Mastery Certificate",
      language: "English",
    },
  ],
}

const expert9: ExpertProps = {
  id: "104",
  personalInformation: {
    name: "Gonzalo Barría",
    email: "gonzalobarriamarchant@gmail.com",
    walletAddress: "0x242f01aEcA21A685742F7b35327A007a7A2aC314",
    role: "Expert",
    gender: "Male",
    spokenLanguages: ["English", "Italian"],
  },
  brandsOrProjects: [
    {
      id: "B401",
      brandOrProject: "Gourmet Kitchen",
      contentDescription:
        "A culinary school offering cooking classes and workshops.",
      contentCategories: ["Culinary Arts", "Cooking", "Baking"],
      contentPreferences: ["Live Cooking Sessions", "Recipes", "Videos"],
      contentLanguages: ["English", "Italian"],
    },
    {
      id: "B402",
      brandOrProject: "The Art of Baking",
      contentDescription:
        "A specialized project focusing on baking techniques and recipes.",
      contentCategories: ["Baking", "Pastry Arts", "Desserts"],
      contentPreferences: ["E-books", "Online Courses", "Tutorials"],
      contentLanguages: ["English"],
    },
  ],
  courses: [
    {
      id: "C401",
      title: "Introduction to Italian Cuisine",
      description:
        "Learn the basics of Italian cooking, including pasta making and traditional dishes.",
      tags: ["culinary arts", "Italian cuisine", "cooking"],
      level: "Beginner",
      duration: "3 weeks",
      modulesOrLessons: "6 lessons",
      price: "$80",
      supplementaryMaterial: "Recipe cards, ingredient lists",
      prerequisites: "None",
      certification: "Certificate of Completion",
      language: "English",
    },
    {
      id: "C402",
      title: "Mastering the Art of Baking",
      description:
        "Advanced baking techniques for creating professional-level pastries and desserts.",
      tags: ["baking", "pastry arts", "desserts"],
      level: "Advanced",
      duration: "6 weeks",
      modulesOrLessons: "12 lessons",
      price: "$150",
      supplementaryMaterial: "Baking tools, ingredient sourcing guide",
      prerequisites: "Basic baking skills",
      certification: "Advanced Baking Certificate",
      language: "English",
    },
  ],
}

const expert10: ExpertProps = {
  id: "105",
  personalInformation: {
    name: "Priya Sharma",
    email: "priya.sharma@yogaflow.com",
    walletAddress: "",
    role: "Expert",
    gender: "Female",
    spokenLanguages: ["English", "Hindi"],
  },
  brandsOrProjects: [
    {
      id: "B501",
      brandOrProject: "YogaFlow Studio",
      contentDescription:
        "A yoga studio offering in-person and online yoga classes.",
      contentCategories: ["Yoga", "Mindfulness", "Wellness"],
      contentPreferences: ["Live Classes", "Guided Sessions", "Tutorials"],
      contentLanguages: ["English", "Hindi"],
    },
    {
      id: "B502",
      brandOrProject: "Mindful Living",
      contentDescription:
        "A platform focusing on mindfulness practices for everyday life.",
      contentCategories: ["Mindfulness", "Meditation", "Mental Health"],
      contentPreferences: ["Podcasts", "Articles", "Workshops"],
      contentLanguages: ["English"],
    },
  ],
  courses: [
    {
      id: "C501",
      title: "Introduction to Yoga",
      description:
        "A beginner's guide to the basics of yoga practice and philosophy.",
      tags: ["yoga", "wellness", "exercise"],
      level: "Beginner",
      duration: "4 weeks",
      modulesOrLessons: "8 lessons",
      price: "$50",
      supplementaryMaterial: "Yoga mat, pose guide",
      prerequisites: "None",
      certification: "Certificate of Completion",
      language: "English",
    },
    {
      id: "C502",
      title: "Mindfulness Meditation Techniques",
      description:
        "Learn various techniques for practicing mindfulness and meditation.",
      tags: ["mindfulness", "meditation", "mental health"],
      level: "Intermediate",
      duration: "6 weeks",
      modulesOrLessons: "12 lessons",
      price: "$75",
      supplementaryMaterial: "Meditation guide, audio sessions",
      prerequisites: "Basic understanding of mindfulness",
      certification: "Mindfulness Certificate",
      language: "English",
    },
  ],
}

const expert11: ExpertProps = {
  id: "106",
  personalInformation: {
    name: "John Miller",
    email: "john.miller@investrealestate.com",
    walletAddress: "",
    role: "Expert",
    gender: "Male",
    spokenLanguages: ["English", "Spanish"],
  },
  brandsOrProjects: [
    {
      id: "B601",
      brandOrProject: "Invest Real Estate",
      contentDescription:
        "A platform offering insights and courses on real estate investment.",
      contentCategories: ["Real Estate", "Investment", "Finance"],
      contentPreferences: ["Articles", "Webinars", "Workshops"],
      contentLanguages: ["English", "Spanish"],
    },
    {
      id: "B602",
      brandOrProject: "Property Wealth",
      contentDescription:
        "A project dedicated to teaching property management and wealth building.",
      contentCategories: [
        "Property Management",
        "Wealth Building",
        "Investment Strategies",
      ],
      contentPreferences: ["Videos", "Online Courses", "Podcasts"],
      contentLanguages: ["English"],
    },
  ],
  courses: [
    {
      id: "C601",
      title: "Getting Started with Real Estate Investment",
      description:
        "An introductory course on real estate investment strategies.",
      tags: ["real estate", "investment", "finance"],
      level: "Beginner",
      duration: "5 weeks",
      modulesOrLessons: "10 lessons",
      price: "$100",
      supplementaryMaterial: "Investment calculators, case studies",
      prerequisites: "None",
      certification: "Real Estate Investment Certificate",
      language: "English",
    },
    {
      id: "C602",
      title: "Advanced Property Management",
      description:
        "Learn advanced techniques for managing and maximizing the value of real estate properties.",
      tags: ["property management", "real estate", "investment"],
      level: "Advanced",
      duration: "8 weeks",
      modulesOrLessons: "16 lessons",
      price: "$200",
      supplementaryMaterial: "Property management software tools, e-books",
      prerequisites: "Basic knowledge of real estate",
      certification: "Property Management Certificate",
      language: "English",
    },
  ],
}

const expert12: ExpertProps = {
  id: "107",
  personalInformation: {
    name: "Emma Davis",
    email: "emma.davis@aiinstitute.com",
    walletAddress: "",
    role: "Expert",
    gender: "Female",
    spokenLanguages: ["English", "Chinese"],
  },
  brandsOrProjects: [
    {
      id: "B701",
      brandOrProject: "AI Institute",
      contentDescription:
        "An educational platform focused on AI research and development.",
      contentCategories: [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
      ],
      contentPreferences: ["Research Papers", "Online Courses", "Webinars"],
      contentLanguages: ["English", "Chinese"],
    },
    {
      id: "B702",
      brandOrProject: "AI Innovations",
      contentDescription:
        "A project highlighting innovative applications of AI in various industries.",
      contentCategories: ["Innovation", "Technology", "AI Applications"],
      contentPreferences: ["Podcasts", "Articles", "Interactive Content"],
      contentLanguages: ["English"],
    },
  ],
  courses: [
    {
      id: "C701",
      title: "Introduction to Artificial Intelligence",
      description:
        "An overview of AI, its history, and its applications in the modern world.",
      tags: ["AI", "technology", "innovation"],
      level: "Beginner",
      duration: "4 weeks",
      modulesOrLessons: "8 lessons",
      price: "$80",
      supplementaryMaterial: "AI software tools, reading materials",
      prerequisites: "None",
      certification: "Certificate of Completion",
      language: "English",
    },
    {
      id: "C702",
      title: "Machine Learning Techniques",
      description:
        "Advanced machine learning methods for developing intelligent systems.",
      tags: ["machine learning", "AI", "data science"],
      level: "Advanced",
      duration: "8 weeks",
      modulesOrLessons: "16 lessons",
      price: "$150",
      supplementaryMaterial: "Datasets, coding exercises",
      prerequisites: "Basic programming skills",
      certification: "Machine Learning Certificate",
      language: "English",
    },
  ],
}

const expert13: ExpertProps = {
  id: "108",
  personalInformation: {
    name: "Jason Lee",
    email: "jason.lee@musicstudio.com",
    walletAddress: "",
    role: "Expert",
    gender: "Male",
    spokenLanguages: ["English", "Japanese"],
  },
  brandsOrProjects: [
    {
      id: "B801",
      brandOrProject: "Music Studio Academy",
      contentDescription:
        "A school dedicated to teaching music production and sound engineering.",
      contentCategories: [
        "Music Production",
        "Sound Engineering",
        "Audio Mixing",
      ],
      contentPreferences: ["Tutorials", "Online Courses", "Live Sessions"],
      contentLanguages: ["English", "Japanese"],
    },
    {
      id: "B802",
      brandOrProject: "Beat Makers",
      contentDescription:
        "A platform focused on the art of beat making and electronic music production.",
      contentCategories: [
        "Beat Making",
        "Electronic Music",
        "Music Production",
      ],
      contentPreferences: ["Videos", "Interactive Content", "E-books"],
      contentLanguages: ["English"],
    },
  ],
  courses: [
    {
      id: "C801",
      title: "Basics of Music Production",
      description:
        "Learn the fundamentals of music production, from recording to mixing.",
      tags: ["music production", "audio", "sound engineering"],
      level: "Beginner",
      duration: "6 weeks",
      modulesOrLessons: "12 lessons",
      price: "$100",
      supplementaryMaterial: "DAW software, sample packs",
      prerequisites: "None",
      certification: "Certificate of Completion",
      language: "English",
    },
    {
      id: "C802",
      title: "Advanced Beat Making Techniques",
      description:
        "Develop skills in creating professional-quality beats for various music genres.",
      tags: ["beat making", "music production", "sound design"],
      level: "Advanced",
      duration: "8 weeks",
      modulesOrLessons: "16 lessons",
      price: "$200",
      supplementaryMaterial: "Exclusive sound libraries, plugin access",
      prerequisites: "Basic knowledge of music production",
      certification: "Beat Maker Certificate",
      language: "English",
    },
  ],
}

const expert14: ExpertProps = {
  id: "111",
  personalInformation: {
    name: "Isabella Garcia",
    email: "isabella.garcia@chefspirit.com",
    imgURL:
      "https://gateway.lighthouse.storage/ipfs/bafkreid2klvf66t2omdb2f7mwjpiklpuupiw3ooyagygfbfbdlrsyxukhy",
    walletAddress: "",
    role: "Expert",
    gender: "Female",
    spokenLanguages: ["English", "Spanish", "French"],
  },
  brandsOrProjects: [
    {
      id: "B1101",
      brandOrProject: "Chef's Spirit",
      contentDescription:
        "A culinary platform focused on gourmet cooking and pastry arts.",
      contentCategories: ["Culinary Arts", "Gourmet Cooking", "Pastry Arts"],
      contentPreferences: [
        "Video Tutorials",
        "Recipes",
        "Live Cooking Sessions",
      ],
      contentLanguages: ["English", "Spanish", "French"],
    },
    {
      id: "B1102",
      brandOrProject: "Sweet Creations",
      contentDescription:
        "A project dedicated to teaching the art of baking and pastry making.",
      contentCategories: ["Pastry Arts", "Baking", "Desserts"],
      contentPreferences: ["Workshops", "Interactive Recipes", "Articles"],
      contentLanguages: ["English", "French"],
    },
  ],
  courses: [
    {
      id: "C1101",
      title: "Introduction to Pastry Arts",
      description:
        "A beginner’s course in pastry making, focusing on fundamental techniques and recipes.",
      tags: ["pastry", "baking", "desserts", "culinary arts"],
      level: "Beginner",
      duration: "6 weeks",
      modulesOrLessons: "10 lessons",
      price: "$100",
      supplementaryMaterial: "Recipe book, list of necessary baking tools",
      prerequisites: "None",
      certification: "Certificate of Completion",
      language: "English",
    },
    {
      id: "C1102",
      title: "Gourmet Cooking Techniques",
      description:
        "An intermediate course on gourmet cooking, covering advanced techniques for creating exquisite dishes.",
      tags: ["gourmet cooking", "culinary arts", "techniques", "chef skills"],
      level: "Intermediate",
      duration: "8 weeks",
      modulesOrLessons: "12 lessons",
      price: "$150",
      supplementaryMaterial: "Ingredient list, cooking technique videos",
      prerequisites: "Basic cooking knowledge",
      certification: "Gourmet Chef Certificate",
      language: "English",
    },
    {
      id: "C1103",
      title: "Mastering French Pastries",
      description:
        "An advanced course focused on creating classic and modern French pastries, perfecting techniques and presentation.",
      tags: ["French pastries", "advanced baking", "culinary arts"],
      level: "Advanced",
      duration: "10 weeks",
      modulesOrLessons: "15 lessons",
      price: "$200",
      supplementaryMaterial:
        "Exclusive access to pastry tools, recipe collection",
      prerequisites: "Introduction to Pastry Arts or equivalent experience",
      certification: "French Pastry Master Certificate",
      language: "English",
    },
  ],
}

const expert15: ExpertProps = {
  id: "201",
  personalInformation: {
    name: "Emily Johnson",
    email: "emily.johnson@writingmaster.com",
    walletAddress: "",
    role: "Expert",
    gender: "Female",
    spokenLanguages: ["English", "Spanish"],
  },
  brandsOrProjects: [
    {
      id: "B2011",
      brandOrProject: "Writing Master",
      contentDescription:
        "A platform dedicated to creative writing and storytelling skills.",
      contentCategories: [
        "Creative Writing",
        "Storytelling",
        "Fiction Writing",
      ],
      contentPreferences: ["Online Courses", "Workshops", "Articles"],
      contentLanguages: ["English", "Spanish"],
    },
    {
      id: "B2012",
      brandOrProject: "Fiction Lab",
      contentDescription:
        "A project focused on helping writers develop their storytelling abilities through interactive lessons.",
      contentCategories: [
        "Fiction Writing",
        "Storytelling",
        "Character Development",
      ],
      contentPreferences: [
        "Video Tutorials",
        "Interactive Lessons",
        "Writing Prompts",
      ],
      contentLanguages: ["English"],
    },
  ],
  courses: [
    {
      id: "C2011",
      title: "Introduction to Creative Writing",
      description:
        "A beginner's guide to the basics of creative writing, from short stories to novels.",
      tags: ["creative writing", "storytelling", "writing skills"],
      level: "Beginner",
      duration: "6 weeks",
      modulesOrLessons: "10 lessons",
      price: "$90",
      supplementaryMaterial: "Writing prompts, resource guides",
      prerequisites: "None",
      certification: "Creative Writing Certificate",
      language: "English",
    },
    {
      id: "C2012",
      title: "Advanced Storytelling Techniques",
      description:
        "An advanced course focusing on how to create compelling characters and narratives.",
      tags: ["storytelling", "fiction", "writing"],
      level: "Advanced",
      duration: "8 weeks",
      modulesOrLessons: "12 lessons",
      price: "$150",
      supplementaryMaterial:
        "Character development guide, plot structure tools",
      prerequisites: "Basic writing knowledge",
      certification: "Advanced Storytelling Certificate",
      language: "English",
    },
  ],
}

const expert16: ExpertProps = {
  id: "202",
  personalInformation: {
    name: "David Kim",
    email: "david.kim@contentcreators.com",
    walletAddress: "",
    role: "Expert",
    gender: "Male",
    spokenLanguages: ["English", "Korean"],
  },
  brandsOrProjects: [
    {
      id: "B2021",
      brandOrProject: "Content Creators Academy",
      contentDescription:
        "A platform for mastering content creation across various mediums, with a focus on storytelling.",
      contentCategories: ["Content Creation", "Storytelling", "Digital Media"],
      contentPreferences: ["Videos", "Interactive Workshops", "Podcasts"],
      contentLanguages: ["English", "Korean"],
    },
    {
      id: "B2022",
      brandOrProject: "Storytellers United",
      contentDescription:
        "A project focused on helping content creators tell compelling stories through digital platforms.",
      contentCategories: [
        "Storytelling",
        "Digital Storytelling",
        "Content Creation",
      ],
      contentPreferences: ["Online Courses", "Webinars", "Interactive Tools"],
      contentLanguages: ["English"],
    },
  ],
  courses: [
    {
      id: "C2021",
      title: "Digital Storytelling Masterclass",
      description:
        "Learn how to craft engaging stories specifically for digital platforms like YouTube, blogs, and social media.",
      tags: ["digital storytelling", "content creation", "storytelling"],
      level: "Intermediate",
      duration: "6 weeks",
      modulesOrLessons: "10 lessons",
      price: "$120",
      supplementaryMaterial: "Video editing tools, social media content guides",
      prerequisites: "Familiarity with digital media",
      certification: "Digital Storytelling Certificate",
      language: "English",
    },
    {
      id: "C2022",
      title: "Storytelling for Digital Media",
      description:
        "An introductory course on creating powerful narratives for online content, from blogs to social media campaigns.",
      tags: ["storytelling", "content creation", "digital media"],
      level: "Beginner",
      duration: "4 weeks",
      modulesOrLessons: "8 lessons",
      price: "$80",
      supplementaryMaterial: "Content creation guides, storytelling templates",
      prerequisites: "None",
      certification: "Storytelling Certificate",
      language: "English",
    },
  ],
}

export const experts = [
  expert1,
  expert2,
  expert3,
  expert4,
  expert5,
  expert6,
  expert7,
  expert8,
  // expert9, // se saca porque quiero probar
  expert10,
  expert11,
  expert12,
  expert13,
  expert14,
  expert15,
  expert16,
]
