import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the event',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'Optional end date for camps and multi-day events',
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = (context.document as {startDate?: string})?.startDate

          return !endDate || !startDate || new Date(endDate) >= new Date(startDate)
            ? true
            : 'End date must be after the event date'
        }),
    }),
    defineField({
      name: 'status',
      title: 'Planning Status',
      type: 'string',
      initialValue: 'confirmed',
      options: {
        layout: 'radio',
        list: [
          {title: 'Confirmed', value: 'confirmed'},
          {title: 'Provisional', value: 'provisional'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: {type: 'talentPoolCategory'} }],
      validation: (Rule) => Rule.required().min(1),
      description: 'Associate this event with talent pool categories',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'venue',
      media: 'mainImage',
    },
  },
})