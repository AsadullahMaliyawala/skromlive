import { Product } from '@/types/product'
import { BlogItem } from '@/types/blogItem'
import { getRandomReviews } from '../../sanity/client'

// Convert Sanity product to component format
export function convertSanityProduct(sanityProduct: any): Product {
  return {
    _id: sanityProduct._id,
    title: sanityProduct.title,
    slug: sanityProduct.slug,
    price: sanityProduct.price,
    discountedPrice: sanityProduct.discountedPrice,
    description: sanityProduct.description,
    category: sanityProduct.category, // This will now be a Category object with name, slug, etc.
    stock: sanityProduct.stock,
    featured: sanityProduct.featured,
    tags: sanityProduct.tags,
    id: parseInt(sanityProduct._id?.slice(-8) || '1', 16) % 1000, // Generate numeric ID from _id
    reviews: getRandomReviews(), // Generate random reviews since not in schema
    imgs: {
      thumbnails: sanityProduct.thumbnails || [],
      previews: sanityProduct.previews || [],
    },
    thumbnails: sanityProduct.thumbnails,
    previews: sanityProduct.previews,
  }
}

// Convert Sanity blog to component format
export function convertSanityBlog(sanityBlog: any): BlogItem {
  const publishedDate = sanityBlog.publishedAt 
    ? new Date(sanityBlog.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown date'

  return {
    _id: sanityBlog._id,
    title: sanityBlog.title,
    slug: sanityBlog.slug,
    publishedAt: sanityBlog.publishedAt,
    excerpt: sanityBlog.excerpt,
    body: sanityBlog.body,
    featured: sanityBlog.featured,
    categories: sanityBlog.categories,
    tags: sanityBlog.tags,
    mainImage: sanityBlog.mainImage,
    author: sanityBlog.author,
    // Legacy format for existing components
    date: publishedDate,
    views: Math.floor(Math.random() * 500000) + 50000, // Generate random views
    img: sanityBlog.mainImage,
  }
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Get image URL with fallback
export function getImageUrl(imageUrl: string | undefined, fallback: string): string {
  return imageUrl || fallback
}
