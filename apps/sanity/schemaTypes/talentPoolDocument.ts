import {defineField, defineType} from 'sanity'

export const talentPoolDocument = defineType({
  name: 'talentPoolDocument',
  title: 'Talent Pool Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'documentType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          {title: 'School absence', value: 'school'},
          {title: 'Medical', value: 'medical'},
          {title: 'Consent', value: 'consent'},
          {title: 'Travel and packing', value: 'travel'},
          {title: 'Program information', value: 'program'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Public File',
      type: 'file',
      options: {accept: '.pdf,.doc,.docx'},
      description: 'Upload blank forms or public guidance only. Never upload completed forms.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Age Groups',
      type: 'array',
      of: [{type: 'reference', to: {type: 'talentPoolCategory'}}],
      description: 'Leave empty when the document applies to all Talent Pool age groups.',
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'For example: 2026-2027. Leave empty for evergreen documents.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      documentType: 'documentType',
      season: 'season',
    },
    prepare({title, documentType, season}) {
      return {
        title,
        subtitle: [documentType, season].filter(Boolean).join(' · '),
      }
    },
  },
})