
const { getFullHostUrl } = require('./../utilities/utility')
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const uploadImage = (image, req) => {

    return new Promise((resolve, reject) => {

        let file = image;
        const extension = '.' + file.mimetype.split('/')[1];
        const fileName = uuidv4() + extension;
        const rootPath = path.join(__dirname, './../', 'public', 'images', fileName)
        file.mv(rootPath, (err) => {
            if (err) {
                throw err;
            }
            return resolve(getFullHostUrl(req) + '/images/' + fileName);
        })
    }
    )
}


module.exports = { uploadImage }