const express = require('express');
const moment = require ('moment')

const router = express.Router();
const db = require('../dbs/index');

router.get('/', async (req, res) => {
  const getAllQ = 'SELECT * FROM dattiquiz where active =$1';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ, [1]);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
});

router.put('/', async (req, res) => {
  const text = 'UPDATE dattiquiz set winner=$1, winnerid=$5, anstime=$6 WHERE id = $3 and winner is null and active=$4 returning *';
  // console.log(req.params.id);
  try {
    const { rows } = await db.query(text, [req.body.winner, 0, req.body.quizid, 1, req.body.winnerid, moment(new Date())]);
  if (rows.length<1) {
      return res.status(200).send({ message: 'Quiz has already been answered, nice attempt' });
    }
    return res.status(200).send({message:'Congratulation! you will be contacted for your prize'});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/', async (req, res) => {
    
    const createUser = `INSERT INTO
    dattiusers (name,email,password,phone_no,gender,time)
    VALUES ($1, $2,$3,$4,$5,$6) RETURNING *`;  
  const values = [
  req.body.name,
  req.body.email,
  req.body.password,
  req.body.phone_no,
  req.body.gender,
  moment(new Date()),
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'User added successfully​',
      Name: rows[0].name,
      Email: rows[0].email,
      phone: rows[0].phone_no,
    },
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });

  
router.put('/pushtoken', async (req, res) => {
    
    const createUser = `UPDATE dattiusers set token = $1 where userid=$2 RETURNING *`;  
  const values = [
  req.body.token,
  req.body.userid
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'User added successfully​',
    
    },
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });

  router.post('/alltokens', async (req, res) => {
    
    const createUser = `INSERT INTO
    dattipushtoken (token,time)
    VALUES ($1, $2) RETURNING *`;  
  const values = [
  req.body.token,
  moment(new Date())
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success'
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  });
 

module.exports = router;
