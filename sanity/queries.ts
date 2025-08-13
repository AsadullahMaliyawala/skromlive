// Sanity GROQ queries

// Product queries
export const getAllProducts = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  price,
  discountedPrice,
  description,
  category->{
    _id,
    name,
    slug,
    description,
    color
  },
  stock,
  featured,
  tags,
  additionalInformation,
  "thumbnails": thumbnails[].asset->url,
  "previews": previews[].asset->url
}`

export const getFeaturedProducts = `*[_type == "product" && featured == true] | order(_createdAt desc) {
  _id,
  title,
  slug,
  price,
  discountedPrice,
  description,
  category->{
    _id,
    name,
    slug,
    description,
    color
  },
  stock,
  featured,
  tags,
  additionalInformation,
  "thumbnails": thumbnails[].asset->url,
  "previews": previews[].asset->url
}`

export const getProductBySlug = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  price,
  discountedPrice,
  description,
  category->{
    _id,
    name,
    slug,
    description,
    color
  },
  stock,
  featured,
  tags,
  additionalInformation,
  "thumbnails": thumbnails[].asset->url,
  "previews": previews[].asset->url
}`

// Blog queries
export const getAllBlogs = `*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featured,
  categories,
  tags,
  "mainImage": mainImage.asset->url,
  "author": author->name
}`

export const getFeaturedBlogs = `*[_type == "blog" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featured,
  categories,
  tags,
  "mainImage": mainImage.asset->url,
  "author": author->name
}`

export const getBlogBySlug = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  featured,
  categories,
  tags,
  "mainImage": mainImage.asset->url,
  "author": author->{name, bio, "image": image.asset->url}
}`

export const getLatestBlogs = `*[_type == "blog"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  publishedAt,
  "mainImage": mainImage.asset->url
}`

// Author queries
export const getAllAuthors = `*[_type == "author"] {
  _id,
  name,
  slug,
  bio,
  "image": image.asset->url
}`

// Category queries
export const getAllCategories = `*[_type == "category"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  color
}`
