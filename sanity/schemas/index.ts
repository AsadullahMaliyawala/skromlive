import { authorSchema } from './author'
import { productSchema } from './product'
import { blogSchema, blockContentSchema } from './blog'
import { categorySchema } from './category'

export const schemaTypes = [
  authorSchema,
  productSchema,
  blogSchema,
  blockContentSchema,
  categorySchema,
]
