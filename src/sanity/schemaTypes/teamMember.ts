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
      name: 'roleEn',
      title: 'Görev / Unvan (İngilizce)',
      type: 'string',
      description: 'İngilizce unvan — boş bırakılırsa Türkçe kullanılır (örn: President, Treasurer, Secretary)',
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
      name: 'committee',
      title: 'Komite / Grup',
      type: 'string',
      options: {
        list: [
          { title: 'Yönetim Kurulu', value: 'Board' },
          { title: 'Kurumsal İletişim', value: 'Kurumsal İletişim' },
          { title: 'Sponsorluk', value: 'Sponsorluk' },
          { title: 'Etkinlik', value: 'Etkinlik' },
          { title: 'Denetim Kurulu', value: 'Denetim Kurulu' },
          { title: 'Sosyal Medya', value: 'Sosyal Medya' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'comingSoon',
      title: 'Yakında Gelecek (Placeholder)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sıralama (Küçükten büyüğe)',
      type: 'number',
    }),
  ],
})
