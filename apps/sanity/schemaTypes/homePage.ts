import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Background video for the homepage hero section (optional)',
    }),
    defineField({
      name: 'recruitmentBanner',
      title: 'Recruitment Banner',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'bodyText',
          title: 'Body Text',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'coachRecruitmentBanner',
      title: 'Coach Recruitment Banner',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'bodyText',
          title: 'Body Text',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
