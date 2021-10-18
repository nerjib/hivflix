
const request = require('./requestPromise')
module.exports = class methods {
    constructor(access_token) {
        this.ACCESS_TOKEN= access_token
    }

   async  sendText(text, id) {
const json = {
    recipient:{id},
    message: {text}
}
   const res = await request({
        uri: 'https://graph.facebook.com/v2.11/me/messages',
        qs:{
            access_token: this.ACCESS_TOKEN
        },
        json,
         method: 'POST'
    })
        console.log('facebook says: ', 'res + haha madrid')
    }


    getMessageObjects(json){
       console.log(JSON.stringify(json))
      //  console.log('kkkkk '+JSON.stringify(json.entry[0].messaging[0].message.nlp.entities.intent[0].value))
        const id = json.entry[0].messaging[0].sender.id
        const message = json.entry[0].messaging[0].message.text
     // this.intent='tt'
//const intent = json.entry[0].messaging[0].message.nlp.entities.intent[0].value

/*
if (json.entry[0].messaging[0].message.nlp.entities.intent[0].value){
    intent = json.entry[0].messaging[0].message.nlp.entities.intent[0].value
}
/*
if(json.entry[0].messaging[0].message.nlp.entities.product[0].value){
    this.product = json.entry[0].messaging[0].message.nlp.entities.product[0].value
}

     */
    
return{ message, id, intent:'', product:'this.product||'}
    }
}



function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
  
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
  }
