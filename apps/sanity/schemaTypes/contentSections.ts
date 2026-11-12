import {defineArrayMember, defineField, defineType} from 'sanity'
import {isContentHref} from '../../../content/contentLinks'

const headingFields = [
  defineField({name: 'eyebrow', title: 'Section Label', type: 'string'}),
  defineField({name: 'title', title: 'Heading', type: 'string'}),
  defineField({
    name: 'theme',
    title: 'Background',
    type: 'string',
    initialValue: 'light',
    options: {
      list: [
        {title: 'Light', value: 'light'},
        {title: 'Deep green', value: 'dark'},
      ],
      layout: 'radio',
    },
  }),
]

const hrefField = defineField({
  name: 'href',
  title: 'Destination',
  type: 'string',
  description: 'Use /path, #section, https://, http://, mailto: or tel:.',
  validation: (rule) =>
    rule
      .required()
      .custom((value) => !value || isContentHref(value) || 'Enter a safe, valid link.'),
})

function bodyField(name = 'body', title = 'Text') {
  return defineField({
    name,
    title,
    type: 'array',
    validation: (rule) =>
      rule.required().custom((value) => {
        const hasText = value?.some(
          (block) =>
            !!block &&
            typeof block === 'object' &&
            'children' in block &&
            Array.isArray(block.children) &&
            block.children.some(
              (span: unknown) =>
                !!span &&
                typeof span === 'object' &&
                'text' in span &&
                typeof span.text === 'string' &&
                !!span.text.trim(),
            ),
        )
        return hasText || 'Add some text before publishing.'
      }),
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          {title: 'Paragraph', value: 'normal'},
          {title: 'Subheading', value: 'h3'},
        ],
        lists: [
          {title: 'Bullets', value: 'bullet'},
          {title: 'Numbered list', value: 'number'},
        ],
        marks: {
          decorators: [
            {title: 'Bold', value: 'strong'},
            {title: 'Italic', value: 'em'},
          ],
          annotations: [{name: 'link', title: 'Link', type: 'object', fields: [hrefField]}],
        },
      }),
    ],
  })
}

function imageFields(required: boolean) {
  return [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => (required ? rule.required().assetRequired() : rule.assetRequired()),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Description',
      type: 'string',
      description: 'Describe the image for visitors using screen readers.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {image?: {asset?: unknown}} | undefined
          return !parent?.image?.asset || !!value?.trim() || 'Describe the selected image.'
        }),
    }),
  ]
}

const preview = (subtitle: string) => ({
  select: {title: 'title'},
  prepare: ({title}: {title?: string}) => ({title: title || subtitle, subtitle}),
})

export const contentSectionTypes = [
  defineType({
    name: 'richTextSection',
    title: 'Rich text',
    type: 'object',
    fields: [...headingFields, bodyField()],
    preview: preview('Rich text'),
  }),
  defineType({
    name: 'textImageSection',
    title: 'Text + image',
    type: 'object',
    fields: [
      ...headingFields,
      bodyField(),
      ...imageFields(true),
      defineField({
        name: 'imagePosition',
        title: 'Image / Text Alignment',
        type: 'string',
        description:
          'Left places the image on the left with text on the right and lower. Right places the image on the right with text on the left and higher.',
        initialValue: 'right',
        options: {
          list: [
            {title: 'Left', value: 'left'},
            {title: 'Right', value: 'right'},
          ],
          layout: 'radio',
        },
      }),
      defineField({name: 'caption', title: 'Image Caption', type: 'string'}),
    ],
    preview: {...preview('Text + image'), select: {title: 'title', media: 'image'}},
  }),
  defineType({
    name: 'quoteSection',
    title: 'Quote',
    type: 'object',
    fields: [
      ...headingFields,
      defineField({
        name: 'quote',
        title: 'Quote',
        type: 'text',
        validation: (rule) => rule.required(),
      }),
      defineField({name: 'attribution', title: 'Attribution', type: 'string'}),
      defineField({name: 'role', title: 'Role / Organisation', type: 'string'}),
      ...imageFields(false),
    ],
    preview: {
      select: {title: 'quote', subtitle: 'attribution', media: 'image'},
    },
  }),
  defineType({
    name: 'stepsSection',
    title: 'Steps / principles',
    type: 'object',
    fields: [
      ...headingFields,
      defineField({
        name: 'items',
        title: 'Steps',
        type: 'array',
        validation: (rule) => rule.required().min(1),
        of: [
          defineArrayMember({
            name: 'step',
            title: 'Step',
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                title: 'Title',
                type: 'string',
                validation: (rule) => rule.required(),
              }),
              defineField({name: 'description', title: 'Explanation', type: 'text'}),
            ],
          }),
        ],
      }),
    ],
    preview: preview('Steps / principles'),
  }),
  defineType({
    name: 'faqSection',
    title: 'Frequently asked questions',
    type: 'object',
    fields: [
      ...headingFields,
      defineField({
        name: 'items',
        title: 'Questions',
        type: 'array',
        validation: (rule) => rule.required().min(1),
        of: [
          defineArrayMember({
            name: 'question',
            title: 'Question',
            type: 'object',
            fields: [
              defineField({
                name: 'question',
                title: 'Question',
                type: 'string',
                validation: (rule) => rule.required(),
              }),
              bodyField('answer', 'Answer'),
            ],
            preview: {select: {title: 'question'}},
          }),
        ],
      }),
    ],
    preview: preview('Frequently asked questions'),
  }),
  defineType({
    name: 'calloutSection',
    title: 'Callout / guidance',
    type: 'object',
    fields: [
      ...headingFields,
      bodyField(),
      defineField({
        name: 'link',
        title: 'Optional Link',
        type: 'object',
        fields: [
          defineField({
            name: 'label',
            title: 'Link Label',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          hrefField,
        ],
      }),
    ],
    preview: preview('Callout / guidance'),
  }),
  defineType({
    name: 'imageSection',
    title: 'Full-width image',
    type: 'object',
    fields: [
      ...headingFields,
      ...imageFields(true),
      defineField({name: 'caption', title: 'Caption', type: 'text'}),
    ],
    preview: {...preview('Full-width image'), select: {title: 'title', media: 'image'}},
  }),
]

export const contentSectionsField = defineField({
  name: 'contentSections',
  title: 'Content Sections',
  type: 'array',
  description:
    'Add, remove or drag sections to reorder explanatory content. These appear after the introduction and before the operational feeds. Heroes, How we work and calendars stay outside this list.',
  of: contentSectionTypes.map(({name}) => defineArrayMember({type: name})),
})
