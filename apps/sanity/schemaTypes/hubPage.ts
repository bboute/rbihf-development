import {defineField, defineType} from 'sanity'
import {talentPoolPageCopy, nationalTeamsPageCopy} from '../../../content/hubPages'
import {contentSectionsField} from './contentSections'

export function pageFields(defaults: Record<string, string>) {
  const sections = [...new Set(Object.keys(defaults).map((key) => key.match(/^[a-z]+/)![0]))]

  return [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Optional background image. Use Crop and Hotspot to choose the visible area and focal point. Without an image, the standard dark header is shown.',
    }),
    defineField({
      name: 'copy',
      title: 'Page Content',
      type: 'object',
      description:
        'Only published content is shown. Leave fields empty to hide them; no default text is inserted. Dates, news and downloads are managed in their own documents.',
      fieldsets: sections.map((name) => ({
        name,
        title: name.charAt(0).toUpperCase() + name.slice(1),
        options: {collapsible: true, collapsed: name !== 'hero'},
      })),
      fields: Object.entries(defaults).map(([name, value]) =>
        defineField({
          name,
          title: name.replace(/([A-Z])/g, ' $1').replace(/^\w/, (letter) => letter.toUpperCase()),
          type: /Description|Footnote|Experience/.test(name) ? 'text' : 'string',
          fieldset: name.match(/^[a-z]+/)![0],
          description: value.includes('{')
            ? `Keep the placeholders: ${value.match(/\{\w+\}/g)?.join(', ')}.`
            : name === 'heroImageAlt'
              ? 'Describe the hero image for screen readers. Leave empty only for a decorative image.'
              : name === 'plannerDescription'
                ? 'Optional. Clear this field to hide the description below the planning legend.'
                : undefined,
          validation: (rule) =>
            rule.custom((input) => {
              if (typeof input !== 'string' || !input.trim()) return true
              const placeholders = value.match(/\{\w+\}/g) ?? []
              return placeholders.every((placeholder) => input.includes(placeholder))
                ? true
                : `Include ${placeholders.join(', ')} so dynamic values can be displayed.`
            }),
        }),
      ),
    }),
    contentSectionsField,
  ]
}

export const talentPoolPage = defineType({
  name: 'talentPoolPage',
  title: 'Talent Pool Page',
  type: 'document',
  fields: pageFields(talentPoolPageCopy),
  preview: {prepare: () => ({title: 'Talent Pool Page'})},
})

export const nationalTeamsPage = defineType({
  name: 'nationalTeamsPage',
  title: 'National Teams Page',
  type: 'document',
  fields: pageFields(nationalTeamsPageCopy),
  preview: {prepare: () => ({title: 'National Teams Page'})},
})
