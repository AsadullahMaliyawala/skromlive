import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schemas
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Scrom Commerce',
  
  projectId: 'x0z5w7dd',
  dataset: 'production',
  
  basePath: '/admin',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
                    S.listItem()
          .title('Products')
          .child(S.documentTypeList('product').title('Products')),
        S.listItem()
          .title('Categories')
          .child(S.documentTypeList('category').title('Categories')),
        S.listItem()
          .title('Blog Posts')
          .child(S.documentTypeList('blog').title('Blog Posts')),
        S.listItem()
          .title('Authors')
          .child(S.documentTypeList('author').title('Authors')),
        // Add other document types
        ...S.documentTypeListItems().filter(
          (listItem) => !['product', 'blog', 'author', 'category'].includes(listItem.getId())
        ),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
  
  // Add some debugging
  document: {
    // Show all document types in the structure
    actions: (prev, { schemaType }) => {
      console.log('Schema type:', schemaType)
      return prev
    }
  }
})
