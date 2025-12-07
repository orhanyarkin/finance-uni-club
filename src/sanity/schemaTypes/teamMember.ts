import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Yönetim Kurulu Üyesi',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Görev / Unvan',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Fotoğraf',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profili (Opsiyonel)',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter/X Profili (Opsiyonel)',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Sıralama (Küçükten büyüğe)',
      type: 'number',
    }),
  ],
})
