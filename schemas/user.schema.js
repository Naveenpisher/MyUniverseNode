const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        "FirstName": {
            "type": "String",
            min: [6, 'Must be at least 6, got {VALUE}'],
            // required: true
        },
        "LastName": {
            "type": "String"
        },
        "Email": {
            "type": "String",
            unique: true,
            // required: true
        },
        "Password": {
            "type": "String",
            // required: true,
            // min: [6, 'Must be at least 6, got {VALUE}'],
        },
        "Gender": {
            "type": "String",
            // required: true
        },
        "DateOfBirth": {
            "type": "Date",
            // required: true
        },
        "Identification": {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Identification",
            required: false
        },
        "ProfileImage": {
            "type": "String",
        },
        "Photos": [
            {
                "type": "String"
            }
        ],
        "Photos": [
            {
                "type": "String",
                default: [],
            }
        ],
        "Address": [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Address",
                default: [],
                required: false
            }
        ]

    }
);


module.exports = mongoose.model('User', UserSchema, 'Users');