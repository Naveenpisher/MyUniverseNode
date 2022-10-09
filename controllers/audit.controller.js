const identificationSchema = require('./../schemas/identification.schema');
const addressesSchema = require('./../schemas/address.schema');


const getIdentifications = async (req, res) => {
    
    const identifications = await identificationSchema.find({}).populate('User');
    res.send(identifications);
}

const getAddresses = async (req, res) => {

    const addresses = await addressesSchema.find({}).populate('User');
    res.send(addresses);
}


module.exports = {
    getIdentifications,
    getAddresses,
}