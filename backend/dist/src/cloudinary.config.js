"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cloudinary_1 = require("cloudinary");
console.log('Cloudinary ENV:', process.env.CLOUDINARY_URL);
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.config.js.map