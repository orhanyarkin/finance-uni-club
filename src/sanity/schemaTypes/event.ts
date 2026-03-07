import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Etkinlik',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Etkinlik Adı',
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
      name: 'date',
      title: 'Tarih ve Saat',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Konum',
      type: 'string',
    }),
    defineField({
      name: 'locationLink',
      title: 'Location Link (Google Maps)',
      type: 'url',
      description: 'Tıklanınca gidilecek Google Maps linki (kısa link olabilir)',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Harita Embed URL',
      type: 'text',
      rows: 2,
      description: 'Google Maps → Paylaş → Haritayı göm → iframe src="..." içindeki URL\'yi buraya yapıştırın',
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Kapak Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Öne Çıkar (Ana Banner)',
      type: 'boolean',
      description: 'İşaretlenirse ana sayfa en üstte büyük olarak görünür.',
      initialValue: false,
    }),
    defineField({
      name: 'registrationLink',
      title: 'Kayıt Linki',
      type: 'url',
    }),
    defineField({
      name: 'participants',
      title: 'Katılımcı Sayısı',
      type: 'number',
      description: 'Tahmini veya gerçek katılımcı sayısı',
    }),
    defineField({
      name: 'status',
      title: 'Etkinlik Durumu',
      type: 'string',
      options: {
        list: [
          { title: 'Yakında (Henüz Kayıt Yok)', value: 'upcoming' },
          { title: 'Kayıtlar Açık', value: 'open' },
          { title: 'Kayıtlar Tamamlandı', value: 'closed' },
          { title: 'Geçmiş Etkinlik', value: 'past' },
        ],
      },
      initialValue: 'upcoming',
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'Workshop' },
          { title: 'Seminer', value: 'Seminer' },
          { title: 'Networking', value: 'Networking' },
          { title: 'Panel', value: 'Panel' },
          { title: 'Eğitim', value: 'Eğitim' },
          { title: 'Etkinlik', value: 'Etkinlik' },
        ],
      },
      initialValue: 'Etkinlik',
    }),
    defineField({
      name: 'titleEn',
      title: 'Etkinlik Adı (İngilizce)',
      type: 'string',
      description: 'İngilizce etkinlik adı — boş bırakılırsa Türkçe kullanılır',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Açıklama (İngilizce)',
      type: 'text',
      description: 'İngilizce açıklama — boş bırakılırsa Türkçe kullanılır',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare(selection) {
      return { ...selection, subtitle: selection.date && new Date(selection.date).toLocaleDateString('tr-TR') }
    },
  },
})
