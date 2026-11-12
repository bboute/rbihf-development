import {defineArrayMember, defineField, defineType} from 'sanity'
import {pathwayPageCopy, pathwayPages} from '../../../content/pathwayPages'
import {pageFields} from './hubPage'

export const pathwayPage = defineType({
  name: 'pathwayPage',
  title: 'Stage / Team Page',
  type: 'document',
  description:
    'Edit a Talent Pool stage or national team detail page. Empty sections and unfilled staff entries are hidden.',
  fields: [
    ...pageFields(pathwayPageCopy),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      options: {accept: 'video/*'},
    }),
    defineField({
      name: 'expectations',
      title: 'Player, Family and Coach Information',
      type: 'array',
      description: 'Add, edit, remove, or reorder information blocks. Empty entries are hidden.',
      of: [
        defineArrayMember({
          name: 'informationBlock',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),
    defineField({
      name: 'staffing',
      title: 'Staffing',
      type: 'array',
      description:
        'Add only the roles or people you want to publish. All fields are optional. An empty list hides the entire staffing section.',
      of: [
        defineArrayMember({
          name: 'staffMember',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Role', type: 'string'}),
            defineField({name: 'name', title: 'Person Name', type: 'string'}),
            defineField({name: 'description', title: 'Responsibilities / Bio', type: 'text'}),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({name: 'imageAlt', title: 'Photo Alt Text', type: 'string'}),
          ],
          preview: {select: {title: 'title', subtitle: 'name', media: 'image'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {id: '_id', title: 'copy.heroTitle'},
    prepare({id, title}) {
      const page = pathwayPages.find((item) => item.id === id?.replace(/^drafts\./, ''))
      return {title: title || page?.label || 'Stage / Team Page'}
    },
  },
})
