const express = require("express");
const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.post('/', (req, res) => {
    console.log("Post Created");
    console.log(req.body);
});

module.exports = router;