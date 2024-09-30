const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new mongoose.Schema(
    {
        user_id: String,
        password: String
    }
)

const Register = mongoose.model('register',registerSchema);

module.exports = Register;