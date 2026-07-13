export interface Product {
  id: string;
  tebexPackageId: number | null;
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  features: string[];
  requirements: string[];
  installation: InstallationStep[];
  faq: FaqItem[];
  tags: string[];
  featured?: boolean;
  new?: boolean;
  rating?: number;
  reviewCount?: number;
}

export type ProductCategory = "mlo" | "script" | "vehicle" | "clothing" | "bundle";

export interface InstallationStep {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}