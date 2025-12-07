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
  ],
})
