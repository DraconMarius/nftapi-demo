const router = require("express").Router();

const apiRoutes = require("./alchemyapi");


router.use("/api", apiRoutes);


module.exports = router;