
router.post('/', upload.array('file'),  async(req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, req.body.title+req.body.author_id);


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
    movies(title,author_id,description,video_url,category_id,cover_location,price,created_at,type)
    VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;  
  const values = [
  req.body.title,
  req.body.author_id,
  req.body.description,
  urls[0],
  req.body.category_id,
  urls[1],
  req.body.price,
  moment(new Date()),
  req.body.type
  ];
  try {
  const { rows } = await db.query(createUser, values);
  // console.log(rows);
  const data = {
    status: 'success',
    data: {
      message: 'Movie added successfully​',
      title: rows[0].title,
      cover_location: rows[0].cover_location,
      sample_location: rows[0].sample_location,
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
