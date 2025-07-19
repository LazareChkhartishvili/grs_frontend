interface LocalizedString {
  ka: string;
  en: string;
  ru: string;
}

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
  exercises?: Exercise[];
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
  name: LocalizedString;
  description?: LocalizedString;
  image?: string;
  parentId: string;
  subcategories?: Category[];
  sets?: string[];
  isActive: boolean;
  sortOrder: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// SubCategory = Category (იგივე სქემაა, მხოლოდ parentId აქვს)
export type SubCategory = Category;

export interface Category {
  _id: string;
  name: LocalizedString;
  description?: LocalizedString;
  image?: string;
  parentId?: string;
  subcategories?: Category[];
  sets?: string[];
  isActive: boolean;
  sortOrder: number;
  isPublished: boolean;
} 