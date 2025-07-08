export interface Set {
  _id: string;
  title: string;
  description: string;
  exercises: unknown[];
  categoryId: string;
  subcategoryId?: string;
  monthlyPrice?: number;
}
