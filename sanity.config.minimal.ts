import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'Scrom Commerce',
  
  projectId: 'x0z5w7dd',
  dataset: 'production',
  
  basePath: '/admin',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: [
      {
        name: 'testPost',
        title: 'Test Post',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
        ],
      },
    ],
  },
})
