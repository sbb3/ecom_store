const { Router } = require("express");
const router = Router();
const env = require("@/config/envalid");

const apiRoutes = require("./api");

console.log(env.API);

router.use(env.API, apiRoutes);
// router.get('/api', (req, res) => res.status(200).send('Welcome to Ecommerce API'));
router.use((req, res) => res.status(400).json("No Api route found"));

module.exports = router;
