import type { Locale } from "@rootfablink/i18n";
import type { ContactDepartmentKey } from "@/components/contact/contact-copy";

const en = {
  nav: {
    about: "About Us",
    contact: "Contact",
    help: "Help Center",
    company: "Company"
  },
  contact: {
    title: "Rootfablink Contact Center",
    subtitle: "Contact the right Rootfablink team for sourcing, supplier verification, sales, logistics, customs and platform support.",
    cards: {
      support: ["Support", "Platform usage, account access, technical issues, verification process and general support requests."],
      information: ["General Information", "Company information, platform scope, general questions and initial partnership inquiries."],
      sales: ["Sales and Advertising", "Supplier memberships, sponsored visibility, advertising packages, premium listing and commercial partnerships."],
      logistics: ["Logistics", "Freight, transportation, warehousing, shipment quotes, logistics partnerships and carrier applications."],
      customs: ["Customs", "Customs brokerage, import export procedures, document checks, regulatory consulting and clearance support."]
    } satisfies Record<ContactDepartmentKey, [string, string]>,
    form: {
      title: "Send a message",
      subtitle: "Share your request with the relevant Rootfablink department.",
      fullName: "Full name",
      companyName: "Company name",
      email: "Email",
      phone: "Phone",
      country: "Country",
      subject: "Subject",
      department: "Department",
      message: "Message",
      submit: "Send message",
      required: "Please complete the required fields.",
      pending: "Message delivery infrastructure is being prepared. Please contact us using the relevant email address.",
      departments: {
        support: "Support",
        information: "General Information",
        sales: "Sales and Advertising",
        logistics: "Logistics",
        customs: "Customs"
      } satisfies Record<ContactDepartmentKey, string>
    }
  },
  about: {
    title: "About Rootfablink",
    intro: [
      "Rootfablink is a Türkiye-based B2B marketplace infrastructure designed to connect manufacturers, suppliers, buyers, logistics companies and customs brokers in one digital trade platform.",
      "Rootfablink aims to make product discovery, supplier comparison, RFQ creation, secure communication, logistics coordination and customs operations more organized, transparent and accessible."
    ],
    missionTitle: "Our Mission",
    mission:
      "To build a trusted digital trade infrastructure where companies can discover the right partners, exchange structured commercial information and prepare international trade operations with greater clarity.",
    audienceTitle: "Who It Is Built For",
    audiences: [
      ["Manufacturers", "Factories and producers seeking global buyer demand, verified visibility and structured export workflows."],
      ["Buyers", "Importers, distributors and procurement teams seeking qualified suppliers and comparable quotations."],
      ["Logistics Companies", "Freight, transportation and warehousing providers supporting international trade execution."],
      ["Customs Brokers", "Trade professionals supporting document checks, regulations, import-export procedures and clearance."]
    ],
    trustTitle: "Trust and Verification Approach",
    trust:
      "Company verification, document review, product moderation and auditable platform actions are designed as core trust layers.",
    visionTitle: "Türkiye to Global B2B Trade Vision",
    vision:
      "Rootfablink is designed to help Türkiye-based manufacturing capabilities connect with global demand while remaining open to international suppliers and trade service providers."
  },
  help: {
    title: "Rootfablink Help Center",
    subtitle: "Frequently asked questions about account creation, supplier registration, product listing, RFQ, logistics and customs workflows.",
    groups: [
      ["Account and Registration", "How do I create a Rootfablink account?", "You can choose your role as buyer, supplier, logistics company or customs broker and complete the application form."],
      ["Supplier Registration", "Is supplier registration paid?", "Basic supplier registration and product listing are planned to be free. Sponsored visibility and advertising packages may be offered separately."],
      ["RFQ", "What is an RFQ?", "RFQ is a request for quotation process where buyers specify product, quantity, delivery and requirements to receive offers from suppliers."],
      ["Logistics", "How do logistics companies join the platform?", "Logistics companies can create profiles and connect freight, warehousing and shipment services to buyer and supplier workflows."],
      ["Customs", "What can customs brokers do on the platform?", "Customs brokers can provide document checks, regulatory consulting, import export process guidance and clearance support."],
      ["Contact", "How can I contact Rootfablink?", "You can contact the relevant department using support@rootfablink.com, info@rootfablink.com, sales@rootfablink.com, logistics@rootfablink.com or custom@rootfablink.com."]
    ]
  }
};

const tr: typeof en = {
  nav: {
    about: "Hakkımızda",
    contact: "İletişim",
    help: "Yardım Merkezi",
    company: "Kurumsal"
  },
  contact: {
    title: "Rootfablink İletişim Merkezi",
    subtitle: "Tedarik, üretici doğrulama, satış, lojistik, gümrük ve platform desteği için ilgili ekibimizle iletişime geçin.",
    cards: {
      support: ["Destek", "Platform kullanımı, hesap erişimi, teknik sorunlar, doğrulama süreci ve genel destek talepleri."],
      information: ["Genel Bilgi", "Rootfablink hakkında bilgi, kurumsal sorular, platform kapsamı ve iş birliği başlangıç talepleri."],
      sales: ["Satış ve Reklam", "Üretici üyelikleri, sponsorlu görünürlük, reklam paketleri, premium listeleme ve ticari iş birlikleri."],
      logistics: ["Lojistik", "Nakliye, taşıma, depolama, yük teklifleri, lojistik iş birlikleri ve taşıyıcı firma başvuruları."],
      customs: ["Gümrük", "Gümrük müşavirliği, ithalat ihracat süreçleri, belge kontrolü, mevzuat danışmanlığı ve operasyon desteği."]
    },
    form: {
      title: "Mesaj gönder",
      subtitle: "Talebinizi ilgili Rootfablink departmanıyla paylaşın.",
      fullName: "Ad Soyad",
      companyName: "Şirket adı",
      email: "E-posta",
      phone: "Telefon",
      country: "Ülke",
      subject: "Konu",
      department: "Departman",
      message: "Mesaj",
      submit: "Mesaj gönder",
      required: "Lütfen zorunlu alanları doldurun.",
      pending: "Mesaj gönderme altyapısı hazırlanıyor. Lütfen ilgili e-posta adresinden bize ulaşın.",
      departments: {
        support: "Destek",
        information: "Genel Bilgi",
        sales: "Satış ve Reklam",
        logistics: "Lojistik",
        customs: "Gümrük"
      }
    }
  },
  about: {
    title: "Rootfablink Hakkında",
    intro: [
      "Rootfablink, Türkiye merkezli üreticileri, üreticileri, alıcıları, lojistik firmalarını ve gümrük müşavirlerini tek bir B2B ticaret altyapısında buluşturmak için tasarlanmış dijital bir pazar yeri platformudur.",
      "Rootfablink'in amacı; ürün keşfi, üretici karşılaştırması, teklif talebi, güvenli iletişim, lojistik koordinasyon ve gümrük süreçlerini daha düzenli, şeffaf ve erişilebilir hale getirmektir."
    ],
    missionTitle: "Misyonumuz",
    mission:
      "Şirketlerin doğru ticaret ortaklarını bulabildiği, ticari bilgileri düzenli biçimde paylaşabildiği ve uluslararası operasyonlarını daha net hazırlayabildiği güvenilir bir dijital ticaret altyapısı kurmak.",
    audienceTitle: "Kimler için tasarlandı?",
    audiences: [
      ["Üreticiler", "Global alıcı talebine, doğrulanmış görünürlüğe ve düzenli ihracat iş akışlarına ulaşmak isteyen fabrikalar ve üreticiler."],
      ["Alıcılar", "Nitelikli üretici ve karşılaştırılabilir teklif arayan ithalatçı, distribütör ve satın alma ekipleri."],
      ["Lojistik firmaları", "Uluslararası ticaret operasyonlarını destekleyen navlun, taşıma ve depolama hizmet sağlayıcıları."],
      ["Gümrük müşavirleri", "Belge kontrolü, mevzuat, ithalat-ihracat süreçleri ve gümrükleme desteği sunan ticaret uzmanları."]
    ],
    trustTitle: "Güven ve doğrulama yaklaşımı",
    trust:
      "Şirket doğrulama, belge inceleme, ürün moderasyonu ve denetlenebilir platform aksiyonları temel güven katmanları olarak tasarlanır.",
    visionTitle: "Türkiye'den dünyaya B2B ticaret vizyonu",
    vision:
      "Rootfablink, Türkiye'nin üretim kabiliyetlerini global taleple buluştururken uluslararası üreticilere ve ticaret hizmet sağlayıcılarına da açık olacak şekilde tasarlanır."
  },
  help: {
    title: "Rootfablink Yardım Merkezi",
    subtitle: "Hesap oluşturma, üretici kaydı, ürün listeleme, RFQ, lojistik ve gümrük süreçleri hakkında sık sorulan sorular.",
    groups: [
      ["Hesap ve Kayıt", "Rootfablink hesabı nasıl oluşturulur?", "Alıcı, üretici, lojistik firması veya gümrük müşaviri rolünü seçerek başvuru formunu doldurabilirsiniz."],
      ["Üretici Kaydı", "Üretici kaydı ücretli mi?", "Ürün listeleme ve temel üretici kaydı ücretsiz olacak şekilde planlanmıştır. Sponsorlu görünürlük ve reklam paketleri ayrıca sunulabilir."],
      ["RFQ", "RFQ nedir?", "RFQ, alıcıların ürün, miktar, teslimat ve özel gereksinimlerini belirterek üreticilerden teklif istemesini sağlayan teklif talebi sürecidir."],
      ["Lojistik", "Lojistik firmaları platformda nasıl yer alır?", "Lojistik firmaları profil oluşturarak taşıma, depolama ve sevkiyat hizmetlerini alıcı ve üretici akışlarına bağlayabilir."],
      ["Gümrük", "Gümrük müşavirleri platformda ne yapabilir?", "Gümrük müşavirleri belge kontrolü, mevzuat danışmanlığı, ithalat ihracat süreçleri ve operasyon desteği sağlayabilir."],
      ["İletişim", "Rootfablink ile nasıl iletişime geçebilirim?", "İlgili departman e-posta adreslerinden bize ulaşabilirsiniz: support@rootfablink.com, info@rootfablink.com, sales@rootfablink.com, logistics@rootfablink.com, custom@rootfablink.com."]
    ]
  }
};

export type CorporateCopy = typeof en;

export function getCorporateCopy(locale: Locale): CorporateCopy {
  return locale === "tr" ? tr : en;
}
