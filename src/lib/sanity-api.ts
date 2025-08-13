import { client } from '../../sanity/client'
import * as queries from '../../sanity/queries'
import { convertSanityProduct, convertSanityBlog } from './sanity-helpers'
import { Product } from '@/types/product'
import { BlogItem } from '@/types/blogItem'

// Fallback data imports
import staticBlogData from '@/components/BlogGrid/blogData'

// Products API
export async function getAllProducts(): Promise<Product[]> {
  try {
    // Try server-side route first to avoid client-side CORS in production
    if (typeof window !== 'undefined') {
      const res = await fetch('/api/sanity/products', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        return data as Product[]
      }
    }
    const products = await client.fetch(queries.getAllProducts)
    return products.map(convertSanityProduct)
  } catch (error) {
    console.error('Error fetching products from Sanity:', error)
    return []
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await client.fetch(queries.getFeaturedProducts)
    return products.map(convertSanityProduct)
  } catch (error) {
    console.error('Error fetching featured products from Sanity:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = await client.fetch(queries.getProductBySlug, { slug })
    return product ? convertSanityProduct(product) : null
  } catch (error) {
    console.error('Error fetching product by slug from Sanity:', error)
    return null
  }
}

// Blogs API
export async function getAllBlogs(): Promise<BlogItem[]> {
  try {
    const blogs = await client.fetch(queries.getAllBlogs)
    return blogs.length > 0 
      ? blogs.map(convertSanityBlog)
      : staticBlogData // Fallback to static data
  } catch (error) {
    console.error('Error fetching blogs from Sanity:', error)
    return staticBlogData // Fallback to static data
  }
}

export async function getFeaturedBlogs(): Promise<BlogItem[]> {
  try {
    const blogs = await client.fetch(queries.getFeaturedBlogs)
    return blogs.length > 0 
      ? blogs.map(convertSanityBlog)
      : staticBlogData.slice(0, 3) // Fallback to first 3 static blogs
  } catch (error) {
    console.error('Error fetching featured blogs from Sanity:', error)
    return staticBlogData.slice(0, 3)
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogItem | null> {
  try {
    const blog = await client.fetch(queries.getBlogBySlug, { slug })
    return blog ? convertSanityBlog(blog) : null
  } catch (error) {
    console.error('Error fetching blog by slug from Sanity:', error)
    return null
  }
}

export async function getLatestBlogs(): Promise<BlogItem[]> {
  try {
    const blogs = await client.fetch(queries.getLatestBlogs)
    return blogs.length > 0 
      ? blogs.map(convertSanityBlog)
      : staticBlogData.slice(0, 3) // Fallback to first 3 static blogs
  } catch (error) {
    console.error('Error fetching latest blogs from Sanity:', error)
    return staticBlogData.slice(0, 3)
  }
}

// Categories API
export async function getAllCategories() {
  try {
    const categories = await client.fetch(queries.getAllCategories)
    return categories
  } catch (error) {
    console.error('Error fetching categories from Sanity:', error)
    return []
  }
}
