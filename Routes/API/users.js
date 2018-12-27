const express = require('express');

const router = express.Router();
//route         get /api/users/test
//description   tests users route
//access        public
router.get('/test',(req,res) => res.json({name: "muneeb",status: "users works" }));

module.exports = router;