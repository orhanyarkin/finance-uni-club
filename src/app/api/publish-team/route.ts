import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// Real Team Members from Team.tsx
const realTeamMembers = [
  // Yönetim Kurulu
  { name: "Kübra Yiğit", role: "Başkan", committee: "Yönetim Kurulu", order: 1 },
  { name: "Irmak Aktuna", role: "Başkan Yardımcısı", committee: "Yönetim Kurulu", order: 2 },
  { name: "Melek Aloğlu", role: "Sekreter", committee: "Yönetim Kurulu", order: 4 },
  
  // Kurumsal İletişim
  { name: "Ayşe Seygan", role: "Yönetim Kurulu Üyesi", committee: "Kurumsal İletişim", order: 5 },
  { name: "Simgenur Şimşek", role: "Yönetim Kurulu Üyesi", committee: "Kurumsal İletişim", order: 6 },
  
  // Sponsorluk
  { name: "Emirhan Uz", role: "Yönetim Kurulu Üyesi", committee: "Sponsorluk", order: 7 },
  { name: "Shabir Ahmad Taimorian", role: "Yönetim Kurulu Üyesi", committee: "Sponsorluk", order: 8 },
  
  // Etkinlik
  { name: "Kevser Cemre Kalaylı", role: "Yönetim Kurulu Üyesi", committee: "Etkinlik", order: 9 },
  
  // Denetim Kurulu
  { name: "Özge Çoban", role: "Yönetim Kurulu Üyesi", committee: "Denetim Kurulu", order: 10 },
  
  // Sosyal Medya
  { name: "İnci Sudem Saler", role: "Yönetim Kurulu Üyesi", committee: "Sosyal Medya", order: 11 },
  { name: "Damla Işık", role: "Yönetim Kurulu Üyesi", committee: "Sosyal Medya", order: 12 },
];

export async function GET() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "SANITY_API_WRITE_TOKEN bulunamadı." }, { status: 401 });
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const logs: string[] = [];

  try {
    for (const member of realTeamMembers) {
      // Check if already exists
      const existing = await client.fetch(`*[_type == "teamMember" && name == $name][0]`, { name: member.name });
      if (existing) {
        logs.push(`Skipped (exists): ${member.name}`);
        continue;
      }

      await client.create({
        _type: 'teamMember',
        name: member.name,
        role: `${member.role} - ${member.committee}`,
        order: member.order,
      });
      logs.push(`Created: ${member.name} (${member.committee})`);
    }

    return NextResponse.json({ 
      success: true, 
      message: `${realTeamMembers.length} gerçek team member Sanity'ye eklendi.`,
      logs 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, logs }, { status: 500 });
  }
}
