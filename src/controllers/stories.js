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
    const getAllQ = 'SELECT * FROM stories left join users on stories.author=users.userid left join categories on stories.category=categories.id';
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


  
router.post('/story', upload.single('file'),  async(req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, req.body.title+req.body.author);
   
   cloudinary.uploader.upload(req.file.path, function (result) {
      console.log('ingrul: ',result.secure_url)
     // res.send({imgurl:result.secure_url})
  //   Activity.UpdateWeeklyReport(req, res, result.secure_url);
    });

  /*  if (req.method === 'POST') {
        const urls = []
       const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await uploader(path)
          urls.push(newPath.url)
          fs.unlinkSync(path)
        }*/
  //  console.log((req.))
   // cloudinary.uploader.upload(req.file.path, async (result)=> {
    if (req.method === 'POST') {

    const createUser = `INSERT INTO
    stories(title,author,coverurl,price,time,category)
    VALUES ($1, $2,$3,$4,$5,$6) RETURNING *`;  
  const values = [
  req.body.title,
  req.body.author,
  'urls[0]',
  req.body.price,
  moment(new Date()),
  req.body.category
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'Movie added successfully​',
      title: rows[0].title,
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
 

  router.post('/chapter',  async(req, res) => {
    
   // cloudinary.uploader.upload(req.file.path, async (result)=> {
    
    const createUser = `INSERT INTO
    chapters(storyid,chapter,subject,body,time)
    VALUES ($1, $2,$3,$4,$5) RETURNING *`;  
  const values = [
  req.body.storyid,
  req.body.chapter,
  req.body.subject,
  req.body.body,
  moment(new Date())
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'Movie added successfully​',
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
