import {defineField, defineType} from 'sanity'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetRole',
      title: 'Target Role',
      type: 'string',
      description: 'Which role should see this announcement?',
      options: {
        list: [
          {title: 'Coach', value: 'coach'},
          {title: 'Staff', value: 'staff'},
          {title: 'Admin', value: 'admin'},
          {title: 'All', value: 'all'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'targetRole',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: `Role: ${subtitle}`,
        media: '📢',
      }
    },
  },
})