export interface BlogPost {
  id: string;
  title: {
    tr: string;
    en: string;
  };
  slug: string;
  excerpt: {
    tr: string;
    en: string;
  };
  content: {
    tr: string;
    en: string;
  };
  coverImage: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: {
      tr: "2024'te Fintech Sektöründe Öne Çıkan Trendler",
      en: "Emerging Trends in Fintech Sector in 2024",
    },
    slug: "fintech-trendleri-2024",
    excerpt: {
      tr: "Yapay zeka, blockchain ve açık bankacılık gibi teknolojilerin fintech sektörünü nasıl dönüştürdüğünü keşfedin.",
      en: "Discover how technologies like AI, blockchain and open banking are transforming the fintech sector.",
    },
    content: {
      tr: `# 2024'te Fintech Sektöründe Öne Çıkan Trendler

Fintech sektörü her geçen gün yeni teknolojilerle evrim geçiriyor. 2024 yılında öne çıkan trendleri inceleyelim.

## Yapay Zeka ve Makine Öğrenmesi

Yapay zeka, finans sektöründe müşteri deneyiminden risk yönetimine kadar birçok alanda devrim yaratıyor. Chatbot'lar, kişiselleştirilmiş finansal danışmanlık ve fraud detection sistemleri artık standart hale geldi.

## Blockchain ve DeFi

Merkezi olmayan finans (DeFi) platformları, geleneksel bankacılık sistemine alternatif sunmaya devam ediyor. Smart contract'lar sayesinde daha şeffaf ve güvenli işlemler mümkün.

## Açık Bankacılık

Open Banking API'leri sayesinde, kullanıcılar finansal verilerini güvenli bir şekilde üçüncü parti uygulamalarla paylaşabiliyor. Bu da daha iyi finansal hizmetlere erişimi kolaylaştırıyor.

## Sonuç

Fintech sektörü, teknolojinin sınırlarını zorlayarak finansal hizmetleri daha erişilebilir hale getiriyor. Gelecek yıllarda bu trendlerin daha da güçlenmesi bekleniyor.`,
      en: `# Emerging Trends in Fintech Sector in 2024

The fintech sector is evolving with new technologies every day. Let's examine the prominent trends in 2024.

## Artificial Intelligence and Machine Learning

AI is revolutionizing many areas in the finance sector, from customer experience to risk management. Chatbots, personalized financial advisory and fraud detection systems have now become standard.

## Blockchain and DeFi

Decentralized finance (DeFi) platforms continue to offer alternatives to traditional banking systems. More transparent and secure transactions are possible thanks to smart contracts.

## Open Banking

Thanks to Open Banking APIs, users can securely share their financial data with third-party applications. This facilitates access to better financial services.

## Conclusion

The fintech sector is making financial services more accessible by pushing the boundaries of technology. These trends are expected to strengthen further in the coming years.`,
    },
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    author: "Startup ve Finans Kulübü",
    date: "2024-12-01",
    category: "Fintech",
    readTime: "5 dk",
  },
  {
    id: "2",
    title: {
      tr: "Startup Kurarken Dikkat Edilmesi Gerekenler",
      en: "Things to Consider When Starting a Startup",
    },
    slug: "startup-kurma-rehberi",
    excerpt: {
      tr: "Başarılı bir startup kurmak için gereken adımları ve kritik noktaları öğrenin.",
      en: "Learn the necessary steps and critical points to establish a successful startup.",
    },
    content: {
      tr: `# Startup Kurarken Dikkat Edilmesi Gerekenler

Bir startup kurmak heyecan verici ama aynı zamanda zorlayıcı bir süreç. İşte başarılı olmak için dikkat etmeniz gerekenler.

## 1. Problem Çözümü

Her başarılı startup, gerçek bir probleme çözüm sunar. Hedef kitlenizin sorunlarını anlayın ve özgün çözümler geliştirin.

## 2. Pazar Araştırması

Girdiğiniz pazarı derinlemesine araştırın. Rakiplerinizi tanıyın, hedef kitlenizi belirleyin ve pazar büyüklüğünü değerlendirin.

## 3. MVP (Minimum Viable Product)

Ürününüzün en basit versiyonunu hızlıca pazara sunun. Kullanıcı geri bildirimlerini toplayın ve ürününüzü geliştirin.

## 4. Finansal Planlama

Bütçenizi dikkatli yönetin. Hangi kanallarda ne kadar harcama yapacağınızı planlayın ve nakit akışınızı sürekli takip edin.

## 5. Doğru Ekip

Başarı için tamamlayıcı becerilere sahip, vizyon sahibi bir ekip kurun. Kültür uyumu önemlidir.

## Sonuç

Startup kurmak bir maraton gibidir. Sabırlı olun, öğrenmeye açık kalın ve esnek düşünün.`,
      en: `# Things to Consider When Starting a Startup

Starting a startup is exciting but also challenging. Here's what you need to pay attention to for success.

## 1. Problem Solving

Every successful startup solves a real problem. Understand your target audience's problems and develop unique solutions.

## 2. Market Research

Research the market you're entering in depth. Know your competitors, identify your target audience and evaluate market size.

## 3. MVP (Minimum Viable Product)

Quickly launch the simplest version of your product to market. Collect user feedback and improve your product.

## 4. Financial Planning

Manage your budget carefully. Plan how much you will spend on which channels and constantly track your cash flow.

## 5. Right Team

Build a visionary team with complementary skills for success. Cultural fit matters.

## Conclusion

Starting a startup is like a marathon. Be patient, stay open to learning and think flexibly.`,
    },
    coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    author: "Startup ve Finans Kulübü",
    date: "2024-11-28",
    category: "Girişimcilik",
    readTime: "7 dk",
  },
  {
    id: "3",
    title: {
      tr: "Borsa İstanbul'da Yatırım Stratejileri",
      en: "Investment Strategies in Borsa Istanbul",
    },
    slug: "bist-yatirim-stratejileri",
    excerpt: {
      tr: "BIST'te başarılı olmak için temel yatırım stratejilerini ve risk yönetimi tekniklerini öğrenin.",
      en: "Learn basic investment strategies and risk management techniques to succeed in BIST.",
    },
    content: {
      tr: `# Borsa İstanbul'da Yatırım Stratejileri

Borsa İstanbul'da yatırım yapmak ciddi bir planlama ve strateji gerektirir. İşte bilmeniz gerekenler.

## Temel Analiz

Şirketlerin finansal tablolarını inceleyin. Gelir tablosu, bilanço ve nakit akışı raporları temel analiz için kritiktir.

## Teknik Analiz

Grafik formasyonları, destek-direnç seviyeleri ve göstergeleri kullanarak piyasa hareketlerini tahmin etmeye çalışın.

## Risk Yönetimi

Portföyünüzü çeşitlendirin ve stop-loss seviyelerini belirleyin. Kaybetmeyi göze alabileceğinizden fazla yatırım yapmayın.

## Uzun Vadeli Yaklaşım

Kısa vadeli dalgalanmalara kapılmayın. Kaliteli şirketlere uzun vadeli yatırım yapın.

## Sürekli Öğrenme

Piyasaları takip edin, ekonomik haberleri okuyun ve yatırım bilginizi sürekli geliştirin.`,
      en: `# Investment Strategies in Borsa Istanbul

Investing in Borsa Istanbul requires serious planning and strategy. Here's what you need to know.

## Fundamental Analysis

Examine companies' financial statements. Income statement, balance sheet and cash flow reports are critical for fundamental analysis.

## Technical Analysis

Try to predict market movements using chart formations, support-resistance levels and indicators.

## Risk Management

Diversify your portfolio and set stop-loss levels. Don't invest more than you can afford to lose.

## Long-Term Approach

Don't get caught up in short-term fluctuations. Make long-term investments in quality companies.

## Continuous Learning

Follow the markets, read economic news and constantly improve your investment knowledge.`,
    },
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    author: "Startup ve Finans Kulübü",
    date: "2024-11-25",
    category: "Yatırım",
    readTime: "6 dk",
  },
];


