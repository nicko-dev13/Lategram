const express = require("express");
const router = express.Router();



router.post('/', (req, res) => {
  try {
      const { caption } = req.body;
      res.json(caption);
  } catch (error) {
      console.log(error);
      res.status(500).json({
          msg: "Server Error"
      })
  }
});

module.exports = router;