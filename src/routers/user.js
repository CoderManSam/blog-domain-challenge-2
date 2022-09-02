const express = require("express");
const {
    createUser,
    // getAllMovies,
    // getMovieById,
    updateUser
} = require('../controllers/user');

const router = express.Router();

// router.get("/", getAllMovies);
router.post("/", createUser);
// router.get("/:id", getMovieById);
router.put("/:id", updateUser);

module.exports = router;