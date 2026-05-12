export default {
  app: {
    title: "Shindos Insurance",
    subtitle: "O'zbekiston bozori uchun sug'urta xizmati",
    themeLight: "Yorug'",
    themeDark: "Qorong'u",
    language: "Til",
    searchPlaceholder: "Mahsulotni toping",
    contact: "Biz bilan bog'lanish",
    login: "Kirish",
  },
  nav: {
    home: "Bosh sahifa",
    products: "Mahsulotlar",
    calculators: "Kalkulyatorlar",
    offers: "Takliflar",
    auto: "Avto",
    property: "Mulk",
    health: "Sog'liq",
    travel: "Sayohat",
    life: "Hayot",
  },
  home: {
    heroTitle: "Kundalik ehtiyojlar uchun sug'urta mahsulotlari",
    heroDescription:
      "Mahsulotni tanlang, shartlarni ko'rib chiqing va bir necha daqiqada taxminiy premiyani hisoblang.",
    heroTabs: ["Jismoniy shaxslar", "Biznes", "Hamkorlar"],
    featuredTitle: "Mashhur mahsulotlar",
    featuredSubtitle: "Shu oy eng ko'p so'ralgan mahsulotlar",
    productGridTitle: "Barcha sug'urta mahsulotlari",
    productGridSubtitle: "Batafsil shartlar har bir mahsulot sahifasida",
    quickTitle: "Tezkor amallar",
    quickActions: [
      "Polis narxini baholash",
      "Kerakli hujjatlarni ko'rish",
      "Mahsulotlarni solishtirish",
    ],
    viewProduct: "Mahsulot sahifasini ochish",
    exploreAll: "Barcha mahsulotlarni ko'rish",
    sellingTitle: "Ariza berishga tayyormisiz?",
    sellingText:
      "QR-kodni skanerlang — ariza shaklini oching va onlayn yuboring.",
    ctaLabel: "Ariza havolasini ochish",
    disclaimer:
      "Kalkulyatordagi barcha qiymatlar o'quv maqsadida va yakuniy taklif emas.",
    contactTitle: "Biz bilan bog'lanish",
    contactPortalIntro: "Sug'urta sotish uchun:",
    contactLoginLabel: "Login:",
    contactPasswordLabel: "Parol:",
  },
  productPage: {
    back: "Mahsulotlarga qaytish",
    notFoundTitle: "Mahsulot topilmadi",
    notFoundDescription: "Bu mahsulot sahifasi mavjud emas.",
    whatCovered: "Nima qoplanadi",
    requiredDocs: "Kerakli hujjatlar",
    calculateTitle: "Polis narxini hisoblash",
    calculateSubtitle: "Tez baholash uchun onlayn kalkulyator",
    benefitsCardTitle: "Ushbu polis bilan siz olasiz",
    statsTitle: "Nima uchun bu mahsulot",
    stepsTitle: "Qanday rasmiylashtirish kerak",
    faqTitle: "Tez-tez beriladigan savollar",
    showMore: "Batafsil",
  },
  products: {
    auto: {
      name: "Avtosug'urta",
      short: "Avtomobil va javobgarlikni yo'l xavflaridan himoya.",
      heroLead: "Shaxsiy haydovchilar uchun KASKO va javobgarlik variantlari.",
      highlights: [
        "Bir necha qadamda onlayn ariza",
        "Zarar ro'yxatga olishda yordam",
        "Turli haydovchi profillari uchun moslashuvchan variantlar",
      ],
      coverage: [
        "Yo'l-transport hodisalari va to'qnashuvdan zarar",
        "Tanlangan rejada uchinchi shaxslarga nisbatan javobgarlik",
        "Paketga qo'shimcha xavflar",
      ],
      documents: [
        "Pasport yoki shaxsni tasdiqlovchi hujjat",
        "Transport vositasi ro'yxatdan o'tkazish guvohnomasi",
        "Haydovchilik guvohnomasi",
      ],
      stats: [
        { value: "24/7", label: "Qo'llab-quvvatlash mavjudligi" },
        { value: "2 daq", label: "O'rtacha hisob-kitob vaqti" },
        { value: "95%", label: "Raqamli arizalar ulushi" },
      ],
      steps: [
        "Avtomobil va haydovchi ma'lumotlarini kiriting",
        "Kerakli sug'urta paketini tanlang",
        "Tasdiqlang va maslahatchi javobini kuting",
      ],
      faq: [
        {
          question: "Polisni onlayn sotib olish mumkinmi?",
          answer:
            "Ha, mahsulot onlayn old-ariza va maslahatchi bilan keyingi ishlashni qo'llab-quvvatlaydi.",
        },
        {
          question: "Kalkulyator natijasi yakuniymi?",
          answer:
            "Yo'q, bu taxmin. Yakuniy premium underwriting tekshiruvlariga bog'liq.",
        },
      ],
    },
    property: {
      name: "Mulk sug'urtasi",
      short: "Kvartira yoki uyni odatdagi xavflardan himoya qilish.",
      heroLead: "Uy-joylar uchun moslashtiriladigan qoplamali sug'urta.",
      highlights: [
        "Tez tanlash uchun oddiy reja darajalari",
        "Tasodifiy shikastlanishdan himoya",
        "Kvartira va shaxsiy uy uchun mos",
      ],
      coverage: [
        "Yong'in va suv zarari",
        "Tanlangan tabiiy va tasodifiy xavflar",
        "Sug'urta qilingan joyda uchinchi shaxslarga zarar",
      ],
      documents: [
        "Pasport yoki shaxsni tasdiqlovchi hujjat",
        "Mulk yoki ijaraga oid hujjat",
        "Ob'ekt tavsifnomasi",
      ],
      stats: [
        { value: "3", label: "Reja darajalari" },
        { value: "48 soat", label: "O'rtacha javob muddati" },
        { value: "80%", label: "Onlayn hisob-kitob so'rovlari" },
      ],
      steps: [
        "Manzil va mulk qiymatini ko'rsating",
        "Kerakli qoplamani tanlang",
        "Arizani yuboring va tasdiqni oling",
      ],
      faq: [
        {
          question: "Ijarchi rasmiylashtira oladimi?",
          answer: "Ha, paket turi va polis shartlariga qarab.",
        },
        {
          question: "Ob'ekt tekshiruvi kerakmi?",
          answer:
            "Oddiy holatlarda odatda yo'q; maxsus holatlarda qo'shimcha tekshiruv talab qilinishi mumkin.",
        },
      ],
    },
    health: {
      name: "Sog'liq sug'urtasi",
      short: "Shaxslar va oilalar uchun tibbiy dasturlar.",
      heroLead: "Reja darajasini tanlang va hamkor klinikalarga kirish oling.",
      highlights: [
        "Aniq darajalar: asosiy, qulay, premium",
        "Rejalashtirilgan va favqulodda tibbiy yordam",
        "Qulay oylik to'lov formati",
      ],
      coverage: [
        "Shifokor maslahati va diagnostika",
        "Tanlangan paket bo'yicha statsionar",
        "Kengaytirilgan yordam uchun qo'shimcha variantlar",
      ],
      documents: [
        "Pasport yoki shaxsni tasdiqlovchi hujjat",
        "Ariza beruvchi shaxsiy ma'lumotlari",
        "Qisqa sog'liq deklaratsiyasi",
      ],
      stats: [
        { value: "3", label: "Asosiy reja darajalari" },
        { value: "24/7", label: "Yordam chizig'i" },
        { value: "10+", label: "Hamkor tarmog'i shaharlari" },
      ],
      steps: [
        "Qoplash paketi va yosh profilini tanlang",
        "Qisqa sog'liq so'rovnomasini to'ldiring",
        "Shartlarni tasdiqlang va polisni faollashtiring",
      ],
      faq: [
        {
          question: "Oilaviy a'zolarni qo'shish mumkinmi?",
          answer: "Ha, tanlangan rejaga qarab oilaviy kengaytirish mumkin.",
        },
        {
          question: "Qoplash qachon boshlanadi?",
          answer:
            "Boshlanish sanasi polis shartlari bilan belgilanadi va kutish muddati bo'lishi mumkin.",
        },
      ],
    },
    travel: {
      name: "Sayohat sug'urtasi",
      short: "Chet elda tibbiy va sayohat xavflaridan himoya.",
      heroLead: "MDH yoki butun dunyo bo'ylab xavfsiz sayohat qiling.",
      highlights: [
        "Kunlik asosda premium hisobi",
        "Manzil bo'yicha qoplash variantlari",
        "Yakka va guruh sayohatlari uchun",
      ],
      coverage: [
        "Chet elda favqulodda tibbiy yordam",
        "Tanlangan sayohat hodisalari",
        "Paket shartlari bo'yicha yordam",
      ],
      documents: [
        "Pasport nusxasi",
        "Sayohat sanalari va yo'nalish",
        "Sayohatchilar ro'yxati",
      ],
      stats: [
        { value: "60", label: "Tez kalkulyatorda maks. kunlar" },
        { value: "2", label: "Manzil mintaqalari" },
        { value: "10", label: "Bitta arizada sayohatchilar" },
      ],
      steps: [
        "Yo'nalish va davomiylikni tanlang",
        "Sayohatchilar soni va ma'lumotlarini kiriting",
        "Yuboring va polis shartlarini oling",
      ],
      faq: [
        {
          question: "Shoshilinch sayohatni sug'urtalash mumkinmi?",
          answer: "Ha, shoshilinch sayohatlar uchun ham onlayn old-ariza mavjud.",
        },
        {
          question: "Viza uchun yordam kiradimi?",
          answer:
            "Ko'pincha viza uchun talab qilinadigan sug'urta guvohnomasi ma'lumotlari beriladi.",
        },
      ],
    },
    life: {
      name: "Hayot sug'urtasi",
      short: "Oilaviy maqsadlar uchun uzoq muddatli moliyaviy himoya.",
      heroLead: "Shaxsiy reja uchun moslashuvchan muddat va sug'urta summasi.",
      highlights: [
        "Uzoq muddatli himoya strategiyasi",
        "Moslashtiriladigan muddat va sug'urta summasi",
        "Oilaviy moliyaviy reja uchun foydali",
      ],
      coverage: [
        "Polis shartlariga muvofiq sug'urta hodisasidan himoya",
        "Paket bo'yicha qo'shimcha kengaytmalar",
        "Polis muddati bo'ylab qo'llab-quvvatlash",
      ],
      documents: [
        "Pasport yoki shaxsni tasdiqlovchi hujjat",
        "Ariza beruvchi anketa",
        "Kerak bo'lsa qo'shimcha deklaratsiya",
      ],
      stats: [
        { value: "30", label: "Kalkulyatorda maks. yillar" },
        { value: "USD", label: "Demoda qoplash formati" },
        { value: "1", label: "Oddiy oylik taxmin ko'rinishi" },
      ],
      steps: [
        "Sug'urta summasi va muddatni tanlang",
        "Shaxsiy va foyda oluvchi ma'lumotlarini kiriting",
        "Polisni tasdiqlang va to'lov jadvalini belgilang",
      ],
      faq: [
        {
          question: "Keyinroq qoplashni o'zgartirish mumkinmi?",
          answer:
            "O'zgarishlar sug'urtachi qoidalari va polis bosqichiga qarab mumkin.",
        },
        {
          question: "Foyda oluvchi kim bo'lishi mumkin?",
          answer:
            "Foyda oluvchini polis va mahalliy qonunchilikka muvofiq tayinlash mumkin.",
        },
      ],
    },
  },
  calculators: {
    auto: {
      title: "Avtosug'urta",
      carValue: "Avtomobil qiymati (USD)",
      age: "Haydovchi yoshi",
      experience: "Haydash tajribasi (yil)",
      result: "Taxminiy yillik premium",
    },
    property: {
      title: "Mulk sug'urtasi",
      propertyValue: "Mulk qiymati (USD)",
      area: "Maydon (m²)",
      securityLevel: "Xavfsizlik darajasi",
      result: "Taxminiy yillik premium",
      low: "Asosiy",
      medium: "Standart",
      high: "Kengaytirilgan",
    },
    health: {
      title: "Sog'liq sug'urtasi",
      age: "Yosh",
      planType: "Reja turi",
      hasChronic: "Surunkali kasalliklar",
      result: "Taxminiy oylik premium",
      basic: "Asosiy",
      comfort: "Qulay",
      premium: "Premium",
      yes: "Ha",
      no: "Yo'q",
    },
    travel: {
      title: "Sayohat sug'urtasi",
      days: "Sayohat davomiyligi (kun)",
      destination: "Manzil mintaqasi",
      travelers: "Sayohatchilar soni",
      result: "Sayohat uchun taxminiy premium",
      local: "MDH",
      global: "Butun dunyo",
    },
    life: {
      title: "Hayot sug'urtasi",
      age: "Yosh",
      coverage: "Sug'urta summasi (USD)",
      term: "Muddat (yil)",
      result: "Taxminiy oylik premium",
    },
  },
  common: {
    insuranceDisclaimer:
      "O'quv loyihasi: barcha summalar va shartlar faqat namoyish uchun.",
  },
  adminLink: "Admin panel",
};
