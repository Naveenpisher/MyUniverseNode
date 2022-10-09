
const jwt = require('jsonwebtoken');

const UserSchema = require('./../schemas/user.schema');



const login = async (req, res) => {

    const user = await UserSchema.findOne({ Email: req.body.Email });

    if (user) {

        const token = jwt.sign(
            { UserId: user._id, Email: req.body.Email },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: 120,
            });

        return res.send({ success: true, token: token });
    }

    return res.send('failed');

}




const register = async (req, res) => {

    const user = await UserSchema.findOne({ Email: req.body.Email });

    if (user) return res.send('User Already Exists');

    return res.send('test');

}


module.exports = { register, login }