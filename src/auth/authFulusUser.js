const express = require('express');
const moment = require('moment');
const nodemailer = require("nodemailer");

const Helper = require('../helpers/helper');

const router = express.Router();
const db = require('../dbs/index');

            
            router.get('/authmail/:id', async (req, res) => {
       const decoded = await      Helper.decodedEmail(req.params.id)
             // await   main('kabirnajib0@gmail.com')
             const text = 'SELECT * FROM dattiusers WHERE email = $1';

             try {
              const { rows } = await db.query(text, [decoded.email]);
              if (!rows[0]) {
                // console.log('user not');
                return res.status(402).send({ message: 'email not found' });
              }
              // console.log(rows[0].pword);
              const response = {  
                status: 'Account verified',
                            };
             
                            await updateUserEmail(decoded.email)
              return res.status(200).send(response);
            } catch (error) {
              return res.status(405).send(error);
            }

     
    
                });

                const    updateUserEmail =async(email) =>{
                  const text1 = `update dattiusers set email_status=$1, email_verified_at=$2 where email=$3`;
                  values=[
                    'verified',
                    moment(new Date()),
                    email
                  ]
                  const { rows } = await db.query(text1, values);
                }
    

async function main(kk) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'ridafyinfp@gmail.com',
           pass: 'ridafyapp2020'
       }
   });
   var hashEmail = await Helper.emailToken(kk);

      let message = {
        from: 'Ridafy App <verify@ridafyapp.ng>',
        to: `${kk} <${kk}>`,
        subject: 'Account Verification',
        html: `Thanks for signing up to Ridafy! 
        <p>We want to make sure that we got your email right. Verifying your email will enable you to access  our content. Please verify your email by clicking the link below.
        </p>
        <p><b>Complete Verification<b/></p>        
        <p><b><a href='https://ridafyapp.herokuapp.com/api/v1/auth/signup/authmail/${hashEmail}'><h3>Click here</h3></a></b></p>`,

    };

    await transporter.sendMail(message, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });

 }




router.get('/maill',async(req,res)=>{
  
  mg.messages().send(data, function (error, body) {
    console.log(body);
    return res.send('sent');

  });
})


router.post('/', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(402).send({ message: 'Some values are missing' });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(401).send({ message: 'Please enter a valid email address' });
  }
  const hashPassword = Helper.hashPassword(req.body.password);
  
  const createQuery = `INSERT INTO
  fulususers (name,email,password,phone_no,gender,time,userid,state,dob,accountId)
  VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;  
const values = [
req.body.name,
req.body.email,
hashPassword,
req.body.phone_no,
req.body.gender,
moment(new Date()),
req.body.userid,
req.body.state,
req.body.dob,
req.body.accountid
];

  try {
    const { rows } = await db.query(createQuery, values);
    const token = Helper.generateToken(rows[0].id,'user');

    const response = {
      status: 'success',
      data: {
        message: 'User account successfully created waiting for email cofirmation',
        token,
        userId: rows[0].id,
      },
    };
    await   main(req.body.email )

    return res.status(201).send(response);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(404).send({ message: 'User with that username already exist' });
    }
    return res.status(400).send(error);
  }
});

module.exports = router;
