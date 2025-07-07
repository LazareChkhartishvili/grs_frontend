import { connect, model, Schema, Types } from 'mongoose';

// სუბკატეგორიის სქემა
const SubCategorySchema = new Schema({
  name: { type: String, required: true },
  nameGe: { type: String },
  nameRu: { type: String },
  description: String,
  image: String,
  categoryId: { type: Types.ObjectId, required: true },
  categoryCode: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

const SubCategoryModel = model('SubCategory', SubCategorySchema);

const orthopedicSubcategories = [
  {
    name: 'Cervical Spine Problems',
    nameGe: 'კისრის მალების პრობლემები',
    nameRu: 'Проблемы шейного отдела',
    isActive: true,
    categoryId: new Types.ObjectId('686ab92fb5bca1e2a26ea757'),
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
    sortOrder: 1,
  },
  {
    name: 'Thoracic Spine Problems',
    nameGe: 'გულმკერდის მალების პრობლემები',
    nameRu: 'Проблемы грудного отдела',
    isActive: true,
    categoryId: new Types.ObjectId('686ab92fb5bca1e2a26ea757'),
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61',
    sortOrder: 2,
  },
  {
    name: 'Lumbar Spine Problems',
    nameGe: 'წელის მალების პრობლემები',
    nameRu: 'Проблемы поясничного отдела',
    isActive: true,
    categoryId: new Types.ObjectId('686ab92fb5bca1e2a26ea757'),
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc',
    sortOrder: 3,
  },
  {
    name: 'Upper Limb Problems',
    nameGe: 'ზედა კიდურების პრობლემები',
    nameRu: 'Проблемы верхних конечностей',
    isActive: true,
    categoryId: new Types.ObjectId('686ab92fb5bca1e2a26ea757'),
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
    sortOrder: 4,
  },
  {
    name: 'Lower Limb Problems',
    nameGe: 'ქვედა კიდურების პრობლემები',
    nameRu: 'Проблемы нижних конечностей',
    isActive: true,
    categoryId: new Types.ObjectId('686ab92fb5bca1e2a26ea757'),
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
    sortOrder: 5,
  },
  {
    name: 'Posture Problems',
    nameGe: 'პოსტურის პრობლემები',
    nameRu: 'Проблемы осанки',
    isActive: true,
    categoryId: new Types.ObjectId('686ab92fb5bca1e2a26ea757'),
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    sortOrder: 6,
  },
];

const neurologySubcategories = [
  {
    name: "Parkinson's Disease",
    nameGe: 'პარკინსონის დაავადება',
    nameRu: 'Болезнь Паркинсона',
    isActive: true,
    categoryId: new Types.ObjectId('686ab92fb5bca1e2a26ea758'),
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
    sortOrder: 1,
  },
  {
    name: 'Facial Nerve Paralysis',
    nameGe: 'სახის ნერვის პარალიზი',
    nameRu: 'Паралич лицевого нерва',
    isActive: true,
    categoryId: new Types.ObjectId('686ab92fb5bca1e2a26ea758'),
    image: 'https://images.unsplash.com/photo-1576671081837-49b1a991dd54',
    sortOrder: 2,
  },
  {
    name: 'Stroke',
    nameGe: 'ინსულტი',
    nameRu: 'Инсульт',
    isActive: true,
    categoryId: new Types.ObjectId('686ab92fb5bca1e2a26ea758'),
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc',
    sortOrder: 3,
  },
  {
    name: 'Multiple Sclerosis',
    nameGe: 'გაფანტული სკლეროზი',
    nameRu: 'Рассеянный склероз',
    isActive: true,
    categoryId: new Types.ObjectId('686ab92fb5bca1e2a26ea758'),
    image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c',
    sortOrder: 4,
  },
];

async function createSubcategories() {
  try {
    await connect(
      'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db',
    );
    console.log('Connected to MongoDB');

    // Insert orthopedic subcategories
    const orthopedicResults = await SubCategoryModel.insertMany(orthopedicSubcategories);
    console.log('Orthopedic subcategories created:', orthopedicResults.length);

    // Insert neurology subcategories
    const neurologyResults = await SubCategoryModel.insertMany(neurologySubcategories);
    console.log('Neurology subcategories created:', neurologyResults.length);

    console.log('All subcategories created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating subcategories:', error);
    process.exit(1);
  }
}

createSubcategories();
