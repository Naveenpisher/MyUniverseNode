const mongoose = require('mongoose');


const connectToDataBase = () => {
    mongoose.connect(process.env.MONGODB, () => { console.log('Db connected'), (e) => console.log(e); });
}


module.exports = { connectToDataBase }