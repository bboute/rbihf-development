import {defineField, defineType} from 'sanity'

export const fundamentalCategory = defineType({
  name: 'fundamentalCategory',
  title: 'Fundamental Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ageRange',
      title: 'Age Range',
      type: 'string',
      description: 'e.g., "6-8 years", "8-10 years"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the fundamental skills program',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description:
        'Background video for the hero section (optional, will fallback to hero image if not provided)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: true,
      description: 'Show this category on the homepage',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      ageRange: 'ageRange',
    },
    prepare({title, media, ageRange}) {
      return {
        title: title,
        subtitle: ageRange,
        media: media,
      }
    },
  },
})
