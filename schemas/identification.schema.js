const mongoose = require('mongoose');


const IdentificationSchema = mongoose.Schema(
    {
        Passport: {
            type: String
        },
        Aadhar: {
            type: String
        },
        "User": {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
)


module.exports = mongoose.model('Identification', IdentificationSchema, 'Identifications')