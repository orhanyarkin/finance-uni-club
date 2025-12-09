"use client";

import { motion } from "framer-motion";
import { User, Crown, DollarSign, FileText, Users2, Megaphone, Target, Calendar, Shield, Share2 } from "lucide-react";
import Image from "next/image";



import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: any;
  committee: string;
  comingSoon?: boolean;
  linkedin?: string;
}

interface TeamProps {
  members: TeamMember[];
}

export default function Team({ members = [] }: TeamProps) {
  // Yönetim Kurulu
  const board = members.filter(m => m.committee === 'Board');

  // Komiteler (Konfigürasyon)
  const committeeConfig = [
    {
      name: "Kurumsal İletişim",
      icon: Megaphone,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Sponsorluk",
      icon: Target,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Etkinlik",
      icon: Calendar,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Denetim Kurulu",
      icon: Shield,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Sosyal Medya",
      icon: Share2,
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const committees = committeeConfig.map(c => ({
    ...c,
    members: members.filter(m => m.committee === c.name)
  }));
  const getBoardIcon = (role: string) => {
    if (role.includes("Başkan")) return Crown;
    if (role.toLowerCase().includes("sayman")) return DollarSign;
    if (role.toLowerCase().includes("sekreter")) return FileText;
    return User;
  };

  return (
    <section id="team" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Yönetim Kurulu */}
        <motion.div
  // ... (header animation code remains the same, assuming it's above line 172 in original, but here limited context. I'll include the header for safety or skip to the grid)
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Yönetim Kurulu</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Kulübümüzü yöneten liderlik ekibimiz ve komite üyelerimiz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {board?.map((member, index) => {
            const Icon = getBoardIcon(member.role);
            return (
              <motion.div
                key={member._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`glass-effect rounded-xl overflow-hidden hover-lift group ${
                  member.comingSoon ? 'opacity-60' : ''
                }`}
              >
                <div className="relative">

                  {member.comingSoon ? (
                    // Yakında tasarımı
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <Icon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg font-semibold">Yakında</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary to-accent-cyan">
                      <Image
                        src={member.image ? urlFor(member.image).url() : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0b0f1a&color=fff&size=200`}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized={!member.image} // External avatars might need unoptimized if not in config, but they are in config. Still safe.
                      />
                    </div>
                  )}

                  {!member.comingSoon && (
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm p-2 rounded-lg flex gap-2">
                      <Icon className="w-5 h-5 text-white" />
                      {member.linkedin && (
                        <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                          <Linkedin className="w-5 h-5 text-white" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className={`font-semibold ${member.comingSoon ? 'text-gray-500' : 'text-primary'}`}>
                    {member.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Komiteler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Komitelerimiz</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Yönetim kurulu üyelerimizin komite bazında görev dağılımı
          </p>
        </motion.div>

        <div className="space-y-16">
          {committees.map((committee, committeeIndex) => {
            const Icon = committee.icon;
            return (
              <motion.div
                key={committee.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-effect rounded-2xl p-8"
              >
                {/* Komite Başlığı */}
                <div className="flex items-center justify-center mb-8">
                  <div
                    className={`bg-gradient-to-r ${committee.color} p-4 rounded-xl mr-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">{committee.name}</h3>
                </div>

                {/* Komite Üyeleri */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {committee.members.map((member, memberIndex) => (
                    <motion.div
                      key={member._id || memberIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: memberIndex * 0.1 }}
                      className={`bg-background-tertiary rounded-xl p-6 hover-lift group ${
                        member.comingSoon ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          {member.comingSoon ? (
                            // Yakında tasarımı
                            <div
                              className={`w-32 h-32 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center border-4 border-gray-600`}
                            >
                              <User className="w-12 h-12 text-gray-500" />
                            </div>
                          ) : (
                            <div
                              className={`relative w-32 h-32 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r ${committee.color} p-1`}
                            >
                                <Image
                                  src={member.image ? urlFor(member.image).url() : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0b0f1a&color=fff&size=200`}
                                  alt={member.name}
                                  fill
                                  className="rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  unoptimized={!member.image}
                                />
                            </div>
                          )}
                        </div>
                        <h4 className={`text-lg font-bold mb-1 ${member.comingSoon ? 'text-gray-500' : 'text-white'}`}>
                          {member.name}
                        </h4>
                        <p className={`text-sm ${member.comingSoon ? 'text-gray-600' : 'text-text-secondary'} mb-2`}>
                          {member.role}
                        </p>
                        {member.linkedin && !member.comingSoon && (
                          <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

