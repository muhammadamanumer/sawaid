import { Locale } from "@/i18n-config";

const translations: Record<Locale, any> = {
  en: {
    nav: {
      about: 'About Us',
      campaigns: 'Campaigns',
      news: 'News & Updates',
      gallery: 'Media Gallery',
      volunteer: 'Volunteer',
      transparency: 'Transparency',
      contact: 'Contact',
    },
    header: {
      donateNow: 'Donate Now',
    },
    home: {
      missionTitle: "Restoring Hope, Rebuilding Lives",
      missionStatement: "We are a non-profit organization dedicated to providing humanitarian aid, supporting education, and empowering displaced communities and refugees worldwide. Join us in making a difference.",
      donateNow: "Donate Now",
      learnMore: "Learn More",
      featuredCampaigns: "Featured Campaigns",
      impactTitle: "Our Global Impact",
      fundsRaised: "Funds Raised",
      peopleHelped: "People Helped",
      volunteers: "Volunteers",
      viewAllCampaigns: "View All Campaigns",
      urgentAppealsTitle: "Urgent Appeals",
      urgentAppealsSubtitle: "Time-sensitive campaigns that need your immediate support",
      storiesTitle: "Stories of Hope & Impact",
      storiesSubtitle: "Real stories from the communities we serve",
      waysToHelpTitle: "Ways to Make a Difference",
      waysToHelpSubtitle: "Your support changes lives",
      latestNewsTitle: "Latest Updates",
      latestNewsSubtitle: "Stay informed about our work in the field",
      newsletterTitle: "Stay Connected",
      newsletterSubtitle: "Get monthly updates about our impact and how you can help",
      newsletterPlaceholder: "Enter your email address",
      newsletterButton: "Subscribe",
      partnersTitle: "Our Partners & Supporters",
      partnersSubtitle: "Working together to create lasting change",
      transparencyTitle: "Complete Transparency",
      transparencySubtitle: "See exactly how your donations make an impact",
      viewReports: "View Financial Reports",
      beVolunteer: "Become a Volunteer",
      readStory: "Read Full Story",
      ways: {
        donate: {
          title: "Make a Donation",
          description: "Your financial contribution directly supports our programs and helps us reach more communities in need."
        },
        volunteer: {
          title: "Volunteer Your Time",
          description: "Join our global team of volunteers and use your skills to make a hands-on difference."
        },
        fundraise: {
          title: "Start a Fundraiser",
          description: "Rally your community to support our cause by creating your own fundraising campaign."
        },
        spread: {
          title: "Spread Awareness",
          description: "Share our mission on social media and help us reach more people who can make a difference."
        }
      },
      stories: {
        education: {
          name: "Amina's Journey",
          role: "Student, Syria",
          quote: "Thanks to the education support program, I can now attend school and dream of becoming a doctor to help my community."
        },
        water: {
          name: "Ahmed & Family",
          role: "Village Leader, Yemen",
          quote: "The clean water well has transformed our village. Children no longer get sick, and we can focus on building our future."
        },
        medical: {
          name: "Sarah's Story",
          role: "Mother of Three, Gaza",
          quote: "The medical aid team saved my daughter's life. I am forever grateful for their compassion and dedication."
        }
      }
    },
    campaignCard: {
        raised: "raised",
        goal: "Goal",
        donateButton: "Learn More & Donate",
    },
    campaigns: {
        title: "Our Campaigns",
        description: "Explore our ongoing efforts to bring relief and hope to communities in need. Your support powers this change.",
        "emergency-food-drive": {
            title: "Emergency Food Drive",
            shortDescription: "Providing essential meals to families affected by recent disasters.",
            description: "In the wake of recent floods, countless families have been displaced and are without access to basic necessities. Our Emergency Food Drive aims to provide hot meals and non-perishable food packages to those in urgent need. Your contribution can provide a family with food for a week.",
        },
        "clean-water-for-all": {
            title: "Clean Water for All",
            shortDescription: "Building wells to provide safe, clean drinking water to remote villages.",
            description: "Access to clean water is a fundamental human right, yet many communities lack this basic resource. This campaign focuses on building sustainable wells and water purification systems in remote areas, preventing waterborne diseases and improving overall health. Join us in bringing life-sustaining water to those who need it most.",
        },
        "education-support-program": {
            title: "Education Support Program",
            shortDescription: "Supplying books, stationery, and learning materials to underprivileged students.",
            description: "Education is the key to a brighter future. Our Education Support Program equips students in low-income communities with the tools they need to succeed in school. Your donation can provide a child with a full year's worth of school supplies and textbooks.",
        }
    },
    campaignDetail: {
        gallery: "Gallery",
        progressTitle: "Campaign Progress",
        raisedOf: "raised of",
        donateButton: "Donate to this Campaign",
        donorsTitle: "Recent Donors",
        donated: "Donated",
    },
    donate: {
        title: "Make a Donation",
        description: "Your generosity fuels our mission. Thank you for your support.",
        footer: "Your donation will be securely processed. An automated receipt will be sent to your email.",
        form: {
            title: "Choose Your Impact",
            description: "Select a donation frequency and amount.",
            frequencyTitle: "Donation Frequency",
            oneTime: "One-Time Donation",
            monthly: "Monthly Giving",
            amountTitle: "Amount (USD)",
            customAmount: "Custom Amount",
            paymentTitle: "Payment Information",
            paymentDescription: "A secure payment form (e.g., Stripe or PayPal) would be embedded here.",
            nameLabel: "Full Name",
            emailLabel: "Email Address",
            cardLabel: "Card Details",
            cardPlaceholder: "Mock Card Element",
            donateButton: "Donate",
            perMonth: "per month",
        }
    },
    volunteer: {
        title: "Become a Volunteer",
        description: "Your time and skills are invaluable. Join our team of dedicated volunteers and make a hands-on difference.",
        positionsTitle: "Open Positions",
        requirementsTitle: "Requirements",
        formTitle: "Volunteer Application",
        formDescription: "Ready to join? Fill out the form below and we'll be in touch.",
        formFirstNameLabel: "First Name",
        formLastNameLabel: "Last Name",
        formEmailLabel: "Email",
        formPhoneLabel: "Phone Number",
        formPositionLabel: "Position of Interest",
        formMotivationLabel: "Why do you want to volunteer with us?",
        formMotivationPlaceholder: "Tell us a little about yourself and your motivations.",
        formSubmitButton: "Submit Application",
    },
    volunteerPositions: {
        "event-staff": {
            title: "Event Staff",
            description: "Assist with setup, registration, and coordination at our fundraising events.",
            location: "Local (Multiple Cities)",
            requirements: {
                friendly: "Friendly and outgoing personality",
                standing: "Ability to stand for long periods",
                weekends: "Available on weekends",
            }
        },
        "social-media": {
            title: "Social Media Ambassador",
            description: "Help spread awareness about our campaigns and mission on social media platforms.",
            location: "Remote",
            requirements: {
                active: "Active presence on social media (Instagram, Facebook, Twitter)",
                communication: "Strong communication skills",
                creative: "Creative mindset",
            }
        },
        "grant-writer": {
            title: "Grant Writer",
            description: "Research and write grant proposals to secure funding from foundations and corporations.",
            location: "Remote",
            requirements: {
                writing: "Excellent writing and research skills",
                experience: "Previous experience in grant writing preferred",
                "detail-oriented": "Detail-oriented",
            }
        }
    },
    transparency: {
        title: "Financial Transparency",
        description: "We believe in complete transparency. See exactly how every dollar is used to create impact and change lives.",
        reportCardTitle: "Download Our Annual Report",
        reportCardDescription: "For a comprehensive breakdown of our finances, activities, and impact over the last year.",
        reportButton: "Download 2023 Report (PDF)",
        allocationTitle: "Fund Allocation by Category",
        allocationDescription: "Last Fiscal Year",
        percentageTitle: "Allocation Percentage",
        percentageDescription: "A visual breakdown of where your donations go.",
        totalFunds: "Total Funds Distributed",
        totalFundsDescription: "Showing allocation for the last fiscal year.",
    },
    financialCategories: {
        "Food & Water Programs": "Food & Water",
        "Medical Aid": "Medical Aid",
        "Education & Child Support": "Education",
        "Infrastructure & Shelter": "Infrastructure",
        "Administration & Fundraising": "Admin & Fundraising",
    },
    contact: {
        title: "Get in Touch",
        description: "We're here to help. Whether you have a question about donations, volunteering, or our work, please reach out.",
        formTitle: "Send us a Message",
        formDescription: "We'll get back to you as soon as possible.",
        formNameLabel: "Full Name",
        formNamePlaceholder: "Jane Doe",
        formEmailLabel: "Email",
        formEmailPlaceholder: "jane.doe@example.com",
        formSubjectLabel: "Subject",
        formSubjectPlaceholder: "Question about a campaign",
        formMessageLabel: "Your Message",
        formMessagePlaceholder: "Please type your message here...",
        formSendButton: "Send Message",
        infoTitle: "Contact Information",
        hqTitle: "Our Headquarters",
        emailSupportTitle: "Email Support",
        phoneSupportTitle: "Phone Support",
        followUsTitle: "Follow Us",
        faqTitle: "Frequently Asked Questions",
        faqDescription: "Find quick answers to common questions.",
    },
    faq: {
        usage: {
            question: "How is my donation used?",
            answer: "85% of every donation goes directly to our programs. The remaining 15% covers essential administrative and fundraising costs to ensure we can continue our work effectively. You can view our detailed financial breakdown on our Transparency page."
        },
        tax: {
            question: "Is my donation tax-deductible?",
            answer: "Yes, Sawaid Al Islah is a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the extent allowed by law. You will receive an automated receipt for your records after donating."
        },
        country: {
            question: "Can I volunteer from my country?",
            answer: "We have many remote volunteering opportunities, such as our Social Media Ambassador program. Please check our Volunteer page for current openings that you can participate in from anywhere in the world."
        },
        campaign_choice: {
            question: "How do you choose which campaigns to run?",
            answer: "Our campaigns are based on rigorous needs assessments conducted in partnership with local communities. We prioritize projects that have a long-term, sustainable impact and address the most critical needs."
        }
    },
    footer: {
        tagline: "Providing relief, restoring hope, and rebuilding communities worldwide.",
        quickLinks: "Quick Links",
        legal: "Legal",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        connect: "Connect",
        copyright: "All rights reserved."
    },
    about: {
      title: "About Us",
      subtitle: "Dedicated to humanitarian aid, education support, and empowering displaced communities worldwide since 2015",
      missionTitle: "Our Mission",
      missionText: "Sawaid Al Islah is committed to providing immediate humanitarian relief and long-term sustainable development to displaced individuals, refugees, and underserved communities. We believe in empowering communities through education, healthcare, and infrastructure development while maintaining complete transparency in our operations.",
      historyTitle: "Our Story",
      historyText1: "Founded in 2015 in response to the growing humanitarian crisis affecting millions of displaced individuals, Sawaid Al Islah began as a small volunteer-driven initiative. What started with a handful of dedicated individuals has grown into a global movement with operations in over 15 countries.",
      historyText2: "Today, we work with local partners, international organizations, and thousands of volunteers to deliver aid where it's needed most. Our approach combines immediate emergency response with sustainable long-term development programs.",
      founded: "Founded",
      countries: "Countries",
      valuesTitle: "Our Core Values",
      valuesSubtitle: "The principles that guide everything we do",
      values: {
        compassion: {
          title: "Compassion",
          description: "We lead with empathy and understanding, treating every beneficiary with dignity and respect."
        },
        transparency: {
          title: "Transparency",
          description: "Complete financial and operational transparency builds trust with our donors and communities we serve."
        },
        collaboration: {
          title: "Collaboration",
          description: "We partner with local communities and global organizations to maximize our impact."
        },
        impact: {
          title: "Sustainable Impact",
          description: "We focus on long-term solutions that empower communities to thrive independently."
        }
      },
      teamTitle: "Our Leadership Team",
      teamSubtitle: "Meet the dedicated professionals guiding our mission",
      team: {
        director: {
          name: "Dr. Ahmed Hassan",
          bio: "With over 15 years of experience in humanitarian work, Dr. Hassan leads our strategic vision and operations."
        },
        operations: {
          name: "Sarah Mitchell",
          bio: "Sarah oversees our global operations, ensuring efficient delivery of aid and sustainable program implementation."
        },
        programs: {
          name: "Mohammed Al-Rashid",
          bio: "Mohammed directs our program development, working directly with communities to identify and address critical needs."
        },
        fundraising: {
          name: "Elena Rodriguez",
          bio: "Elena leads our fundraising efforts and donor relations, building partnerships that fuel our mission."
        }
      },
      partnersTitle: "Our Partners",
      partnersSubtitle: "Working together with leading organizations to amplify our impact",
      legalTitle: "Legal & Registration",
      legalSubtitle: "Official registration and compliance information",
      legal: {
        registration: "Registration",
        location: "Location",
        taxDeductible: "All donations are tax-deductible to the fullest extent allowed by law. We are committed to the highest standards of financial accountability."
      }
    },
    news: {
      title: "News & Updates",
      subtitle: "Stay informed about our latest field reports, success stories, and organizational updates",
      featured: "Featured Stories",
      recent: "Recent Updates",
      readMore: "Read More",
      categories: {
        all: "All Updates",
        "field-report": "Field Reports",
        "success-story": "Success Stories",
        "project-update": "Project Updates",
        "volunteer-story": "Volunteer Stories",
        announcement: "Announcements"
      },
      articles: {
        "winter-relief-2024": {
          title: "Winter Relief 2024: Providing Warmth to 5,000 Families",
          excerpt: "Our winter relief campaign has successfully distributed blankets, heating supplies, and warm clothing to families across northern Syria and refugee camps in Turkey."
        },
        "education-milestone": {
          title: "1,000 Students Receive Full Educational Support",
          excerpt: "Celebrating a major milestone as we provide comprehensive educational support including books, supplies, and tutoring to 1,000 students in underserved communities."
        },
        "water-project-complete": {
          title: "Clean Water Project Brings Hope to Rural Yemen",
          excerpt: "After months of hard work, our latest water well project is complete, providing clean drinking water to 3,000 residents in a remote Yemeni village."
        },
        "volunteer-spotlight": {
          title: "Meet Our Volunteers: Stories of Dedication and Impact",
          excerpt: "Discover the inspiring stories of our volunteers who dedicate their time and skills to making a difference in communities worldwide."
        },
        "annual-impact-report": {
          title: "2023 Annual Impact Report: A Year of Transformation",
          excerpt: "Our comprehensive annual report showcases the incredible impact made possible by our donors, volunteers, and partners throughout 2023."
        },
        "new-partnership": {
          title: "New Partnership with International Education Foundation",
          excerpt: "We're excited to announce a strategic partnership that will expand our educational programs to reach 10,000 more students."
        }
      },
      newsletter: {
        title: "Subscribe to Our Newsletter",
        description: "Get monthly updates about our work, impact stories, and ways you can make a difference",
        placeholder: "Enter your email address",
        subscribe: "Subscribe"
      }
    },
    gallery: {
      title: "Media Gallery",
      subtitle: "Witness the impact of your support through photos and videos from the field",
      photos: "Photos",
      videos: "Videos",
      categories: {
        all: "All Media",
        "field-work": "Field Work",
        infrastructure: "Infrastructure",
        education: "Education Programs",
        events: "Events & Activities"
      },
      pressKit: {
        title: "Press & Media Kit",
        description: "Media professionals and partners can download high-resolution photos, logos, and brand materials",
        downloadPhotos: "Download Photo Pack",
        downloadLogos: "Download Logos & Assets"
      }
    }
  },
  ar: {
    nav: {
        about: 'من نحن',
        campaigns: 'الحملات',
        news: 'الأخبار والتحديثات',
        gallery: 'معرض الوسائط',
        volunteer: 'تطوع',
        transparency: 'الشفافية',
        contact: 'اتصل بنا',
    },
    header: {
        donateNow: 'تبرع الآن',
    },
    home: {
        missionTitle: "إعادة الأمل، بناء الحياة",
        missionStatement: "نحن منظمة غير ربحية مكرسة لتقديم المساعدات الإنسانية ودعم التعليم وتمكين المجتمعات النازحة واللاجئين في جميع أنحاء العالم. انضم إلينا في إحداث فرق.",
        donateNow: "تبرع الآن",
        learnMore: "اعرف المزيد",
        featuredCampaigns: "الحملات المميزة",
        impactTitle: "تأثيرنا العالمي",
        fundsRaised: "الأموال المجمعة",
        peopleHelped: "الأشخاص الذين تم مساعدتهم",
        volunteers: "المتطوعون",
        viewAllCampaigns: "عرض كل الحملات",
        urgentAppealsTitle: "نداءات عاجلة",
        urgentAppealsSubtitle: "حملات حساسة للوقت تحتاج إلى دعمك الفوري",
        storiesTitle: "قصص الأمل والتأثير",
        storiesSubtitle: "قصص حقيقية من المجتمعات التي نخدمها",
        waysToHelpTitle: "طرق لإحداث فرق",
        waysToHelpSubtitle: "دعمك يغير الحياة",
        latestNewsTitle: "آخر التحديثات",
        latestNewsSubtitle: "ابق على اطلاع بعملنا في الميدان",
        newsletterTitle: "ابق على اتصال",
        newsletterSubtitle: "احصل على تحديثات شهرية حول تأثيرنا وكيف يمكنك المساعدة",
        newsletterPlaceholder: "أدخل عنوان بريدك الإلكتروني",
        newsletterButton: "اشترك",
        partnersTitle: "شركاؤنا والداعمون",
        partnersSubtitle: "العمل معًا لإحداث تغيير دائم",
        transparencyTitle: "شفافية كاملة",
        transparencySubtitle: "شاهد بالضبط كيف تُحدث تبرعاتك تأثيرًا",
        viewReports: "عرض التقارير المالية",
        beVolunteer: "كن متطوعًا",
        readStory: "اقرأ القصة كاملة",
        ways: {
          donate: {
            title: "قدم تبرعًا",
            description: "تساهم مساهمتك المالية بشكل مباشر في دعم برامجنا وتساعدنا في الوصول إلى المزيد من المجتمعات المحتاجة."
          },
          volunteer: {
            title: "تطوع بوقتك",
            description: "انضم إلى فريقنا العالمي من المتطوعين واستخدم مهاراتك لإحداث فرق عملي."
          },
          fundraise: {
            title: "ابدأ حملة لجمع التبرعات",
            description: "اجمع مجتمعك لدعم قضيتنا من خلال إنشاء حملة جمع التبرعات الخاصة بك."
          },
          spread: {
            title: "انشر الوعي",
            description: "شارك مهمتنا على وسائل التواصل الاجتماعي وساعدنا في الوصول إلى المزيد من الأشخاص الذين يمكنهم إحداث فرق."
          }
        },
        stories: {
          education: {
            name: "رحلة أمينة",
            role: "طالبة، سوريا",
            quote: "بفضل برنامج دعم التعليم، أستطيع الآن الذهاب إلى المدرسة والحلم بأن أصبح طبيبة لمساعدة مجتمعي."
          },
          water: {
            name: "أحمد وعائلته",
            role: "قائد القرية، اليمن",
            quote: "لقد حوّل بئر المياه النظيفة قريتنا. لم يعد الأطفال يمرضون، ويمكننا التركيز على بناء مستقبلنا."
          },
          medical: {
            name: "قصة سارة",
            role: "أم لثلاثة أطفال، غزة",
            quote: "أنقذ فريق المساعدات الطبية حياة ابنتي. أنا ممتنة إلى الأبد لتعاطفهم وتفانيهم."
          }
        }
    },
    campaignCard: {
        raised: "تم جمعها",
        goal: "الهدف",
        donateButton: "اعرف المزيد وتبرع",
    },
    campaigns: {
        title: "حملاتنا",
        description: "اكتشف جهودنا المستمرة لجلب الإغاثة والأمل للمجتمعات المحتاجة. دعمكم هو وقود هذا التغيير.",
        "emergency-food-drive": {
            title: "حملة الغذاء الطارئة",
            shortDescription: "توفير وجبات أساسية للأسر المتضررة من الكوارث الأخيرة.",
            description: "في أعقاب الفيضانات الأخيرة ، نزحت عائلات لا حصر لها وبدون الحصول على الضروريات الأساسية. تهدف حملة الغذاء الطارئة لدينا إلى توفير وجبات ساخنة وطرود غذائية غير قابلة للتلف للمحتاجين العاجلين. يمكن لمساهمتك أن توفر لأسرة طعامًا لمدة أسبوع.",
        },
        "clean-water-for-all": {
            title: "مياه نظيفة للجميع",
            shortDescription: "بناء آبار لتوفير مياه شرب آمنة ونظيفة للقرى النائية.",
            description: "الحصول على المياه النظيفة حق أساسي من حقوق الإنسان ، لكن العديد من المجتمعات تفتقر إلى هذا المورد الأساسي. تركز هذه الحملة على بناء آبار مستدامة وأنظمة تنقية المياه في المناطق النائية ، والوقاية من الأمراض المنقولة بالمياه وتحسين الصحة العامة. انضم إلينا في جلب المياه التي تحافظ على الحياة لمن هم في أمس الحاجة إليها.",
        },
        "education-support-program": {
            title: "برنامج دعم التعليم",
            shortDescription: "توفير الكتب والقرطاسية والمواد التعليمية للطلاب المحرومين.",
            description: "التعليم هو مفتاح مستقبل أكثر إشراقًا. يزود برنامج دعم التعليم لدينا الطلاب في المجتمعات منخفضة الدخل بالأدوات التي يحتاجونها للنجاح في المدرسة. يمكن لتبرعك أن يوفر لطفل لوازم مدرسية وكتبًا مدرسية لمدة عام كامل.",
        }
    },
    campaignDetail: {
        gallery: "المعرض",
        progressTitle: "تقدم الحملة",
        raisedOf: "تم جمعها من",
        donateButton: "تبرع لهذه الحملة",
        donorsTitle: "المتبرعون الجدد",
        donated: "تبرع",
    },
    donate: {
        title: "قم بالتبرع",
        description: "كرمكم يغذي مهمتنا. شكرا لدعمكم.",
        footer: "سيتم معالجة تبرعك بشكل آمن. سيتم إرسال إيصال آلي إلى بريدك الإلكتر الإلكتروني.",
        form: {
            title: "اختر تأثيرك",
            description: "حدد وتيرة التبرع والمبلغ.",
            frequencyTitle: "وتيرة التبرع",
            oneTime: "تبرع لمرة واحدة",
            monthly: "تبرع شهري",
            amountTitle: "المبلغ (بالدولار الأمريكي)",
            customAmount: "مبلغ مخصص",
            paymentTitle: "معلومات الدفع",
            paymentDescription: "سيتم تضمين نموذج دفع آمن (مثل Stripe أو PayPal) هنا.",
            nameLabel: "الاسم الكامل",
            emailLabel: "عنوان البريد الإلكتروني",
            cardLabel: "تفاصيل البطاقة",
            cardPlaceholder: "عنصر بطاقة وهمي",
            donateButton: "تبرع",
            perMonth: "شهرياً",
        }
    },
    volunteer: {
        title: "كن متطوعًا",
        description: "وقتك ومهاراتك لا تقدر بثمن. انضم إلى فريقنا من المتطوعين المتفانين وأحدث فرقًا عمليًا.",
        positionsTitle: "الوظائف المتاحة",
        requirementsTitle: "المتطلبات",
        formTitle: "طلب تطوع",
        formDescription: "هل أنت مستعد للانضمام؟ املأ النموذج أدناه وسنتواصل معك.",
        formFirstNameLabel: "الاسم الأول",
        formLastNameLabel: "اسم العائلة",
        formEmailLabel: "البريد الإلكتروني",
        formPhoneLabel: "رقم الهاتف",
        formPositionLabel: "الوظيفة المطلوبة",
        formMotivationLabel: "لماذا تريد التطوع معنا؟",
        formMotivationPlaceholder: "أخبرنا قليلاً عن نفسك ودوافعك.",
        formSubmitButton: "إرسال الطلب",
    },
    volunteerPositions: {
        "event-staff": {
            title: "موظفو الفعاليات",
            description: "المساعدة في الإعداد والتسجيل والتنسيق في فعاليات جمع التبرعات لدينا.",
            location: "محلي (مدن متعددة)",
            requirements: {
                friendly: "شخصية ودودة ومنفتحة",
                standing: "القدرة على الوقوف لفترات طويلة",
                weekends: "متاح في عطلات نهاية الأسبوع",
            }
        },
        "social-media": {
            title: "سفير وسائل التواصل الاجتماعي",
            description: "ساعد في نشر الوعي حول حملاتنا ورسالتنا على منصات التواصل الاجتماعي.",
            location: "عن بعد",
            requirements: {
                active: "حضور نشط على وسائل التواصل الاجتماعي (Instagram ، Facebook ، Twitter)",
                communication: "مهارات اتصال قوية",
                creative: "عقلية إبداعية",
            }
        },
        "grant-writer": {
            title: "كاتب منح",
            description: "بحث وكتابة مقترحات المنح لتأمين التمويل من المؤسسات والشركات.",
            location: "عن بعد",
            requirements: {
                writing: "مهارات كتابة وبحث ممتازة",
                experience: "يفضل الخبرة السابقة في كتابة المنح",
                "detail-oriented": "مهتم بالتفاصيل",
            }
        }
    },
    transparency: {
        title: "الشفافية المالية",
        description: "نحن نؤمن بالشفافية الكاملة. شاهد بالضبط كيف يتم استخدام كل دولار لإحداث تأثير وتغيير الحياة.",
        reportCardTitle: "قم بتنزيل تقريرنا السنوي",
        reportCardDescription: "للحصول على تفصيل شامل لأموالنا وأنشطtenac وأثرنا خلال العام الماضي.",
        reportButton: "تنزيل تقرير 2023 (PDF)",
        allocationTitle: "تخصيص الأموال حسب الفئة",
        allocationDescription: "السنة المالية الماضية",
        percentageTitle: "نسبة التخصيص",
        percentageDescription: "تفصيل مرئي لوجهة تبرعاتك.",
        totalFunds: "إجمالي الأموال الموزعة",
        totalFundsDescription: "عرض التخصيص للسنة المالية الماضية.",
    },
    financialCategories: {
        "Food & Water Programs": "برامج الغذاء والماء",
        "Medical Aid": "المساعدات الطبية",
        "Education & Child Support": "التعليم ودعم الطفل",
        "Infrastructure & Shelter": "البنية التحتية والمأوى",
        "Administration & Fundraising": "الإدارة وجمع التبرعات",
    },
    contact: {
        title: "ابقى على تواصل",
        description: "نحن هنا للمساعدة. سواء كان لديك سؤال حول التبرعات أو التطوع أو عملنا ، يرجى التواصل معنا.",
        formTitle: "أرسل لنا رسالة",
        formDescription: "سنعود إليك في أقرب وقت ممكن.",
        formNameLabel: "الاسم الكامل",
        formNamePlaceholder: "جين دو",
        formEmailLabel: "البريد الإلكتروني",
        formEmailPlaceholder: "jane.doe@example.com",
        formSubjectLabel: "الموضوع",
        formSubjectPlaceholder: "سؤال حول حملة",
        formMessageLabel: "رسالتك",
        formMessagePlaceholder: "الرجاء كتابة رسالتك هنا ...",
        formSendButton: "إرسال رسالة",
        infoTitle: "معلومات الاتصال",
        hqTitle: "مقرنا الرئيسي",
        emailSupportTitle: "دعم البريد الإلكتروني",
        phoneSupportTitle: "الدعم عبر الهاتف",
        followUsTitle: "تابعنا",
        faqTitle: "أسئلة مكررة",
        faqDescription: "ابحث عن إجابات سريعة للأسئلة الشائعة.",
    },
    faq: {
        usage: {
            question: "كيف يتم استخدام تبرعي؟",
            answer: "يذهب 85٪ من كل تبرع مباشرة إلى برامجنا. وتغطي الـ 15٪ المتبقية التكاليف الإدارية وجمع التبرعات الأساسية لضمان قدرتنا على مواصلة عملنا بفعالية. يمكنك الاطلاع على تفصيلنا المالي المفصل في صفحة الشفافية الخاصة بنا."
        },
        tax: {
            question: "هل تبرعي معفى من الضرائب؟",
            answer: "نعم ، Sawaid Al Islah هي منظمة غير ربحية مسجلة 501 (c) (3). جميع التبرعات معفاة من الضرائب إلى الحد الذي يسمح به القانون. ستتلقى إيصالًا آليًا لسجلاتك بعد التبرع."
        },
        country: {
            question: "هل يمكنني التطوع من بلدي؟",
            answer: "لدينا العديد من فرص التطوع عن بعد ، مثل برنامج سفير وسائل التواصل الاجتماعي الخاص بنا. يرجى مراجعة صفحة المتطوعين الخاصة بنا للاطلاع على الوظائف الشاغرة الحالية التي يمكنك المشاركة فيها من أي مكان في العالم."
        },
        campaign_choice: {
            question: "كيف تختارون الحملات التي تديرونها؟",
            answer: "تستند حملاتنا إلى تقييمات الاحتياجات الصارمة التي يتم إجراؤها بالشراكة مع المجتمعات المحلية. نحن نعطي الأولوية للمشاريع التي لها تأثير مستدام طويل الأجل وتعالج الاحتياجات الأكثر أهمية."
        }
    },
    footer: {
        tagline: "توفير الإغاثة واستعادة الأمل وإعادة بناء المجتمعات في جميع أنحاء العالم.",
        quickLinks: "روابط سريعة",
        legal: "قانوني",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
        connect: "اتصل",
        copyright: "كل الحقوق محفوظة."
    },
    about: {
      title: "من نحن",
      subtitle: "مكرسون للمساعدات الإنسانية ودعم التعليم وتمكين المجتمعات النازحة في جميع أنحاء العالم منذ عام 2015",
      missionTitle: "مهمتنا",
      missionText: "تلتزم سواعد الإصلاح بتوفير الإغاثة الإنسانية الفورية والتنمية المستدامة طويلة الأجل للأفراد النازحين واللاجئين والمجتمعات المحرومة. نحن نؤمن بتمكين المجتمعات من خلال التعليم والرعاية الصحية وتنمية البنية التحتية مع الحفاظ على الشفافية الكاملة في عملياتنا.",
      historyTitle: "قصتنا",
      historyText1: "تأسست سواعد الإصلاح في عام 2015 استجابةً للأزمة الإنسانية المتنامية التي تؤثر على ملايين الأفراد النازحين، وبدأت كمبادرة صغيرة يقودها المتطوعون. ما بدأ بحفنة من الأفراد المتفانين نما ليصبح حركة عالمية تعمل في أكثر من 15 دولة.",
      historyText2: "اليوم، نعمل مع الشركاء المحليين والمنظمات الدولية وآلاف المتطوعين لتقديم المساعدات حيث تشتد الحاجة إليها. يجمع نهجنا بين الاستجابة الطارئة الفورية وبرامج التنمية المستدامة طويلة الأجل.",
      founded: "التأسيس",
      countries: "دولة",
      valuesTitle: "قيمنا الأساسية",
      valuesSubtitle: "المبادئ التي توجه كل ما نقوم به",
      values: {
        compassion: {
          title: "الرحمة",
          description: "نقود بالتعاطف والتفهم، ونعامل كل مستفيد بكرامة واحترام."
        },
        transparency: {
          title: "الشفافية",
          description: "الشفافية المالية والتشغيلية الكاملة تبني الثقة مع المانحين والمجتمعات التي نخدمها."
        },
        collaboration: {
          title: "التعاون",
          description: "نتشارك مع المجتمعات المحلية والمنظمات العالمية لتعظيم تأثيرنا."
        },
        impact: {
          title: "التأثير المستدام",
          description: "نركز على الحلول طويلة الأجل التي تمكن المجتمعات من الازدهار بشكل مستقل."
        }
      },
      teamTitle: "فريق القيادة لدينا",
      teamSubtitle: "تعرف على المحترفين المتفانين الذين يوجهون مهمتنا",
      team: {
        director: {
          name: "د. أحمد حسن",
          bio: "مع أكثر من 15 عامًا من الخبرة في العمل الإنساني، يقود الدكتور حسن رؤيتنا الاستراتيجية وعملياتنا."
        },
        operations: {
          name: "سارة ميتشل",
          bio: "تشرف سارة على عملياتنا العالمية، مما يضمن تقديم المساعدات بكفاءة والتنفيذ المستدام للبرامج."
        },
        programs: {
          name: "محمد الرشيد",
          bio: "يدير محمد تطوير برامجنا، ويعمل مباشرة مع المجتمعات لتحديد ومعالجة الاحتياجات الحرجة."
        },
        fundraising: {
          name: "إيلينا رودريغيز",
          bio: "تقود إيلينا جهود جمع التبرعات وعلاقات المانحين، وبناء الشراكات التي تغذي مهمتنا."
        }
      },
      partnersTitle: "شركاؤنا",
      partnersSubtitle: "العمل معًا مع المنظمات الرائدة لتضخيم تأثيرنا",
      legalTitle: "القانونية والتسجيل",
      legalSubtitle: "معلومات التسجيل الرسمي والامتثال",
      legal: {
        registration: "التسجيل",
        location: "الموقع",
        taxDeductible: "جميع التبرعات معفاة من الضرائب إلى أقصى حد يسمح به القانون. نحن ملتزمون بأعلى معايير المساءلة المالية."
      }
    },
    news: {
      title: "الأخبار والتحديثات",
      subtitle: "ابق على اطلاع بأحدث تقاريرنا الميدانية وقصص النجاح والتحديثات التنظيمية",
      featured: "قصص مميزة",
      recent: "التحديثات الأخيرة",
      readMore: "اقرأ المزيد",
      categories: {
        all: "جميع التحديثات",
        "field-report": "تقارير ميدانية",
        "success-story": "قصص نجاح",
        "project-update": "تحديثات المشروع",
        "volunteer-story": "قصص المتطوعين",
        announcement: "إعلانات"
      },
      articles: {
        "winter-relief-2024": {
          title: "إغاثة الشتاء 2024: توفير الدفء لـ 5000 عائلة",
          excerpt: "نجحت حملة الإغاثة الشتوية لدينا في توزيع البطانيات ومستلزمات التدفئة والملابس الدافئة على العائلات في شمال سوريا ومخيمات اللاجئين في تركيا."
        },
        "education-milestone": {
          title: "1000 طالب يتلقون دعمًا تعليميًا كاملاً",
          excerpt: "نحتفل بإنجاز كبير حيث نوفر الدعم التعليمي الشامل بما في ذلك الكتب واللوازم والتدريس الخصوصي لـ 1000 طالب في المجتمعات المحرومة."
        },
        "water-project-complete": {
          title: "مشروع المياه النظيفة يجلب الأمل إلى ريف اليمن",
          excerpt: "بعد أشهر من العمل الشاق، اكتمل أحدث مشروع للآبار المائية، مما يوفر مياه الشرب النظيفة لـ 3000 مقيم في قرية يمنية نائية."
        },
        "volunteer-spotlight": {
          title: "تعرف على متطوعينا: قصص التفاني والتأثير",
          excerpt: "اكتشف القصص الملهمة لمتطوعينا الذين يكرسون وقتهم ومهاراتهم لإحداث فرق في المجتمعات في جميع أنحاء العالم."
        },
        "annual-impact-report": {
          title: "تقرير التأثير السنوي لعام 2023: عام من التحول",
          excerpt: "يعرض تقريرنا السنوي الشامل التأثير الهائل الذي أصبح ممكنًا بفضل مانحينا ومتطوعينا وشركائنا طوال عام 2023."
        },
        "new-partnership": {
          title: "شراكة جديدة مع مؤسسة التعليم الدولية",
          excerpt: "يسعدنا الإعلان عن شراكة استراتيجية ستوسع برامجنا التعليمية للوصول إلى 10000 طالب آخر."
        }
      },
      newsletter: {
        title: "اشترك في نشرتنا الإخبارية",
        description: "احصل على تحديثات شهرية حول عملنا وقصص التأثير والطرق التي يمكنك من خلالها إحداث فرق",
        placeholder: "أدخل عنوان بريدك الإلكتروني",
        subscribe: "اشتراك"
      }
    },
    gallery: {
      title: "معرض الوسائط",
      subtitle: "شاهد تأثير دعمك من خلال الصور ومقاطع الفيديو من الميدان",
      photos: "صور",
      videos: "فيديوهات",
      categories: {
        all: "جميع الوسائط",
        "field-work": "العمل الميداني",
        infrastructure: "البنية التحتية",
        education: "البرامج التعليمية",
        events: "الأحداث والأنشطة"
      },
      pressKit: {
        title: "مجموعة الصحافة والإعلام",
        description: "يمكن للمحترفين الإعلاميين والشركاء تنزيل الصور عالية الدقة والشعارات ومواد العلامة التجارية",
        downloadPhotos: "تنزيل حزمة الصور",
        downloadLogos: "تنزيل الشعارات والأصول"
      }
    }
  }
}

export default translations;
