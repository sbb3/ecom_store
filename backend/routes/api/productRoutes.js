const { Router } = require("express");
const router = Router();
const cloudinary = require("@/utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const uuid = require("uuid");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb(null, "uploads/");
//     cb(null, "../frontend/public/images/");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${originalname}`); // uuid.v4() generates random filename
//   },
// });

// const storage = multer.memoryStorage();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecom-store-images",
    public_id: async (req, file) => {
      const { originalname } = file;
      const filename = originalname.split(".").slice(0, -1).join(".");
      return `${filename}-${uuid.v4()}`;
    },
    format: async (req, file) => "webp", // sized reduced by 90%
    // 	// const extension = originalname.split(".").pop();
    // 	// const filename = originalname.split(".").slice(0, -1).join(".");
    // 	const filename = originalname.substring(0, originalname.lastIndexOf("."));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_UNEXPECTED_FILE";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5000000 } }); // 5mb

const handleUpload = async (req, res, next) => {
  const uploadFile = upload.array("images");
  uploadFile(req, res, (err) => {
    // console.log(req.files);
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ message: "Only images are allowed" });
      } else if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File size too large" });
      }
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }
    next();
  });
};

// const convertToWebP = (req, res, next) => {
//   const uploadFile = upload.array("image");
//   console.log(req.files);
//   uploadFile(req, res, async (err) => {

//     if (err instanceof multer.MulterError) {
//       if (err.code === "LIMIT_UNEXPECTED_FILE") {
//         return res.status(400).json({ message: "Only images are allowed" });
//       } else if (err.code === "LIMIT_FILE_SIZE") {
//         return res.status(400).json({ message: "File size too large" });
//       }
//     } else if (err) {
//       return res.status(500).json({ message: err.message });
//     }
//     // Perform image conversion to WebP using sharp
//     if (req.files && req.files.length > 0) {
//       try {
//         const webpImages = await Promise.all(
//           req.files.map(async (file) => {
//             const buffer = await sharp(file.path).webp().toBuffer();
//             return {
//               originalname: `${file.filename.split(".")[0]}.webp`,
//               buffer: buffer,
//             };
//           })
//         );

//         // Replace the original image with the converted WebP image
//         req.files = webpImages;
//       } catch (err) {
//         return res.status(500).json({ message: "Image conversion failed" });
//       }
//     }

//     next();
//   });
// };

const {
  createProduct,
  getProductById,
  getProductBySlug,
  deleteProductById,
  getProducts,
  deleteProductBySlug,
  updateProduct,
  getLatestProducts,
  searchProducts,
  getSingleProduct,
} = require("@/controllers/productController");

router.get("/shop", getProducts);

router.get("/latest", getLatestProducts);

router.get("/search", searchProducts);

router.post("/create", handleUpload, createProduct);

router.route("/single/:slug").get(getSingleProduct);

router
  .route("/:slug")
  //   .get(getProductById)
  .get(getProductBySlug)
  .put(updateProduct)
  //   .delete(deleteProductById)
  .delete(deleteProductBySlug);

// router.route("/query").get(getProductById);

module.exports = router;
