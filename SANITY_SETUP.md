# Sanity CMS Integration Setup

This template has been integrated with Sanity CMS for content management. Follow these steps to complete the setup:

## ✅ What's Already Done

1. **Dependencies Installed**: All Sanity packages have been installed
2. **Configuration Created**: `sanity.config.ts` file is configured
3. **Environment Variables**: `.env.local` file is created with your project details
4. **Schemas Defined**: Product, Blog, and Author schemas are created
5. **API Integration**: Components are updated to fetch data from Sanity
6. **Admin Panel**: Available at `/admin` route

## 🚀 Next Steps

### 1. Start Your Development Server

```bash
npm run dev
```

### 2. Access Sanity Studio

1. Open your browser and go to `http://localhost:3000/admin`
2. You'll be redirected to Sanity's authentication page
3. Log in with the same account you used to create the Sanity project
4. You'll be redirected back to your admin dashboard

### 3. Add CORS Origin (Required)

When you first access the admin panel, Sanity will prompt you to add your localhost URL as a CORS origin:

1. Click "Continue" when prompted
2. Add `http://localhost:3000` as an allowed origin
3. Save the settings

### 4. Create Content

Once logged in to the admin panel, you can:

#### Create Authors
1. Go to "Author" in the sidebar
2. Click "Create new Author"
3. Fill in the name, bio, and upload an image
4. Publish the author

#### Create Blog Posts
1. Go to "Blog Post" in the sidebar
2. Click "Create new Blog Post"
3. Add title, select an author, upload an image
4. Write your content and publish

#### Create Products
1. Go to "Product" in the sidebar
2. Click "Create new Product"
3. Add product details, images, and pricing
4. Publish the product

## 🔧 Configuration Details

### Environment Variables (`.env.local`)
```
SANITY_PROJECT_ID=x0z5w7dd
NEXT_PUBLIC_SANITY_PROJECT_ID=x0z5w7dd
NEXT_PUBLIC_SANITY_DATASET=production
```

### Project Configuration
- **Project ID**: x0z5w7dd
- **Dataset**: production
- **Project Title**: Scrom

## 📁 File Structure

```
sanity/
├── schemas/
│   ├── product.ts      # Product schema
│   ├── blog.ts         # Blog post schema
│   └── author.ts       # Author schema
├── client.ts           # Sanity client configuration
└── queries.ts          # GROQ queries

src/lib/
├── sanity-api.ts       # API functions
└── sanity-helpers.ts   # Helper functions
```

## 🔄 Fallback System

The integration includes a fallback system:
- If Sanity is unavailable, the site will display static data
- No content will be lost during the transition
- Components gracefully handle both Sanity and static data

## 🎯 Updated Components

These components now fetch data from Sanity:
- `BlogGrid` - Displays all blog posts
- `LatestPosts` - Shows recent blog posts
- `ShopWithoutSidebar` - Product listings
- And more...

## 🆘 Troubleshooting

### Common Issues:

1. **Admin panel not loading**: Make sure CORS origin is added
2. **Content not showing**: Check if content is published in Sanity
3. **Images not displaying**: Ensure images are uploaded to Sanity

### Support

If you encounter any issues, the components will fall back to static data, so your site will continue to work while you resolve any Sanity-related problems.

## 🎉 You're All Set!

Your Next.js e-commerce template is now powered by Sanity CMS! You can manage all your content from the admin panel at `/admin`.
