import { Locale } from "@/i18n-config";

const translations: Record<Locale, any> = {
  en: {
    nav: {
      campaigns: 'Campaigns',
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
      viewAllCampaigns: "View All Campaigns"
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
            answer: "Yes, Sawaid Al islah is a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the extent allowed by law. You will receive an automated receipt for your records after donating."
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
    }
  },
  ar: {
    nav: {
        campaigns: 'الحملات',
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
        viewAllCampaigns: "عرض كل الحملات"
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
            answer: "نعم ، Sawaid Al islah هي منظمة غير ربحية مسجلة 501 (c) (3). جميع التبرعات معفاة من الضرائب إلى الحد الذي يسمح به القانون. ستتلقى إيصالًا آليًا لسجلاتك بعد التبرع."
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
    }
  }
}

export default translations;
