const express = require('express');


router.get('/', (req,res)=>{
return res.status(200).send({status:'success'})
})
module.exports = router;
