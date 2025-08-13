export type BlogItem = {
  _id?: string;
  title: string;
  slug?: {
    current: string;
  };
  publishedAt?: string;
  excerpt?: string;
  body?: any; // Sanity block content
  featured?: boolean;
  categories?: string[];
  tags?: string[];
  mainImage?: string;
  author?: string | {
    name: string;
    bio?: any;
    image?: string;
  };
  // Legacy fields for backward compatibility
  date?: string;
  views?: number;
  img?: string;
};
