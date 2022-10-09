
const { getFullHostUrl } = require('./../utilities/utility')
const UserSchema = require('../schemas/user.schema.js')
const IdentificationSchema = require('../schemas/identification.schema')
const AddressSchema = require('../schemas/address.schema')
const ImageService = require('../services/image.service')
const getUsers = async (req, res) => {
    let { itemsPerPage, currentPage, search } = req.query;

    currentPage = currentPage ? Number(currentPage) : 1;
    itemsPerPage = itemsPerPage ? Number(itemsPerPage) : 10;
    itemsToSkip = itemsPerPage * (currentPage - 1);
    let params = {};
    const exp = new RegExp(search, 'gim');

    if (search) {
        params = {
            $or: [{ FirstName: { $regex: exp } }, { LastName: { $regex: exp } }, { Email: { $regex: exp } }],
        }
    }

    const users = await UserSchema.find(params).populate(["Identification", "Address"]).skip(itemsToSkip).limit(itemsPerPage);
    const count = Object.keys(params).length ? await UserSchema.find(params).count() : await UserSchema.count();

    let totalPages = count / itemsPerPage;
    totalPages = Number.isInteger(totalPages) ? totalPages : Math.floor(totalPages + 1);

    const result = {
        totalItems: count,
        totalPages,
        currentPage,
        itemsPerPage,
        users,
    }
    res.send(result);
}

const getUsersById = async (req, res) => {
    const user = await UserSchema.findById(req.params.id).populate(["Identification", "Address"]);
    res.status(200).json(user)
}

const createUser = async (req, res) => {
    try {
        const create = await UserSchema.create(req.body);
        res.setHeader('Location', getFullHostUrl(req) + create._id);

        if (req.body.IdentificationDetails) {
            const identification = { User: create.id, ...req.body.IdentificationDetails }
            const IdentificationDetails = await IdentificationSchema.create(identification);
            create.Identification = IdentificationDetails.id;
        }

        if (req.body.Addresses) {
            const address = req.body.Addresses.map(t => { return { ...t, User: create.id } });
            const addressDetails = await AddressSchema.insertMany(address);
            console.log(addressDetails);
            create.Address = addressDetails.map(t => t.id);
        }

        if (req.files) {
            if (req.files.image) {
                create.ProfileImage = await ImageService.uploadImage(req.files.image, req);
            }

            if (req.files.photos && req.files.photos.length) {

                req.files.photos.forEach(async (element) => {

                    const url = await ImageService.uploadImage(element, req);
                    create.Photos.push(url);
                });
            }
        }

        await create.save();
        res.send(create);
    } catch (error) {
        res.send(error);
    }
}

const updateUser = async (req, res) => {
    const update = await UserSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(update);
}

const deleteUser = async (req, res) => {
    const create = await UserSchema.findByIdAndDelete({ _id: req.params.id });
    res.send(create);
}

module.exports = { getUsers, getUsersById, createUser, updateUser, deleteUser }