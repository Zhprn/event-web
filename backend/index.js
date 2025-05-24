const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParse = require ('cookie-parser')
const dotenv = require('dotenv')
const path = require('path')
require ('dotenv').config()


// routes
const userRoutes = require ('./routes/userRoutes.js')
const eventRoutes = require ('./routes/eventRoutes.js')

// middlewares
const app = express()
app.use(cors())
app.use(cookieParse())
app.use(express.json({ extended : true }))

// api
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/auth', userRoutes);
app.use('/api/event', eventRoutes);



// database sync
// const db = require('./models')
// db.sequelize.sync({alter : true}).then(() =>{
//     console.log('Database Sync')
// }); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running using port on ${PORT}`);
});