/* eslint-disable no-undef */
const request = require('supertest');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const fs = require('fs');
//const Helper = require('../src/controllers/helper');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);


dotenv.config();

const db = require('../src/dbs');
const app = require('../app');

let auth = [];

process.env.DATATYPE = 'test';

describe('Users', () => {
  

   
    describe('/GET users', () => {
        it('it should GET all the userss', (done) => {
          chai.request(app)
              .get('/api/v1/users')
              .end((err, res) => {
                    res.should.have.status(201);
                    console.log(res.body[0])
                 //   res.body.length.should.be.eql(0);
                      res.body.should.be.a('array');
                    res.body[0].should.have.key('id','name');
                   // res.body.should.have.key('name').eql('welcome to hivflix');

                done();
              });
        });
    });
  
  });
/*
beforeAll(async () => {
 /* await db.query('CREATE TABLE students (id SERIAL PRIMARY KEY, name TEXT)');
  await db.query('CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, fName VARCHAR(100) NOT NULL,lName VARCHAR(100) Null,username VARCHAR(100) NOT NULL, pword TEXT NOT NULL, email VARCHAR(100) UNIQUE NOT NULL,role VARCHAR(100) Null, dept VARCHAR(100) NOT NULL, address VARCHAR(255) NULL,created_date TIMESTAMP )');
  await db.query('CREATE TABLE IF NOT EXISTS articles(id SERIAL PRIMARY KEY, userId INT NOT NULL, title VARCHAR(128) NOT NULL, article TEXT NOT NULL, createdOn TIMESTAMP, FOREIGN KEY (userId) REFERENCES users(id))');
  await db.query("INSERT INTO users (fname, username, pword, email, role, dept, address) VALUES ('user1','user21','11','user@gmail.com','staff','it','kd')");
  await db.query('CREATE TABLE IF NOT EXISTS comments(id SERIAL PRIMARY KEY, userid INT NOT NULL, comment TEXT NOT NULL, articleid INTEGER NOT NULL, post_date TIMESTAMP, FOREIGN KEY (articleid) REFERENCES articles(id))');
  await db.query('CREATE TABLE IF NOT EXISTS gifs(id SERIAL PRIMARY KEY, userId INT NOT NULL, title VARCHAR(128) NOT NULL, gifUrl TEXT NOT NULL, createdOn TIMESTAMP, FOREIGN KEY (userId) REFERENCES users(id))');
  await db.query('CREATE TABLE IF NOT EXISTS gifComments(id SERIAL PRIMARY KEY, userid INT NOT NULL, comment TEXT NOT NULL, gifID INTEGER NOT NULL, post_date TIMESTAMP, FOREIGN KEY (gifid) REFERENCES gifs(id))');
  auth.token1 = Helper.generateToken(1, 'admin');
});

beforeEach(async () => {
});

afterEach(async () => {
 // await db.query('DELETE FROM students');
});

afterAll(async () => {
 /* await db.query('DROP TABLE gifcomments');
  await db.query('DROP TABLE students');
  await db.query('DROP TABLE comments');
  await db.query('DROP TABLE gifs');
  await db.query('DROP TABLE articles');
  await db.query('DROP TABLE users');
  db.end();
});
*//*
describe('POST /create', () => {

  describe('GET users', () => {
    test('It responds with an array of users', async () => {
      const response = await request(app).get('/');
      expect(response.body.length).toBe(2);
    });
  });
  
});

/*
// sign in
describe('POST /students', () => {
  test('staff signin', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'nk@gmail.com',
        password: '11',
      });
    // console.log(login.body);
    auth.token = response.body.data.token;
    const decoded = await jwt.verify(response.body.data.token, 'secret');
    auth.id = decoded.userId;
    // console.log(auth.id);
    expect(response.body.data).toHaveProperty('token');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET users', () => {
  test('It responds with an array of users', async () => {
    const response = await request(app).get('/api/v1/users').set('token', auth.token);
    expect(response.body.length).toBe(2);
  });
});
describe('GET one user', () => {
  test('It responds with one user', async () => {
    const response = await request(app).get('/api/v1/users/1').set('token', auth.token);
    expect(response.body.email).toBe('user@gmail.com');
    // expect(response.body[0]).toHaveProperty('id');
    // expect(response.body[0]).toHaveProperty('name');
    // expect(response.statusCode).toBe(200);
  });
});

describe('POST /Article', () => {
  test('create article', async () => {
    const response = await request(app)
      .post('/api/v1/articles')
      .set('token', auth.token)
      .send({
        title: 'my article',
        article: 'aticulated article',
      });
    expect(response.body.data).toHaveProperty('articleId');
    expect(response.statusCode).toBe(201);
  });
});

describe('Modify Article', () => {
  test('update article', async () => {
    const response1 = await request(app)
      .post('/api/v1/articles')
      .set('token', auth.token)
      .send({
        title: 'my article',
        article: 'aticulated article',
      });
      // console.log(data1.body);
    const response = await request(app)
      .put(`/api/v1/articles/${response1.body.data.articleId}`)
      .set('token', auth.token)
      .send({
        title: 'my article',
        article: 'updated aticulated article',
      });
    expect(response.statusCode).toBe(200);
  });
});

describe('DeleteArticle', () => {
  test('delete article', async () => {
    const response1 = await request(app)
      .post('/api/v1/articles')
      .set('token', auth.token)
      .send({
        title: 'my article',
        article: 'aticulated article',
      });
      // console.log(data1.body);
    const response = await request(app)
      .delete(`/api/v1/articles/${response1.body.data.articleId}`)
      .set('token', auth.token);
    expect(response.body.data.message).toBe('Article successfully deleted');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET all articles', () => {
  test('It returns array of article', async () => {
    const response = await request(app)
      .get('/api/v1/articles')
      .set('token', auth.token);
    expect(response.statusCode).toBe(200);
  });
});
/*
describe('GET all articles', () => {
  test('It returns array of article', async () => {
    const response = await request(app)
      .get('/api/v1/feeds')
      .set('token', auth.token);
    console.log(response);
    expect(response.statusCode).toBe(200);
  });
});
*//*
describe('POST /comments', () => {
  test('post comment on article', async () => {
    const dataa = await request(app)
      .post('/api/v1/articles')
      .set('token', auth.token)
      .send({
        id: '1',
        title: 'my article',
        article: 'aticulated article',
      });
    // console.log(dataa.body.data.articleID);
    const data = await request(app)
      .post(`/api/v1/articles/${dataa.body.data.articleId}/comments`)
      .set('token', auth.token)
      .send({
        id: '1',
        comment: 'aticulated article comment',
      });
    expect(data.statusCode).toBe(201);
  });
});

describe('GET one article', () => {
  test('It return one article with it comments', async () => {
    const dataa = await request(app)
      .post('/api/v1/articles')
      .set('token', auth.token)
      .send({
        id: '1',
        title: 'my article',
        article: 'aticulated article',
      });
    await request(app)
      .post(`/api/v1/articles/${dataa.body.data.articleId}/comments`)
      .set('token', auth.token)
      .send({
        id: '1',
        comment: 'aticulated article comment',
      });
    const response = await request(app)
      .get(`/api/v1/articles/${dataa.body.data.articleId}`)
      .set('token', auth.token);
    expect(response.statusCode).toBe(200);
  });
});


describe('POST Gifs', () => {
  test('Post Gif', async () => {
    const data = await request(app)
      .post('/api/v1/gifs')
      .set('token', auth.token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('title', 'buttons')
      .attach('image', fs.readFileSync('./src/im/btn.gif'), 'btn.gif');
    expect(data.statusCode).toBe(201);
    // console.log(data.body);
  });
});

describe('Comment', () => {
  test('Comment gifs', async () => {
    const data1 = await request(app)
      .post('/api/v1/gifs')
      .set('token', auth.token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('title', 'buttons')
      .attach('image', fs.readFileSync('./src/im/btn.gif'), 'btn.gif');
    const data = await request(app)
      .post(`/api/v1/gifs/${data1.body.data.gifID}/comments`)
      .set('token', auth.token)
      .send({
        comment: 'nice button',
      });
    expect(data.statusCode).toBe(201);
  });
});

describe('GET / all gif', () => {
  test('It responds with an array of users', async () => {
    const response = await request(app).get('/api/v1/gifs').set('token', auth.token);
    expect(response.statusCode).toBe(200);
  });
});

describe('Get single Gif', () => {
  test('return one gif and its comments', async () => {
    const data1 = await request(app)
      .post('/api/v1/gifs')
      .set('token', auth.token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('title', 'buttons')
      .attach('image', fs.readFileSync('./src/im/btn.gif'), 'btn.gif');

    await request(app)
      .post(`/api/v1/gifs/${data1.body.data.gifID}/comments`)
      .set('token', auth.token)
      .send({
        comment: 'nice button',
      });
    await request(app)
      .post(`/api/v1/gifs/${data1.body.data.gifID}/comments`)
      .set('token', auth.token)
      .send({
        comment: 'nice button comments 2',
      });

    const data = await request(app)
      .get(`/api/v1/gifs/${data1.body.data.gifID}`)
      .set('token', auth.token);
    expect(data.statusCode).toBe(200);
  });
});

describe('Gif', () => {
  test('gifs Delete', async () => {
    const data1 = await request(app)
      .post('/api/v1/gifs')
      .set('token', auth.token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('title', 'buttons')
      .attach('image', fs.readFileSync('./src/im/btn.gif'), 'btn.gif');
    const data = await request(app)
      .delete(`/api/v1/gifs/${data1.body.data.gifID}`)
      .set('token', auth.token);
    expect(data.statusCode).toBe(200);
  });
});*/