const express = require('express');

const router = express.Router();
//route         get /api/posts/test
//description   tests posts route
//access        public
router.get('/test',(req,res) => res.json({name: "muneeb",status: "posts works" }));

module.exports = router;