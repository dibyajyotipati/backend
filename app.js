const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');
const url="mongodb+srv://admin:admin123@userdata.mwiyfm6.mongodb.net/UserData?retryWrites=true&w=majority"
const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  const dataSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    image:{
        type:JSON
    },

    result:{
        type:JSON
    }
          

  }) 

app.post('/:userId',async(req,res)=>{

    const userId = req.params.userId
    const{image,result}=req.body
    const data = mongoose.model(userId, dataSchema);
    await data({userId,image,result}).save()

})

app.get('/:userId',async(req,res)=>{
    const userId = req.params.userId
    userId[0].toUpperCase()
    const userdata = mongoose.model(userId,dataSchema);
    const data = await userdata.find({})
     return res.json({data})
})



  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });