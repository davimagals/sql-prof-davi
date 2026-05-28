const express = require("express");

const validateSql = require("../middlewares/validateSql");

const { executeQuery } = require("../services/mysql");

const router = express.Router();

router.post("/query", validateSql, async (req, res) => {
  try {
    const { sql } = req.body;

    const results = await executeQuery(sql);

    res.json({
      results,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
