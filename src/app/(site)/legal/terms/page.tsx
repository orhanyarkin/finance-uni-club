import Link from "next/link";

export const metadata = {
  title: "Kullanım Şartları - Startup ve Finans Kulübü",
  description: "Startup ve Finans Kulübü web sitesi kullanım şartları ve koşulları.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="gradient-text">Kullanım Şartları</span>
          </h1>
          
          <p className="text-xl text-text-muted italic max-w-2xl mx-auto border-l-4 border-primary pl-4 py-2 bg-white/5 rounded-r-xl">
          &quot;Geleceği şekillendiren girişimcilerin yetiştiği topluluk&quot;
        </p>
          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
            <p className="text-lg">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">1. Kabul Şartları</h2>
              <p>
                Bu web sitesini kullanarak, bu kullanım şartlarını kabul etmiş olursunuz. 
                Şartları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
              </p>
            </div>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">2. Hizmet Kullanımı</h2>
              <p>
                Web sitemizi ve hizmetlerimizi aşağıdaki koşullar dahilinde kullanabilirsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Yasal amaçlarla kullanım</li>
                <li>Başkalarının haklarına saygı</li>
                <li>Doğru ve güncel bilgi sağlama</li>
                <li>Spam veya zararlı içerik paylaşmama</li>
              </ul>
            </div>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">3. Fikri Mülkiyet</h2>
              <p>
                Bu web sitesindeki tüm içerik, tasarım ve materyaller Startup ve Finans Kulübü&apos;ne aittir. 
                İzinsiz kopyalama veya dağıtım yasaktır.
              </p>
            </div>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">4. Sorumluluk Reddi</h2>
              <p>
                Web sitemizdeki bilgiler genel bilgilendirme amaçlıdır. Yatırım tavsiyesi değildir. 
                WhatsApp&apos;tan Sorularınızı almadan önce profesyonel danışmanlık almanızı öneririz.
              </p>
            </div>

            <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">5. İletişim</h2>
              <p>
                Kullanım şartları hakkında sorularınız için:
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
