export interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: string;
}