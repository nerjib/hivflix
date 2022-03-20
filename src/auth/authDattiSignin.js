const express = require('express');

const CokokieParser = require('cookie-parser');
const Helper = require('../helpers/helper');

const router = express.Router();
router.use(CokokieParser());
const db = require('../dbs/index');

router.get('/', (req,res)=>{
return res.status(200).send({status:'success'})
})
module.exports = router;
