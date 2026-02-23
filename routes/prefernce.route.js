const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    createPreference,
    getPreference,
    updatePreference
} = require("../controllers/prefence.controller");

router.post("/", authMiddleware, createPreference);
router.get("/", authMiddleware, getPreference);
router.put("/", authMiddleware, updatePreference);

module.exports = router;