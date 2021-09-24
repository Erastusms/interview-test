const router = require("express").Router();
const ApiController = require("../controllers/ApiController");
// const { adminAuth } = require("../middlewares/auth");

// const adminRouter = require("./admin");
// const apiRouter = require("./api");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello world",
  });
});

router.post("/register", ApiController.register);
router.post("/login", ApiController.login);

// Get Data
router.get("/list-jobs/search?", ApiController.searchJobs);
router.get("/list-jobs/page=:pageNumber", ApiController.getJobs);
router.get("/details-job/:id", ApiController.getDetailsJob);


module.exports = router;
