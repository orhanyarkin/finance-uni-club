import { defineField, defineType } from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'İş Ortağı / Sponsor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Marka Adı',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'website',
      title: 'Web Sitesi Linki',
      type: 'url',
    }),
    defineField({
      name: 'discount',
      title: 'İndirim Metni (örn: %15 İndirim)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      description: 'İş ortağı hakkında kısa açıklama',
    }),
    defineField({
      name: 'isActive',
      title: 'Sitede Yayınla',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
