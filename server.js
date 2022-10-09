require("dotenv").config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload')
const { connectToDataBase } = require('./config/db.config');
const methodOverride = require('method-override')
const { verifyTokenMiddleware } = require('./middleware/authentication.middleware');
const userRoute = require('./routes/users.route.js');
const articleRoute = require('./routes/article.route.js');
const authenticationRoute = require('./routes/authentication.route');
const auditRoute = require('./routes/audit.route');
const { uploadImage } = require('./services/image.service')
const cors = require('cors');
const axios = require("axios");
const morgan = require('morgan');
var fs = require('fs')
var path = require('path')

//Database Connection
connectToDataBase();

morgan.token('code', function getId(req, res) {
    return res.statusCode
})

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//View Engines
app.set("view engine", 'ejs');

const middleware = [
    express.static('public'),
    cors(),
    express.json(),
    express.urlencoded({ extended: true }),
    morgan(':code :method :url :response-time', { stream: accessLogStream }),
    methodOverride('_method'),
    fileUpload()
]

// create a write stream (in append mode)



//Middleware
app.use([...middleware]);

//Routes
app.use("/api/users", userRoute);
app.use("/api/authentication", authenticationRoute);
app.use("/api/audit", auditRoute);

app.use("/articles", verifyTokenMiddleware, articleRoute);


app.get('/', (req, res) => {

    // console.log(req.files);
    // console.log(req.files);
    // res.send('Hello')

    const options = {
        method: 'GET',
        url: 'https://random-user.p.rapidapi.com/getuser',
        headers: {
            'X-RapidAPI-Key': '52b7642338mshcdc1c1168ccd256p15d4abjsn897423ec668f',
            'X-RapidAPI-Host': 'random-user.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        // console.log(response.data)
        res.send(response.data)
        //console.log(response.data);
    }).catch(function (error) {
        res.send(error)
        //console.error(error);
    });

});

app.post('/', async (req, res) => {

    //const path = await uploadImage(req);
    //res.send(path);
    // res.send('Hello')
});

app.get('**', (req, res) => {
    res.send('Not Found')
});




app.listen(8000, () => console.log('App Is Running'))


