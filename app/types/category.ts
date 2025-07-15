export interface MultiLanguageField {
  ka: string;
  en: string;
  ru: string;
}

export interface Video {
  _id: string;
  videoId: string;
  title: MultiLanguageField;
  description: MultiLanguageField;
  urls: {
    hd: string;
    sd: string;
  };
  isActive: boolean;
  sortOrder: number;
  viewCount: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlan {
  period: number;
  price: number;
}

export interface Set {
  _id: string;
  title: MultiLanguageField;
  description: MultiLanguageField;
  videos: Video[];
  isActive: boolean;
  sortOrder: number;
  monthlyPrice?: number;
  categoryId?: string;
  subcategoryId?: string;
}

export interface Exercise {
  _id: string;
  name: string;
  description: string;
  // დამატებითი ველები საჭიროების მიხედვით
}

export interface Subcategory {
  _id: string;
  name: string;
  nameGe: string;
  nameRu: string;
  image: string;
  categoryId: string;
  isActive: boolean;
  sortOrder: number;
  sets: Set[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  code: string;
  sequence: string;
  level: number;
  isActive: boolean;
  parentId: string | null;
  sortOrder: number;
  exercises: any[]; // თუ საჭიროა Exercise ინტერფეისიც შეგვიძლია დავამატოთ
  sets: Set[];
  subcategories: Subcategory[];
  createdAt: string;
  updatedAt: string;
} 