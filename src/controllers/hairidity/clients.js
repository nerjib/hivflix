const express = require('express');
const moment = require ('moment')

const router = express.Router();
const db = require('../../dbs/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT * FROM hairidityusers where account_type = $1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, ['vendor']);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.get('/:id', async (req, res) => {
  const text = 'SELECT * FROM hairidityusers WHERE id = $1';
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
    hairiditybarbers (name,img,state,city,address,rating,status,category,longitude,latitude,created_at,updated_at,bvn,nin, email, password, phone_no,gender,dob)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *`;  
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
    moment(new Date()),
    moment(new Date()),
    req.body.bvn,
    req.body.nin,
    req.body.email,
    req.body.password,
    req.body.phone_no,
    req.body.gender,
    req.body.dob
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


module.exports = router;
