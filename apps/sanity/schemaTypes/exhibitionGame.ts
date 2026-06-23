import {defineField, defineType} from 'sanity'

export const exhibitionGame = defineType({
  name: 'exhibitionGame',
  title: 'Exhibition Game',
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'opponent',
      title: 'Opponent',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'string',
      description: 'Match result (e.g., "2-1 Win", "0-0 Draw")',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: {type: 'talentPoolCategory'} }],
      validation: (Rule) => Rule.required().min(1),
      description: 'Associate this exhibition game with talent pool categories',
    }),
    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
      description: 'URL for ticket purchase or registration',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'opponent',
    },
  },
})