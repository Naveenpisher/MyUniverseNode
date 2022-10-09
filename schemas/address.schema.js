const mongoose = require('mongoose');




const AddressSchema = mongoose.Schema(

    {
        "Street": {
            "type": String
        },
        "State": {
            "type": String
        },
        "Country": {
            "type": String
        },
        "ZipCode": {
            "type": String
        },
        "User": {
            "type": mongoose.Schema.Types.ObjectId,
             ref: "User"
        }
    }
)


module.exports = mongoose.model('Address', AddressSchema, 'Addresses');