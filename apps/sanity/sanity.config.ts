import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './deskStructure'

const hubPageTypes = new Set(['talentPoolPage', 'nationalTeamsPage', 'eventLabels', 'pathwayPage'])

export default defineConfig({
  name: 'default',
  title: 'BTPP',

  projectId: 'avnz1jch',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => !hubPageTypes.has(template.schemaType)),
  },
  document: {
    actions: (actions, context) =>
      hubPageTypes.has(context.schemaType)
        ? actions.filter((action) => action.action !== 'duplicate' && action.action !== 'delete')
        : actions,
  },
})
