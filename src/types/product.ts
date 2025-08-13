import { Category } from './category';

export type Product = {
  _id?: string;
  title: string;
  slug?: {
    current: string;
  };
  reviews?: number;
  price: number;
  discountedPrice?: number;
  description?: string;
  category?: Category | string; // Can be Category object or string for backward compatibility
  stock?: number;
  featured?: boolean;
  tags?: string[];
  additionalInformation?: Array<{
    label: string;
    value: string;
  }>;
  id?: number; // Keep for backward compatibility
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  thumbnails?: string[]; // Sanity format
  previews?: string[]; // Sanity format
};
