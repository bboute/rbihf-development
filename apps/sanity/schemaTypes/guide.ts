import {defineField, defineType} from 'sanity'

export const guide = defineType({
  name: 'guide',
  title: 'Guide',
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
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Brief description of the guide content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetRole',
      title: 'Target Role',
      type: 'string',
      options: {
        list: [
          {title: 'Player', value: 'player'},
          {title: 'Coach', value: 'coach'},
          {title: 'Staff', value: 'staff'},
          {title: 'Admin', value: 'admin'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ageCategory',
      title: 'Age Category',
      type: 'string',
      description: 'Optional age category for development curriculum guides',
      options: {
        list: [
          {title: 'U6-U8', value: 'u6-u8'},
          {title: 'U9-U12', value: 'u9-u12'},
          {title: 'U13-U16', value: 'u13-u16'},
          {title: 'U17+', value: 'u17-plus'},
        ],
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Category for organizing guides',
      options: {
        list: [
          {title: 'Coaching Resources', value: 'coaching-resources'},
          {title: 'Coaching Events', value: 'coaching-events'},
          {title: 'Degree Information', value: 'degree-information'},
          {title: 'General', value: 'general'},
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'targetRole',
      media: 'icon',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: `Role: ${subtitle}`,
      }
    },
  },
})