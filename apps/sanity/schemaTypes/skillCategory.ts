import {defineField, defineType} from 'sanity'

export const skillCategory = defineType({
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'talentPoolCategory',
      title: 'Talent Pool Category',
      type: 'reference',
      to: [{type: 'talentPoolCategory'}],
    }),
    defineField({
      name: 'fundamentalCategory',
      title: 'Fundamental Category',
      type: 'reference',
      to: [{type: 'fundamentalCategory'}],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Skill Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Skill Description',
              type: 'text',
            }),
            defineField({
              name: 'order',
              title: 'Skill Order',
              type: 'number',
              initialValue: 1,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'talentPoolCategory.title',
    },
    prepare({title, category}) {
      return {
        title: title,
        subtitle: category ? `${category}` : 'No category assigned',
      }
    },
  },
})
