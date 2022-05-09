const express = require('express');
const moment = require ('moment')

const router = express.Router();
const db = require('../../dbs/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT * FROM hairiditybarbers';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/:id', async (req, res) => {
  const text = 'SELECT * FROM hairiditybarbers WHERE id = $1';
  // console.log(req.params.id);
  try {
    const { rows } = await db.query(text, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(rows);
  } catch (error) {
    return res.status(400).send(error);
  }
});



    
router.post('/', async (req, res) => {
    
    const createUser = `INSERT INTO
    hairiditybarbers (name,img,state,city,address,rating,status,category,longitude,latitude)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;  
  const values = [
  req.body.name,
  req.body.img||'',
  req.body.state,
    req.body.city,
    req.body.address,
    req.body.rating||0,
       req.body.status,
    req.body.category,
    req.body.longitude,
    req.body.latitude,
    ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'book added to cart successfully​',
      User_id: rows[0].user_id,
      Book_id: rows[0].movie_id,
    },
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });

  router.delete('/remove/:movieid/:userid', async (req, res) => {
    
    const createUser = `DELETE  FROM
    carts where user_id = $1 and movie_id = $2`;  
  const values = [
  req.params.userid,
  req.params.movieid,
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'Cart deleted successfully​',
      
    },
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });
 

module.exports = router;
