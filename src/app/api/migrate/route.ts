import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { partners } from '@/lib/partners';
import { blogPosts } from '@/data/blogPosts';
import fs from 'fs';
import path from 'path';

// Extracted Team Data
const teamMembers = [
  {
    name: "Mustafa Enes Özer",
    role: "Yönetim Kurulu Başkanı",
    img: "team-1.jpg",
    linkedin: "#",
    twitter: "#",
    order: 1
  },
  {
    name: "Zeynep Sude",
    role: "Başkan Yardımcısı",
    img: "team-2.jpg",
    linkedin: "#",
    twitter: "#",
    order: 2
  },
  {
    name: "Ali Veli",
    role: "Genel Sekreter",
    img: "team-3.jpg",
    linkedin: "#",
    twitter: "#",
    order: 3
  },
  {
    name: "Ayşe Fatma",
    role: "Mali İşler Sorumlusu",
    img: "team-4.jpg",
    linkedin: "#",
    twitter: "#",
    order: 4
  }
];

// Authentic Events
const sampleEvents = [
  {
    title: "Movie Night: Margin Call",
    slug: "movie-night-margin-call",
    date: "2025-12-12T17:30:00",
    location: "Saraçoğlu Gençlik Merkezi",
    description: "Margin Call, 2008 finans krizinin patlamak üzere olduğu o kritik geceyi ve gerçek olaylardan ilham alan bir yatırım bankasını anlatıyor. Bir analistin fark ettiği tehlikeyle başlayan süreç, yöneticilerin baskı altında aldığı zor kararlarla gerilimi hızla tırmandırıyor.",
    isFeatured: true,
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSevbPD92y286wtzjKlrPw315y9HR5qVU2V5dyCkuhUJXQkI4w/viewform",
    imagePath: "/Users/orhanyarkin/.gemini/antigravity/brain/4bae7d9e-2f14-4573-b6b5-4f92a73a8c98/uploaded_image_1765104746923.jpg"
  }
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
    token, // Write token required
    useCdn: false,
  });

  const logs: string[] = [];

  try {
    // 1. Migrate Partners
    for (const p of partners) {
      const existing = await client.fetch(`*[_type == "partner" && name == $name][0]`, { name: p.name });
      if (existing) {
        logs.push(`Partner skipped: ${p.name}`);
        continue;
      }

      let imageAsset;
      const imagePath = path.join(process.cwd(), 'public', 'sponsors', 'sponsor', p.logo);
      if (fs.existsSync(imagePath)) {
        const fileBuffer = fs.readFileSync(imagePath);
        imageAsset = await client.assets.upload('image', fileBuffer, { filename: p.logo });
      }

      await client.create({
        _type: 'partner',
        name: p.name,
        website: p.website,
        discount: p.discount,
        isActive: true,
        logo: imageAsset ? { _type: 'image', asset: { _ref: imageAsset._id } } : undefined
      });
      logs.push(`Partner created: ${p.name}`);
    }

    // 2. Migrate Posts
    for (const p of blogPosts) {
       const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug: p.slug });
       if (existing) {
         logs.push(`Post skipped: ${p.slug}`);
         continue;
       }

       let imageAsset;
       const relativePath = p.coverImage.startsWith('/') ? p.coverImage.substring(1) : p.coverImage;
       const imagePath = p.coverImage.startsWith('http') ? null : path.join(process.cwd(), 'public', relativePath);
       
       if (imagePath && fs.existsSync(imagePath)) {
         const fileBuffer = fs.readFileSync(imagePath);
         imageAsset = await client.assets.upload('image', fileBuffer, { filename: path.basename(p.coverImage) });
       }

       await client.create({
         _type: 'post',
         title: p.title.tr,
         slug: { _type: 'slug', current: p.slug },
         author: p.author,
         publishedAt: p.date,
         readTime: p.readTime,
         categories: p.category,
         excerpt: p.excerpt.tr,
         body: [{ _type: 'block', children: [{ _type: 'span', text: p.content.tr }] }], 
         mainImage: imageAsset ? { _type: 'image', asset: { _ref: imageAsset._id } } : undefined
       });
       logs.push(`Post created: ${p.title.tr}`);
    }

    // 3. Migrate Team Members
    for (const m of teamMembers) {
      const existing = await client.fetch(`*[_type == "teamMember" && name == $name][0]`, { name: m.name });
      if (existing) {
        logs.push(`Team Member skipped: ${m.name}`);
        continue;
      }
      
      let imageAsset;
      const imagePath = path.join(process.cwd(), 'public', 'assets', 'images', m.img); 
      // Checking if path exists, if not trying root assets?
      // Assuming public/assets/images structure based on usage in Team.tsx
      if (fs.existsSync(imagePath)) {
         const fileBuffer = fs.readFileSync(imagePath);
         imageAsset = await client.assets.upload('image', fileBuffer, { filename: m.img });
      }

      await client.create({
        _type: 'teamMember',
        name: m.name,
        role: m.role,
        linkedin: m.linkedin,
        twitter: m.twitter,
        order: m.order,
        image: imageAsset ? { _type: 'image', asset: { _ref: imageAsset._id } } : undefined
      });
      logs.push(`Team created: ${m.name}`);
    }

    // 4. Create Sample Events
    for (const e of sampleEvents) {
      const existing = await client.fetch(`*[_type == "event" && slug.current == $slug][0]`, { slug: e.slug });
      if (existing) {
        logs.push(`Event skipped: ${e.title}`);
        continue;
      }
      
      let imageAsset;
      // Check if imagePath is provided and absolute
      if (e.imagePath && fs.existsSync(e.imagePath)) {
         const fileBuffer = fs.readFileSync(e.imagePath);
         imageAsset = await client.assets.upload('image', fileBuffer, { filename: path.basename(e.imagePath) });
      }

      await client.create({
        _type: 'event',
        title: e.title,
        slug: { _type: 'slug', current: e.slug },
        date: e.date,
        location: e.location,
        description: e.description,
        isFeatured: e.isFeatured,
        registrationLink: e.registrationLink,
        image: imageAsset ? { _type: 'image', asset: { _ref: imageAsset._id } } : undefined
      });
      logs.push(`Event created: ${e.title}`);
    }

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, logs }, { status: 500 });
  }
}
