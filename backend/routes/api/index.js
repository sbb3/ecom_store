const { Router } = require("express");
const router = Router();
const productRoutes = require("./productRoutes");
const authRoutes = require("./authRoutes");


router.use("/product", productRoutes);
router.use("/auth", authRoutes);
// router.use('/product', (req, res) => res.status(200).json({ message: 'Product route' }));

module.exports = router;
