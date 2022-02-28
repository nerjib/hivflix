const express = require('express');
const moment = require ('moment')
//const cloudinary = require('cloudinary');
//const multer = require('multer');
const dotenv = require('dotenv');
const upload = require('./multer')
const cloudinary = require('./cloudinary')
//const fs = require('fs');

const fs = require('fs')
const router = express.Router();
const db = require('../dbs/index');

dotenv.config();


router.get('/', async (req, res) => {
    const getAllQ = 'SELECT * FROM adverts';
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'movies not available' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });


router.get('/ads/:id', async (req, res) => {
    const text = 'SELECT * FROM adverts WHERE id = $1';
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

  router.get('/myads/:userid', async (req, res) => {
    const text = 'SELECT * FROM adverts WHERE user_id = $1';
    // console.log(req.params.id);
    try {
      const { rows } = await db.query(text, [req.params.userid]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'book not paid' });
      }
      return res.status(200).send({message: 'paid',rows});
    } catch (error) {
      return res.status(400).send(error);
    }
  });

  router.get('/category/:id', async (req, res) => {
    const text = 'SELECT * FROM movies WHERE category_id = $1';
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


  
router.post('/', upload.array('file'),  async(req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, req.body.title+req.body.user_id);


    if (req.method === 'POST') {
        const urls = []
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await uploader(path)
          urls.push(newPath.url)
          fs.unlinkSync(path)
        }
    
   // cloudinary.uploader.upload(req.file.path, async (result)=> {
    
    const createUser = `INSERT INTO
    adverts(title,user_id,description,img_url,category_id,price,created_at)
    VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *`;  
  const values = [
  req.body.title,
  req.body.user_id,
  req.body.description,
  urls[0],
  req.body.category_id,
  req.body.price,
  moment(new Date())
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'ads added successfully​',
      title: rows[0].title
    },
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  //  },{ resource_type: "auto", public_id: `ridafycovers/${req.body.title}` })

} else {
    res.status(405).json({
      err: `${req.method} method not allowed`
    })
  }

  });
 

module.exports = router;
