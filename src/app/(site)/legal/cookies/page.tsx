import Link from "next/link";

export const metadata = {
  title: "Çerez Politikası - Startup ve Finans Kulübü",
  description: "Startup ve Finans Kulübü web sitesi çerez kullanımı hakkında bilgilendirme.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="gradient-text">Çerez Politikası</span>
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
            <p className="text-lg">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">1. Çerez Nedir?</h2>
              <p>
                Çerezler, web sitemizi ziyaret ettiğinizde cihazınıza yerleştirilen küçük metin dosyalarıdır. 
                Bu dosyalar, site deneyiminizi iyileştirmek için kullanılır.
              </p>
            </div>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">2. Kullandığımız Çerezler</h2>
              <p>
                Web sitemizde aşağıdaki türde çerezler kullanılmaktadır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Gerekli Çerezler:</strong> Sitenin düzgün çalışması için zorunlu çerezler</li>
                <li><strong>Analitik Çerezler:</strong> Site trafiğini ve kullanımını analiz etmek için</li>
                <li><strong>Tercih Çerezleri:</strong> Tema ve dil tercihlerinizi hatırlamak için</li>
              </ul>
            </div>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">3. Çerez Yönetimi</h2>
              <p>
                Tarayıcı ayarlarınızdan çerezleri kontrol edebilir veya devre dışı bırakabilirsiniz. 
                Ancak bazı çerezleri devre dışı bırakmak, site işlevselliğini etkileyebilir.
              </p>
            </div>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">4. İletişim</h2>
              <p>
                Çerez politikamız hakkında sorularınız için:
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
