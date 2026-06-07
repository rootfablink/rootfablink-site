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
      "Rootfablink is a professional business network that connects manufacturers, buyers, logistics providers and customs brokers through one Global B2B Platform.",
      "The platform helps companies discover new business partners, reach international markets, manage quotation processes and operate cross-border trade more efficiently.",
      "Rootfablink exists to build trusted commercial connections, increase manufacturer visibility and make global B2B trade more accessible."
    ],
    missionTitle: "Our Mission",
    mission:
      "To create a transparent, accessible and sustainable B2B ecosystem that enables trusted commercial relationships between manufacturers and buyers worldwide.\n\nTo provide digital solutions that help companies reach new markets, develop international partnerships and accelerate commercial growth.",
    audienceTitle: "Platform Participants",
    audiences: [
      ["Manufacturers", "For manufacturers that want to present products to international markets, connect with new buyers and manage quotation requests."],
      ["Buyers", "For businesses that want to discover reliable manufacturers, compare products and manage sourcing more efficiently."],
      ["Logistics Providers", "For logistics providers that want to connect directly with manufacturers and buyers across international transportation, delivery and operational workflows."],
      ["Customs Brokers", "For customs brokers that provide professional customs, foreign trade and regulatory services."]
    ],
    trustTitle: "Trust and Verification Approach",
    trust:
      "Company verification, document review, product moderation and auditable platform actions are designed as core trust layers.",
    visionTitle: "Our Vision",
    vision:
      "To become one of the world's most trusted and effective B2B platforms for manufacturers, buyers, logistics providers and customs brokers.\n\nTo lead the digital transformation of global trade and help businesses access opportunities beyond borders."
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
      "Rootfablink, üreticileri, alıcıları, lojistik firmalarını ve gümrük müşavirlerini tek bir küresel B2B platformda buluşturan profesyonel bir iş ağıdır.",
      "Platform, şirketlerin yeni iş ortakları bulmasını, ürünlerini uluslararası pazarlara ulaştırmasını, teklif süreçlerini yönetmesini ve sınır ötesi ticaret operasyonlarını daha verimli yürütmesini sağlar.",
      "Rootfablink'in amacı; güvenilir ticari bağlantılar kurmak, üreticilerin görünürlüğünü artırmak ve küresel B2B ticareti daha erişilebilir hale getirmektir."
    ],
    missionTitle: "Misyonumuz",
    mission:
      "Dünya genelindeki üreticiler ile alıcılar arasında güvene dayalı ticari ilişkiler kurulmasını sağlayan, şeffaf, erişilebilir ve sürdürülebilir bir B2B ekosistemi oluşturmak.\n\nŞirketlerin yeni pazarlara ulaşmasını, uluslararası iş birlikleri geliştirmesini ve ticari büyümelerini hızlandırmasını sağlayan dijital çözümler sunmak.",
    audienceTitle: "Platform Katılımcıları",
    audiences: [
      ["Üreticiler", "Ürünlerini uluslararası pazarlara sunmak, yeni alıcılarla bağlantı kurmak ve teklif taleplerini yönetmek isteyen üretici firmalar için tasarlanmıştır."],
      ["Alıcılar", "Güvenilir üreticiler bulmak, ürün karşılaştırmak ve tedarik süreçlerini daha verimli yönetmek isteyen işletmeler için tasarlanmıştır."],
      ["Lojistik Firmaları", "Uluslararası taşıma, teslimat ve operasyonel süreçlerde üretici ve alıcılarla doğrudan bağlantı kurmak isteyen lojistik sağlayıcıları için tasarlanmıştır."],
      ["Gümrük Müşavirleri", "Gümrük, dış ticaret ve mevzuat süreçlerinde profesyonel hizmet sunmak isteyen gümrük müşavirleri için tasarlanmıştır."]
    ],
    trustTitle: "Güven ve doğrulama yaklaşımı",
    trust:
      "Şirket doğrulama, belge inceleme, ürün moderasyonu ve denetlenebilir platform aksiyonları temel güven katmanları olarak tasarlanır.",
    visionTitle: "Vizyonumuz",
    vision:
      "Üreticiler, alıcılar, lojistik firmaları ve gümrük müşavirleri için dünyanın en güvenilir ve en etkili B2B platformlarından biri olmak.\n\nKüresel ticaretin dijitalleşmesine öncülük ederek işletmelerin sınırları aşan yeni fırsatlara erişmesini sağlamak."
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
