"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Tag, MapPin } from "lucide-react";

interface Partner {
  _id: string;
  name: string;
  description?: string;
  descriptionEn?: string;
  discount?: string;
  logo?: Record<string, unknown>;
  website?: string;
  googleMapsUrl?: string;
}

interface PartnershipsPageContentProps {
  partners: Partner[];
}

export default function PartnershipsPageContent({ partners }: PartnershipsPageContentProps) {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen pt-36 sm:pt-40 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("partnerships.title")} <span className="text-primary">{t("partnerships.titleHighlight")}</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t("partnerships.subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 group flex flex-col"
            >
              {/* Logo Area */}
              <div className="h-40 bg-slate-50 dark:bg-slate-950 rounded-xl mb-6 relative overflow-hidden">
                {partner.discount && (
                  <div className="absolute top-3 right-3 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                      <Tag className="w-3 h-3" />
                      {partner.discount}
                    </span>
                  </div>
                )}
                {partner.logo && (
                  <div className="absolute inset-0 flex items-center justify-center p-4 pt-10">
                    <Image
                      src={urlFor(partner.logo).url()}
                      alt={partner.name}
                      width={180}
                      height={100}
                      className="object-contain max-h-[100px] w-auto transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {partner.name}
                </h3>
                <p className="text-text-secondary text-sm mb-6 min-h-[48px]">
                  {language === "en"
                    ? (partner.descriptionEn || partner.description || t("partnerships.defaultDesc"))
                    : (partner.description || t("partnerships.defaultDesc"))}
                </p>

                {/* Action Link */}
                <div className="mt-auto flex gap-3">
                  <Link
                    href={partner.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"
                  >
                    {t("partnerships.visitSite")}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  {partner.googleMapsUrl && (
                    <Link
                      href={partner.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-3 bg-slate-100 dark:bg-slate-800 text-text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"
                      title={t("partnerships.showLocation")}
                    >
                      <MapPin className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {partners.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-2xl text-slate-400">{t("partnerships.noPartners")}</p>
          </div>
        )}
      </div>
    </main>
  );
}
