if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const seedDB = require('./seed');
const quotesRoutes = require('./apis/quotesRoutes')
const cors = require('cors');

const dbUrl = process.env.dbUrl ;

mongoose.connect(dbUrl)
    .then(() => console.log('connection open database connected'))
    .catch((err) => console.log(err));

;

// jo data react se aaega use req.body mein json format mein ye store karaega
app.use(express.json());

app.use(cors());

// this will seed the database
// seedDB();


app.use(quotesRoutes);



app.get('/' , (req,res)=>{
    // javascript object ko json mein convert kar dehga.
    res.status(200).json({msg:"hello from quotes app server at 8000"});
})




const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`server started at port ${port}`);
})


