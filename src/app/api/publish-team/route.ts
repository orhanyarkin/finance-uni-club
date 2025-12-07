
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { NextResponse } from 'next/server'

// Bu token'ı env dosyanıza eklediğinizden emin olun veya geçici olarak buraya yazın (ama dikkatli olun)
// Migration işlemi için "Editor" veya "Admin" yetkisine sahip bir token gerekir.
const token = "skz3LZ5gVA0JZ66F5jBGgkg0uAwtko8KXsCnh2eX5AqGUQzVub2kilTtL2znktBLgXxh7iN90JRgr22sWzFnT3BXxFhoqgiOeFpt2lbS9IBooYF5h2OGl2gvKWYG6Zmo4M8Vl8eLMVHIJo7rnXcbQSxoGCJkYvkSMDUdvELRdyO2GXPwKbGP";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token, 
})

const BOARD_MEMBERS = [
    {
      name: "Kübra Yiğit",
      role: "Başkan",
      photo: "https://ui-avatars.com/api/?name=Kubra+Yigit&background=375BD2&color=fff&size=200",
      committee: 'Board',
      order: 1
    },
    {
      name: "Irmak Aktuna",
      role: "Başkan Yardımcısı",
      photo: "https://ui-avatars.com/api/?name=Irmak+Aktuna&background=375BD2&color=fff&size=200",
      committee: 'Board',
      order: 2
    },
    {
      name: "Yakında",
      role: "Sayman",
      photo: "",
      committee: 'Board',
      comingSoon: true,
      order: 3
    },
    {
      name: "Yakında",
      role: "Sekreter",
      photo:"",
      committee: 'Board',
      comingSoon: true,
      order: 4
    },
];

const COMMITTEE_MEMBERS = [
    // Kurumsal İletişim
    { name: "Ayşe Seygan", role: "Yönetim Kurulu Üyesi", photo: "https://ui-avatars.com/api/?name=Ayse+Seygan&background=3B82F6&color=fff&size=200", committee: "Kurumsal İletişim" },
    { name: "Simgenur Şimşek", role: "Yönetim Kurulu Üyesi", photo: "https://ui-avatars.com/api/?name=Simgenur+Simsek&background=3B82F6&color=fff&size=200", committee: "Kurumsal İletişim" },
    { name: "Yakında", role: "Yönetim Kurulu Üyesi", photo: "", committee: "Kurumsal İletişim", comingSoon: true },
    
    // Sponsorluk
    { name: "Emirhan Uz", role: "Yönetim Kurulu Üyesi", photo: "https://ui-avatars.com/api/?name=Emirhan+Uz&background=A855F7&color=fff&size=200", committee: "Sponsorluk" },
    { name: "Shabir Ahmad Taimorian", role: "Yönetim Kurulu Üyesi", photo: "https://ui-avatars.com/api/?name=Shabir+Ahmad+Taimorian&background=A855F7&color=fff&size=200", committee: "Sponsorluk" },
    { name: "Yakında", role: "Yönetim Kurulu Üyesi", photo: "", committee: "Sponsorluk", comingSoon: true },

    // Etkinlik
    { name: "Kevser Cemre Kalaylı", role: "Yönetim Kurulu Üyesi", photo: "https://ui-avatars.com/api/?name=Kevser+Cemre+Kalayli&background=10B981&color=fff&size=200", committee: "Etkinlik" },
    { name: "Yakında", role: "Yönetim Kurulu Üyesi", photo: "", committee: "Etkinlik", comingSoon: true },
    { name: "Yakında", role: "Yönetim Kurulu Üyesi", photo: "", committee: "Etkinlik", comingSoon: true },

    // Denetim
    { name: "Özge Çoban", role: "Yönetim Kurulu Üyesi", photo: "https://ui-avatars.com/api/?name=Ozge+ZCoban&background=F97316&color=fff&size=200", committee: "Denetim Kurulu" },
    { name: "Yakında", role: "Yönetim Kurulu Üyesi", photo: "", committee: "Denetim Kurulu", comingSoon: true },
    { name: "Yakında", role: "Yönetim Kurulu Üyesi", photo: "", committee: "Denetim Kurulu", comingSoon: true },

    // Sosyal Medya
    { name: "İnci Sudem Saler", role: "Yönetim Kurulu Üyesi", photo: "https://ui-avatars.com/api/?name=Inci+Sudem+Saler&background=06B6D4&color=fff&size=200", committee: "Sosyal Medya" },
    { name: "Damla Işık", role: "Yönetim Kurulu Üyesi", photo: "https://ui-avatars.com/api/?name=Damla+Isik&background=06B6D4&color=fff&size=200", committee: "Sosyal Medya" },
    { name: "Yakında", role: "Yönetim Kurulu Üyesi", photo: "", committee: "Sosyal Medya", comingSoon: true },
];

async function uploadImage(url: string) {
  if (!url) return null;
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const asset = await client.assets.upload('image', blob as any);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error("Image upload failed:", url, error);
    return null;
  }
}

export async function GET() {
  if (!token) {
    return NextResponse.json({ error: "API Token Missing" }, { status: 500 });
  }

  try {
    // 1. Yönetim Kurulunu Ekle
    for (const member of BOARD_MEMBERS) {
      console.log(`Processing Board: ${member.name}`);
      let imageAsset = null;
      if (!member.comingSoon && member.photo) {
        imageAsset = await uploadImage(member.photo);
      }

      await client.create({
        _type: 'teamMember',
        name: member.name,
        role: member.role,
        committee: member.committee,
        comingSoon: member.comingSoon || false,
        image: imageAsset,
        order: member.order
      });
    }

    // 2. Komiteleri Ekle
    for (const member of COMMITTEE_MEMBERS) {
      console.log(`Processing Committee: ${member.name}`);
      let imageAsset = null;
      if (!member.comingSoon && member.photo) {
        imageAsset = await uploadImage(member.photo);
      }

      await client.create({
        _type: 'teamMember',
        name: member.name,
        role: member.role,
        committee: member.committee,
        comingSoon: member.comingSoon || false,
        image: imageAsset,
        // Komite üyeleri için de basit bir sıralama mantığı (isteğe bağlı)
        order: 99
      });
    }

    return NextResponse.json({ success: true, message: "Migration completed!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
