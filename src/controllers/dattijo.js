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
    const getAllQ = 'SELECT * from dattijovideo order by id desc';
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

  router.get('/newss', async (req, res) => {
    const getAllQ = 'SELECT * from dattinews order by newsid desc';
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
  

router.get('/:id', async (req, res) => {
    const text = 'SELECT * FROM stories left join chapters on stories.id=chapters.storyid WHERE stories.id = $1';
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
  router.get('/storychapters/:id', async (req, res) => {
    const text = 'SELECT * FROM chapters WHERE storyid = $1';
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
  router.get('/chapterlist/:id', async (req, res) => {
    const text = 'SELECT id,storyid,chapter,subject FROM chapters WHERE storyid = $1 order by chapter asc';
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

  router.get('/chapter/:id', async (req, res) => {
    const text = 'SELECT * FROM chapters WHERE id=$1';
    // console.log(req.params.id);
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'book not paid' });
      }
      return res.status(200).send({message: 'paid',rows});
    } catch (error) {
      return res.status(400).send(error);
    }
  });
  router.get('/author/:id', async (req, res) => {
    const text = 'SELECT * FROM movies WHERE author_id = $1';
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

  router.get('/news', async (req, res) => {
    const text = 'SELECT * FROM dattinews order by newsid desc';
    // console.log(req.params.id);
      try {
        // const { rows } = qr.query(getAllQ);
        const { rows } = await db.query(text);
        return res.status(201).send(rows);
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({ message: 'movies not available' });
        }
        return res.status(400).send(`${error} jsh`);
      }
  });
 

  
  router.post('/',  async(req, res) => {
    
   // cloudinary.uploader.upload(req.file.path, async (result)=> {
    
    const createUser = `INSERT INTO
    dattijovideo(title,url,description,date)
    VALUES ($1, $2,$3,$4) RETURNING *`;  
  const values = [
  req.body.title,
  req.body.url,
  req.body.description,
  moment(new Date())
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'Movie added successfully???',
      title: rows[0].title,
     
    },
  };
  return res.status(201).send(data);
  } catch (error) {
  return res.status(400).send(error);
  }
  
  //  },{ resource_type: "auto", public_id: `ridafycovers/${req.body.title}` })


  });

  router.post('/news',  async(req, res) => {
    
    // cloudinary.uploader.upload(req.file.path, async (result)=> {
     
     const createUser = `INSERT INTO
     dattinews(id, name, author, title,url,description,urltoimage,publishedat)
     VALUES ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING *`;  
   const values = [
     req.body.id,
     req.body.name,
    req.body.author,
   req.body.title,
   req.body.url,
   req.body.description,
   req.body.urltoimage,
   moment(new Date())
   ];
   try {
   const { rows } = await db.query(createUser, values);
   // console.log(rows);
   const data = {
     status: 'success',
     data: {
       message: 'news added successfully???',
       title: rows[0].title,
      
     },
   };
   return res.status(201).send(data);
   } catch (error) {
   return res.status(400).send(error);
   }
   
   //  },{ resource_type: "auto", public_id: `ridafycovers/${req.body.title}` })
 
 
   });
 

module.exports = router;
