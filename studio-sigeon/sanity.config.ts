import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'sigeon',

  projectId: 'pofl8c47',
  dataset: 'production',

  plugins: [
    structureTool({structure}), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
