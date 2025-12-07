import Link from "next/link";

export const metadata = {
  title: "Gizlilik Politikası - Startup ve Finans Kulübü",
  description: "Startup ve Finans Kulübü gizlilik politikası ve kişisel verilerin korunması hakkında bilgilendirme.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="gradient-text">Gizlilik Politikası</span>
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
            <p className="text-lg">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">1. Toplanan Bilgiler</h2>
              <p>
                Web sitemizi ziyaret ettiğinizde veya etkinliklerimize katıldığınızda, aşağıdaki bilgileri toplayabiliriz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ad ve soyad</li>
                <li>E-posta adresi</li>
                <li>Üniversite ve bölüm bilgisi</li>
                <li>İletişim bilgileri</li>
              </ul>
            </div>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">2. Bilgilerin Kullanımı</h2>
              <p>
                Topladığımız bilgiler şu amaçlarla kullanılmaktadır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Etkinlik kayıtları ve bildirimleri</li>
                <li>Kulüp içi iletişim</li>
                <li>Hizmetlerimizi iyileştirme</li>
              </ul>
            </div>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">3. Bilgi Güvenliği</h2>
              <p>
                Kişisel bilgilerinizin güvenliği bizim için önemlidir. Bilgilerinizi korumak için 
                uygun güvenlik önlemlerini uygulamaktayız. Bilgileriniz üçüncü taraflarla paylaşılmamaktadır.
              </p>
            </div>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">4. İletişim</h2>
              <p>
                Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <p className="text-primary">startupvefinanstoplulugu@gmail.com</p>
            </div>
          </div>

          <div className="mt-12">
            <Link 
              href="/"
              className="text-primary hover:text-primary-light transition-colors"
            >
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
