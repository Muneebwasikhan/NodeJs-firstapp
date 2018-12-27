const express = require('express');

const router = express.Router();
//route         get /api/profile/test
//description   tests profile route
//access        public
router.get('/test',(req,res) => res.json({name: "muneeb",status: "profile works" }));

module.exports = router;