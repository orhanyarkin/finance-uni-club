"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

interface PartnerLogosProps {
  partners: any[];
}

export default function PartnerLogos({ partners }: PartnerLogosProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Duplicate partners array to ensure smooth infinite scroll
  // If partners is empty or undefined, default to empty array to avoid crash
  const safePartners = partners || [];
  const allPartners = [...safePartners, ...safePartners, ...safePartners, ...safePartners];

  if (!mounted) return null;

  return (
    <section className="py-12 bg-background border-y border-text-muted/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <Link 
          href="/partnerships"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group"
        >
          <span className="font-semibold text-sm uppercase tracking-wider">İşbirliklerimiz</span>
        </Link>
      </div>
      </div>
      
      <div className="relative flex overflow-hidden mask-gradient-x">
        <motion.div
          className="flex flex-nowrap gap-12 py-4 items-center w-max animate-scroll"
        >
          {allPartners.length > 0 && allPartners.map((partner, index) => (
            <Link
              href="/partnerships"
              key={`${partner._id || partner.name}-${index}`}
              className="flex-shrink-0 min-w-[150px] flex items-center justify-center group opacity-50 hover:opacity-100 transition-all duration-300 transform hover:scale-110 grayscale hover:grayscale-0"
            >
              <div className="flex flex-col items-center justify-center">
                <a 
                  key={`${partner._id}-${index}`}
                  href={partner.website || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative w-32 h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer block"
                >
                  {partner.logo && (
                    <Image
                      src={urlFor(partner.logo).url()}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </a>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </section>
  );
}






