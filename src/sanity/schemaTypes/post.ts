import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Yazısı',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Öne Çıkar (Menu & Anasayfa)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Kısmı)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Yazar',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Fintech', value: 'Fintech' },
          { title: 'Girişimcilik', value: 'Girişimcilik' },
          { title: 'Yatırım', value: 'Yatırım' },
          { title: 'Teknoloji', value: 'Teknoloji' },
          { title: 'Ekonomi', value: 'Ekonomi' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
    }),
    defineField({
      name: 'readTime',
      title: 'Okuma Süresi (örn: 5 dk)',
      type: 'string',
    }),
    defineField({
      name: 'readTimeEn',
      title: 'Okuma Süresi (İngilizce, örn: 5 min read)',
      type: 'string',
      description: 'İngilizce okuma süresi — boş bırakılırsa otomatik dönüştürülür',
    }),
    defineField({
      name: 'excerpt',
      title: 'Özet (Kartta görünecek)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'İçerik',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'titleEn',
      title: 'Başlık (İngilizce)',
      type: 'string',
      description: 'İngilizce başlık — boş bırakılırsa Türkçe başlık kullanılır',
    }),
    defineField({
      name: 'excerptEn',
      title: 'Özet (İngilizce)',
      type: 'text',
      rows: 3,
      description: 'İngilizce özet — boş bırakılırsa Türkçe özet kullanılır',
    }),
    defineField({
      name: 'bodyEn',
      title: 'İçerik (İngilizce)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'İngilizce içerik — boş bırakılırsa Türkçe içerik kullanılır',
    }),
  ],
})
