import 'dotenv/config'; // ეს ავტომატურად ჩატვირთავს .env-ს root-დან ან სადაცაა
import { v2 as cloudinary } from 'cloudinary';

console.log('Cloudinary ENV:', process.env.CLOUDINARY_URL);

export default cloudinary; 