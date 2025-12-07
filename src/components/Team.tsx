"use client";

import { motion } from "framer-motion";
import { User, Crown, DollarSign, FileText, Users2, Megaphone, Target, Calendar, Shield, Share2 } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  icon: any;
  comingSoon?: boolean;
}

export default function Team() {
  // Yönetim Kurulu
  const board: TeamMember[] = [
    {
      name: "Kübra Yiğit",
      role: "Başkan",
      photo: "https://ui-avatars.com/api/?name=Kubra+Yigit&background=375BD2&color=fff&size=200",
      icon: Crown,
    },
    {
      name: "Irmak Aktuna",
      role: "Başkan Yardımcısı",
      photo: "https://ui-avatars.com/api/?name=Irmak+Aktuna&background=375BD2&color=fff&size=200",
      icon: Crown,
    },
    {
      name: "Yakında",
      role: "Sayman",
      photo: "",
      icon: DollarSign,
      comingSoon: true,
    },
    {
      name: "Yakında",
      role: "Sekreter",
      photo:"",
      icon: FileText,
      comingSoon: true,
    },
  ];

  // Komiteler (Aynı zamanda Yönetim Kurulu üyeleri)
  const committees = [
    {
      name: "Kurumsal İletişim",
      icon: Megaphone,
      color: "from-blue-500 to-cyan-500",
      members: [
        {
          name: "Ayşe Seygan",
          role: "Yönetim Kurulu Üyesi",
          photo: "https://ui-avatars.com/api/?name=Ayse+Seygan&background=3B82F6&color=fff&size=200",
        },
        {
          name: "Simgenur Şimşek",
          role: "Yönetim Kurulu Üyesi",
          photo: "https://ui-avatars.com/api/?name=Simgenur+Simsek&background=3B82F6&color=fff&size=200",
        },
        {
          name: "Yakında",
          role: "Yönetim Kurulu Üyesi",
          photo: "",
          comingSoon: true,
        },
      ],
    },
    {
      name: "Sponsorluk",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      members: [
        {
          name: "Emirhan Uz",
          role: "Yönetim Kurulu Üyesi",
          photo: "https://ui-avatars.com/api/?name=Emirhan+Uz&background=A855F7&color=fff&size=200",
        },
        {
          name: "Shabir Ahmad Taimorian",
          role: "Yönetim Kurulu Üyesi",
          photo: "https://ui-avatars.com/api/?name=Shabir+Ahmad+Taimorian&background=A855F7&color=fff&size=200",
        },
        {
          name: "Yakında",
          role: "Yönetim Kurulu Üyesi",
          photo: "",
          comingSoon: true,
        },
      ],
    },
    {
      name: "Etkinlik",
      icon: Calendar,
      color: "from-green-500 to-emerald-500",
      members: [
        {
          name: "Kevser Cemre Kalaylı",
          role: "Yönetim Kurulu Üyesi",
          photo: "https://ui-avatars.com/api/?name=Kevser+Cemre+Kalayli&background=10B981&color=fff&size=200",
        },
        {
          name: "Yakında",
          role: "Yönetim Kurulu Üyesi",
          photo: "",
          comingSoon: true,
        },
        {
          name: "Yakında",
          role: "Yönetim Kurulu Üyesi",
          photo: "",
          comingSoon: true,
        },
      ],
    },
    {
      name: "Denetim Kurulu",
      icon: Shield,
      color: "from-orange-500 to-red-500",
      members: [
        {
          name: "Özge Çoban",
          role: "Yönetim Kurulu Üyesi",
          photo: "https://ui-avatars.com/api/?name=Ozge+Coban&background=F97316&color=fff&size=200",
        },
        {
          name: "Yakında",
          role: "Yönetim Kurulu Üyesi",
          photo: "",
          comingSoon: true,
        },
        {
          name: "Yakında",
          role: "Yönetim Kurulu Üyesi",
          photo: "",
          comingSoon: true,
        },
      ],
    },
    {
      name: "Sosyal Medya",
      icon: Share2,
      color: "from-cyan-500 to-blue-500",
      members: [
        {
          name: "İnci Sudem Saler",
          role: "Yönetim Kurulu Üyesi",
          photo: "https://ui-avatars.com/api/?name=Inci+Sudem+Saler&background=06B6D4&color=fff&size=200",
        },
        {
          name: "Damla Işık",
          role: "Yönetim Kurulu Üyesi",
          photo: "https://ui-avatars.com/api/?name=Damla+Isik&background=06B6D4&color=fff&size=200",
        },
        {
          name: "Yakında",
          role: "Yönetim Kurulu Üyesi",
          photo: "",
          comingSoon: true,
        },
      ],
    },
  ];

  return (
    <section id="team" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Yönetim Kurulu */}
        <motion.div
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
          {board.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={`${member.name}-${index}`}
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
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary to-accent-cyan">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  {!member.comingSoon && (
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm p-2 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
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
                      key={`${member.name}-${memberIndex}`}
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
                              className={`w-32 h-32 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r ${committee.color} p-1`}
                            >
                              <img
                                src={member.photo}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          )}
                        </div>
                        <h4 className={`text-lg font-bold mb-1 ${member.comingSoon ? 'text-gray-500' : 'text-white'}`}>
                          {member.name}
                        </h4>
                        <p className={`text-sm ${member.comingSoon ? 'text-gray-600' : 'text-text-secondary'}`}>
                          {member.role}
                        </p>
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

