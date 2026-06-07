import type { Locale } from "@rootfablink/i18n";

export type ContactDepartmentKey = "support" | "information" | "sales" | "logistics" | "customs";

export const contactEmails: Record<ContactDepartmentKey, string> = {
  support: "support@rootfablink.com",
  information: "info@rootfablink.com",
  sales: "sales@rootfablink.com",
  logistics: "logistics@rootfablink.com",
  customs: "custom@rootfablink.com"
};

const en = {
  navLabel: "Contact",
  footerTitle: "Contact Us",
  companyNavLabel: "Company Information",
  heroEyebrow: "Rootfablink Contact Center",
  title: "Contact Rootfablink",
  subtitle: "Get in touch with our team for sourcing, manufacturing, logistics, customs clearance, partnerships, and platform support.",
  responseNote: "Choose the relevant department so your message reaches the right Rootfablink team.",
  cards: {
    support: ["Support", "Technical assistance, platform issues, account support, verification support, and user assistance."],
    information: ["General Information", "Questions about Rootfablink, company information, platform features, and partnerships."],
    sales: ["Sales", "Supplier memberships, premium visibility packages, advertising opportunities, and commercial inquiries."],
    logistics: ["Logistics", "Freight forwarding, transportation solutions, warehousing, shipping, and logistics partnerships."],
    customs: ["Customs", "Customs brokerage, import-export procedures, customs consulting, and clearance support."]
  },
  form: {
    title: "Send a message",
    description: "Complete the form and Rootfablink will prepare your email to the selected department.",
    fullName: "Full Name",
    companyName: "Company Name",
    country: "Country",
    email: "Email Address",
    phone: "Phone Number",
    department: "Department",
    message: "Message",
    submit: "Send Message",
    success: "Your message is ready in your email client.",
    required: "Please enter your name, email address, country and message.",
    departments: {
      support: "Support",
      information: "Information",
      sales: "Sales",
      logistics: "Logistics",
      customs: "Customs"
    }
  },
  company: {
    title: "Rootfablink Company Information",
    subtitle: "Rootfablink is a Global B2B Platform connecting manufacturers, buyers, logistics providers, customs brokers, importers, exporters and industrial buyers.",
    details: [
      ["Official website", "https://rootfablink.com"],
      ["Platform scope", "Manufacturing, sourcing, logistics, customs clearance and international B2B trade workflows"],
      ["Operating model", "Free supplier onboarding, free product listings, RFQs, sponsored visibility and trade service workflows"]
    ]
  }
};

const tr: typeof en = {
  navLabel: "İletişim",
  footerTitle: "İletişim",
  companyNavLabel: "Şirket Bilgileri",
  heroEyebrow: "Rootfablink İletişim Merkezi",
  title: "Rootfablink ile iletişime geçin",
  subtitle: "Tedarik, üretim, lojistik, gümrük müşavirliği, iş ortaklığı ve platform desteği için ekibimizle iletişime geçin.",
  responseNote: "Mesajınızın doğru Rootfablink ekibine ulaşması için ilgili departmanı seçin.",
  cards: {
    support: ["Destek", "Teknik destek, platform sorunları, hesap desteği, doğrulama desteği ve kullanıcı yardımı."],
    information: ["Genel Bilgi", "Rootfablink, şirket bilgileri, platform özellikleri ve iş ortaklıkları hakkında sorular."],
    sales: ["Satış", "Üretici üyelikleri, premium görünürlük paketleri, reklam fırsatları ve ticari talepler."],
    logistics: ["Lojistik", "Navlun, taşıma çözümleri, depolama, sevkiyat ve lojistik iş ortaklıkları."],
    customs: ["Gümrük Müşavirliği", "Gümrük müşavirliği, ithalat-ihracat süreçleri, mevzuat desteği ve beyan işlemleri."]
  },
  form: {
    title: "Mesaj gönder",
    description: "Formu doldurun; Rootfablink mesajınızı seçilen departmana göndermek için e-posta istemcinizi hazırlar.",
    fullName: "Ad Soyad",
    companyName: "Şirket Adı",
    country: "Ülke",
    email: "E-posta Adresi",
    phone: "Telefon Numarası",
    department: "Departman",
    message: "Mesaj",
    submit: "Mesaj Gönder",
    success: "Mesajınız e-posta istemcinizde hazırlandı.",
    required: "Lütfen ad soyad, e-posta adresi, ülke ve mesaj alanlarını doldurun.",
    departments: {
      support: "Destek",
      information: "Bilgi",
      sales: "Satış",
      logistics: "Lojistik",
      customs: "Gümrük"
    }
  },
  company: {
    title: "Rootfablink Şirket Bilgileri",
    subtitle: "Rootfablink; üreticileri, alıcıları, lojistik firmalarını, gümrük müşavirlerini, ithalatçıları, ihracatçıları ve endüstriyel alıcıları buluşturan küresel bir B2B platformdur.",
    details: [
      ["Resmi web sitesi", "https://rootfablink.com"],
      ["Platform kapsamı", "Üretim, tedarik, lojistik, gümrükleme ve uluslararası B2B ticaret iş akışları"],
      ["Çalışma modeli", "Ücretsiz üretici kaydı, ücretsiz ürün listeleme, RFQ, sponsorlu görünürlük ve ticaret hizmetleri"]
    ]
  }
};

const ar: typeof en = {
  navLabel: "اتصل بنا",
  footerTitle: "اتصل بنا",
  companyNavLabel: "معلومات الشركة",
  heroEyebrow: "مركز تواصل Rootfablink",
  title: "تواصل مع Rootfablink",
  subtitle: "تواصل مع فريقنا بخصوص التوريد والتصنيع واللوجستيات والتخليص الجمركي والشراكات ودعم المنصة.",
  responseNote: "اختر القسم المناسب حتى تصل رسالتك إلى فريق Rootfablink الصحيح.",
  cards: {
    support: ["الدعم", "مساعدة تقنية، مشكلات المنصة، دعم الحسابات، دعم التحقق ومساعدة المستخدمين."],
    information: ["معلومات عامة", "أسئلة حول Rootfablink ومعلومات الشركة وميزات المنصة والشراكات."],
    sales: ["المبيعات", "عضويات الموردين، باقات الظهور المميز، فرص الإعلان والاستفسارات التجارية."],
    logistics: ["اللوجستيات", "الشحن، حلول النقل، التخزين، خدمات الشحن وشراكات اللوجستيات."],
    customs: ["الجمارك", "الوساطة الجمركية، إجراءات الاستيراد والتصدير، الاستشارات الجمركية ودعم التخليص."]
  },
  form: {
    title: "إرسال رسالة",
    description: "أكمل النموذج وسيقوم Rootfablink بتحضير بريدك الإلكتروني إلى القسم المختار.",
    fullName: "الاسم الكامل",
    companyName: "اسم الشركة",
    country: "الدولة",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    department: "القسم",
    message: "الرسالة",
    submit: "إرسال الرسالة",
    success: "تم تجهيز رسالتك في عميل البريد الإلكتروني.",
    required: "يرجى إدخال الاسم والبريد الإلكتروني والدولة والرسالة.",
    departments: {
      support: "الدعم",
      information: "المعلومات",
      sales: "المبيعات",
      logistics: "اللوجستيات",
      customs: "الجمارك"
    }
  },
  company: {
    title: "معلومات شركة Rootfablink",
    subtitle: "Rootfablink هي منصة B2B عالمية تربط المصنعين والمشترين وشركات اللوجستيات والمخلصين الجمركيين والمستوردين والمصدرين والمشترين الصناعيين.",
    details: [
      ["الموقع الرسمي", "https://rootfablink.com"],
      ["نطاق المنصة", "التصنيع والتوريد واللوجستيات والتخليص الجمركي وسير عمل التجارة الدولية B2B"],
      ["نموذج التشغيل", "انضمام مجاني للموردين، قوائم منتجات مجانية، طلبات RFQ، ظهور ممول وخدمات تجارية"]
    ]
  }
};

const de: typeof en = {
  navLabel: "Kontakt",
  footerTitle: "Kontakt",
  companyNavLabel: "Unternehmensinformationen",
  heroEyebrow: "Rootfablink Kontaktcenter",
  title: "Rootfablink kontaktieren",
  subtitle: "Kontaktieren Sie unser Team für Beschaffung, Fertigung, Logistik, Zollabwicklung, Partnerschaften und Plattform-Support.",
  responseNote: "Wählen Sie die passende Abteilung, damit Ihre Nachricht das richtige Rootfablink-Team erreicht.",
  cards: {
    support: ["Support", "Technische Hilfe, Plattformprobleme, Kontosupport, Verifizierungsunterstützung und Nutzerhilfe."],
    information: ["Allgemeine Informationen", "Fragen zu Rootfablink, Unternehmensinformationen, Plattformfunktionen und Partnerschaften."],
    sales: ["Vertrieb", "Lieferantenmitgliedschaften, Premium-Sichtbarkeit, Werbemöglichkeiten und kommerzielle Anfragen."],
    logistics: ["Logistik", "Spedition, Transportlösungen, Lagerhaltung, Versand und Logistikpartnerschaften."],
    customs: ["Zoll", "Zollabwicklung, Import-Export-Verfahren, Zollberatung und Unterstützung bei Freigaben."]
  },
  form: {
    title: "Nachricht senden",
    description: "Füllen Sie das Formular aus. Rootfablink bereitet Ihre E-Mail an die gewählte Abteilung vor.",
    fullName: "Vollständiger Name",
    companyName: "Unternehmen",
    country: "Land",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    department: "Abteilung",
    message: "Nachricht",
    submit: "Nachricht senden",
    success: "Ihre Nachricht wurde im E-Mail-Client vorbereitet.",
    required: "Bitte geben Sie Name, E-Mail-Adresse, Land und Nachricht ein.",
    departments: {
      support: "Support",
      information: "Information",
      sales: "Vertrieb",
      logistics: "Logistik",
      customs: "Zoll"
    }
  },
  company: {
    title: "Rootfablink Unternehmensinformationen",
    subtitle: "Rootfablink ist eine globale B2B-Plattform für Hersteller, Einkäufer, Logistikunternehmen, Zollagenten, Importeure, Exporteure und industrielle Einkäufer.",
    details: [
      ["Offizielle Website", "https://rootfablink.com"],
      ["Plattformumfang", "Fertigung, Beschaffung, Logistik, Zollabwicklung und internationale B2B-Handelsabläufe"],
      ["Betriebsmodell", "Kostenloses Lieferanten-Onboarding, kostenlose Produktlistings, RFQs, gesponserte Sichtbarkeit und Handelsservices"]
    ]
  }
};

const fr: typeof en = {
  navLabel: "Contact",
  footerTitle: "Contact",
  companyNavLabel: "Informations sur l'entreprise",
  heroEyebrow: "Centre de contact Rootfablink",
  title: "Contacter Rootfablink",
  subtitle: "Contactez notre équipe pour le sourcing, la fabrication, la logistique, le dédouanement, les partenariats et le support plateforme.",
  responseNote: "Choisissez le service concerné afin que votre message arrive à la bonne équipe Rootfablink.",
  cards: {
    support: ["Support", "Assistance technique, problèmes de plateforme, support de compte, support de vérification et aide utilisateur."],
    information: ["Informations générales", "Questions sur Rootfablink, informations d'entreprise, fonctionnalités de la plateforme et partenariats."],
    sales: ["Ventes", "Adhésions fournisseurs, offres de visibilité premium, opportunités publicitaires et demandes commerciales."],
    logistics: ["Logistique", "Transit, solutions de transport, entreposage, expédition et partenariats logistiques."],
    customs: ["Douanes", "Courtage en douane, procédures import-export, conseil douanier et support au dédouanement."]
  },
  form: {
    title: "Envoyer un message",
    description: "Remplissez le formulaire et Rootfablink préparera votre e-mail pour le service sélectionné.",
    fullName: "Nom complet",
    companyName: "Nom de l'entreprise",
    country: "Pays",
    email: "Adresse e-mail",
    phone: "Numéro de téléphone",
    department: "Service",
    message: "Message",
    submit: "Envoyer le message",
    success: "Votre message est prêt dans votre client e-mail.",
    required: "Veuillez saisir votre nom, votre e-mail, votre pays et votre message.",
    departments: {
      support: "Support",
      information: "Information",
      sales: "Ventes",
      logistics: "Logistique",
      customs: "Douanes"
    }
  },
  company: {
    title: "Informations sur Rootfablink",
    subtitle: "Rootfablink est une plateforme B2B mondiale pour fabricants, acheteurs, entreprises logistiques, courtiers en douane, importateurs, exportateurs et acheteurs industriels.",
    details: [
      ["Site officiel", "https://rootfablink.com"],
      ["Périmètre de la plateforme", "Fabrication, sourcing, logistique, dédouanement et workflows de commerce B2B international"],
      ["Modèle opérationnel", "Onboarding fournisseur gratuit, listings produits gratuits, RFQ, visibilité sponsorisée et services commerciaux"]
    ]
  }
};

const es: typeof en = {
  navLabel: "Contacto",
  footerTitle: "Contacto",
  companyNavLabel: "Información de la empresa",
  heroEyebrow: "Centro de contacto de Rootfablink",
  title: "Contacta con Rootfablink",
  subtitle: "Ponte en contacto con nuestro equipo para sourcing, fabricación, logística, despacho aduanero, alianzas y soporte de plataforma.",
  responseNote: "Elige el departamento adecuado para que tu mensaje llegue al equipo correcto de Rootfablink.",
  cards: {
    support: ["Soporte", "Asistencia técnica, incidencias de plataforma, soporte de cuenta, soporte de verificación y ayuda al usuario."],
    information: ["Información general", "Preguntas sobre Rootfablink, información de la empresa, funciones de la plataforma y alianzas."],
    sales: ["Ventas", "Membresías de proveedores, paquetes de visibilidad premium, oportunidades publicitarias y consultas comerciales."],
    logistics: ["Logística", "Transporte internacional, soluciones de transporte, almacenaje, envíos y alianzas logísticas."],
    customs: ["Aduanas", "Agencia aduanera, procedimientos de importación-exportación, consultoría aduanera y apoyo en despacho."]
  },
  form: {
    title: "Enviar mensaje",
    description: "Completa el formulario y Rootfablink preparará tu correo para el departamento seleccionado.",
    fullName: "Nombre completo",
    companyName: "Nombre de la empresa",
    country: "País",
    email: "Correo electrónico",
    phone: "Número de teléfono",
    department: "Departamento",
    message: "Mensaje",
    submit: "Enviar mensaje",
    success: "Tu mensaje está listo en tu cliente de correo.",
    required: "Introduce nombre, correo electrónico, país y mensaje.",
    departments: {
      support: "Soporte",
      information: "Información",
      sales: "Ventas",
      logistics: "Logística",
      customs: "Aduanas"
    }
  },
  company: {
    title: "Información de Rootfablink",
    subtitle: "Rootfablink es una plataforma B2B global para fabricantes, compradores, empresas logísticas, agentes aduaneros, importadores, exportadores y compradores industriales.",
    details: [
      ["Sitio web oficial", "https://rootfablink.com"],
      ["Alcance de la plataforma", "Fabricación, sourcing, logística, despacho aduanero y flujos de comercio B2B internacional"],
      ["Modelo operativo", "Alta gratuita de proveedores, listados gratuitos, RFQ, visibilidad patrocinada y servicios comerciales"]
    ]
  }
};

const zh: typeof en = {
  navLabel: "联系我们",
  footerTitle: "联系我们",
  companyNavLabel: "公司信息",
  heroEyebrow: "Rootfablink 联系中心",
  title: "联系 Rootfablink",
  subtitle: "如需采购、制造、物流、清关、合作伙伴关系或平台支持，请联系我们的团队。",
  responseNote: "请选择相关部门，以便您的信息送达正确的 Rootfablink 团队。",
  cards: {
    support: ["支持", "技术协助、平台问题、账户支持、验证支持和用户帮助。"],
    information: ["一般信息", "关于 Rootfablink、公司信息、平台功能和合作伙伴关系的问题。"],
    sales: ["销售", "供应商会员、优质曝光方案、广告机会和商业咨询。"],
    logistics: ["物流", "货运代理、运输方案、仓储、发运和物流合作。"],
    customs: ["海关", "报关代理、进出口流程、海关咨询和清关支持。"]
  },
  form: {
    title: "发送消息",
    description: "填写表单后，Rootfablink 会为所选部门准备电子邮件。",
    fullName: "姓名",
    companyName: "公司名称",
    country: "国家",
    email: "电子邮件地址",
    phone: "电话号码",
    department: "部门",
    message: "消息",
    submit: "发送消息",
    success: "您的消息已在电子邮件客户端中准备好。",
    required: "请输入姓名、电子邮件、国家和消息。",
    departments: {
      support: "支持",
      information: "信息",
      sales: "销售",
      logistics: "物流",
      customs: "海关"
    }
  },
  company: {
    title: "Rootfablink 公司信息",
    subtitle: "Rootfablink 是连接制造商、买家、物流公司、报关行、进口商、出口商和工业买家的全球 B2B 平台。",
    details: [
      ["官方网站", "https://rootfablink.com"],
      ["平台范围", "制造、采购、物流、清关和国际 B2B 贸易工作流"],
      ["运营模式", "免费供应商入驻、免费产品列表、RFQ、赞助曝光和贸易服务流程"]
    ]
  }
};

const ru: typeof en = {
  navLabel: "Контакты",
  footerTitle: "Связаться с нами",
  companyNavLabel: "Информация о компании",
  heroEyebrow: "Контактный центр Rootfablink",
  title: "Связаться с Rootfablink",
  subtitle: "Свяжитесь с нашей командой по вопросам поставок, производства, логистики, таможенного оформления, партнерств и поддержки платформы.",
  responseNote: "Выберите нужный отдел, чтобы сообщение попало в правильную команду Rootfablink.",
  cards: {
    support: ["Поддержка", "Техническая помощь, проблемы платформы, поддержка аккаунта, проверка и помощь пользователям."],
    information: ["Общая информация", "Вопросы о Rootfablink, компании, функциях платформы и партнерствах."],
    sales: ["Продажи", "Членство поставщиков, премиум-видимость, рекламные возможности и коммерческие запросы."],
    logistics: ["Логистика", "Экспедирование, транспортные решения, складирование, доставка и логистические партнерства."],
    customs: ["Таможня", "Таможенное брокерство, импортно-экспортные процедуры, консультации и поддержка оформления."]
  },
  form: {
    title: "Отправить сообщение",
    description: "Заполните форму, и Rootfablink подготовит письмо выбранному отделу.",
    fullName: "Полное имя",
    companyName: "Название компании",
    country: "Страна",
    email: "Адрес электронной почты",
    phone: "Номер телефона",
    department: "Отдел",
    message: "Сообщение",
    submit: "Отправить сообщение",
    success: "Ваше сообщение подготовлено в почтовом клиенте.",
    required: "Введите имя, электронную почту, страну и сообщение.",
    departments: {
      support: "Поддержка",
      information: "Информация",
      sales: "Продажи",
      logistics: "Логистика",
      customs: "Таможня"
    }
  },
  company: {
    title: "Информация о Rootfablink",
    subtitle: "Rootfablink — глобальная B2B-платформа для производителей, покупателей, логистических компаний, таможенных брокеров, импортеров, экспортеров и промышленных покупателей.",
    details: [
      ["Официальный сайт", "https://rootfablink.com"],
      ["Охват платформы", "Производство, закупки, логистика, таможенное оформление и международные B2B-процессы"],
      ["Операционная модель", "Бесплатная регистрация поставщиков, бесплатные товарные листинги, RFQ, спонсируемая видимость и торговые сервисы"]
    ]
  }
};

const ja: typeof en = {
  navLabel: "お問い合わせ",
  footerTitle: "お問い合わせ",
  companyNavLabel: "会社情報",
  heroEyebrow: "Rootfablink コンタクトセンター",
  title: "Rootfablink へお問い合わせ",
  subtitle: "調達、製造、物流、通関、パートナーシップ、プラットフォームサポートについて当社チームへご連絡ください。",
  responseNote: "適切な部門を選択すると、メッセージが正しい Rootfablink チームに届きます。",
  cards: {
    support: ["サポート", "技術支援、プラットフォームの問題、アカウントサポート、認証支援、ユーザーサポート。"],
    information: ["一般情報", "Rootfablink、会社情報、プラットフォーム機能、パートナーシップに関する質問。"],
    sales: ["営業", "サプライヤー会員、プレミアム表示、広告機会、商業的なお問い合わせ。"],
    logistics: ["物流", "フォワーディング、輸送ソリューション、倉庫、出荷、物流パートナーシップ。"],
    customs: ["通関", "通関業務、輸出入手続き、通関コンサルティング、クリアランス支援。"]
  },
  form: {
    title: "メッセージを送信",
    description: "フォームに入力すると、Rootfablink が選択した部門宛のメールを準備します。",
    fullName: "氏名",
    companyName: "会社名",
    country: "国",
    email: "メールアドレス",
    phone: "電話番号",
    department: "部門",
    message: "メッセージ",
    submit: "メッセージを送信",
    success: "メールクライアントでメッセージが準備されました。",
    required: "氏名、メールアドレス、国、メッセージを入力してください。",
    departments: {
      support: "サポート",
      information: "情報",
      sales: "営業",
      logistics: "物流",
      customs: "通関"
    }
  },
  company: {
    title: "Rootfablink 会社情報",
    subtitle: "Rootfablink は、メーカー、バイヤー、物流会社、通関業者、輸入業者、輸出業者、産業バイヤーをつなぐグローバル B2B プラットフォームです。",
    details: [
      ["公式ウェブサイト", "https://rootfablink.com"],
      ["プラットフォーム範囲", "製造、調達、物流、通関、国際 B2B 取引ワークフロー"],
      ["運用モデル", "無料サプライヤー登録、無料商品掲載、RFQ、スポンサー表示、取引サービス"]
    ]
  }
};

export const contactCopy: Record<Locale, typeof en> = {
  en,
  tr,
  ar,
  zh,
  ru,
  de,
  fr,
  es,
  ja
};

export const contactDepartmentOrder: ContactDepartmentKey[] = ["support", "information", "sales", "logistics", "customs"];
