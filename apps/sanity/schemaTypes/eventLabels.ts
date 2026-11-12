import {defineField, defineType} from 'sanity'
import {eventLabels as defaults} from '../../../content/eventLabels'

export const eventLabels = defineType({
  name: 'eventLabels',
  title: 'Event Labels',
  type: 'document',
  description: 'Shared display labels for event and game statuses throughout the website.',
  fields: Object.entries(defaults).map(([name, value]) =>
    defineField({
      name,
      title: value,
      type: 'string',
      initialValue: value,
      validation: (rule) => rule.required(),
    }),
  ),
  initialValue: defaults,
  preview: {prepare: () => ({title: 'Event Labels'})},
})
