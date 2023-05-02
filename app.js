const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://akashbag12a05:myieeeapp1@skycluster1.ip9s82v.mongodb.net/formsDB', {useNewUrlParser: true});

const Message = mongoose.model('Message', {
    name: String,
    email: String,
    message: String
  });

  app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
  });

  app.post('/submit', (req, res) => {
    const message = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    
    message.save()
      .then(() => {
        res.status(200).send('Message received');
      })
      .catch((err) => {
        res.status(500).send('Error saving message');
      });
  });

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });

//   myieeeapp1