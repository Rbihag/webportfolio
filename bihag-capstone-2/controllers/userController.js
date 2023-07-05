const User = require("../models/User");

const bcrypt = require("bcrypt");

const auth = require("../auth");

// User registration
module.exports.registerUser = (reqBody) => {
    let newUser = new User({
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        email: reqBody.email,
        mobileNo: reqBody.mobileNo,
        password: bcrypt.hashSync(reqBody.password, 10)
    });
    return newUser.save().then((user, error) => {
        if (error) {
            return "J.A.R.V.I.S : User registration failed!"; //false
        } else {
            return "J.A.R.V.I.S : User registration success!";
        };
    });
};

// Check if email already exists
module.exports.checkEmailExists = (reqBody) => {
    return User.find({ email: reqBody.email }).then(result => {
        if (result.length > 0) {
            return "J.A.R.V.I.S : Email already exists!"; //false
        } else {
            return "J.A.R.V.I.S : Email is available!"; //true
        };
    });
};

// User authentication
module.exports.loginUser = (reqBody) => {
    return User.findOne({ email: reqBody.email }).then(result => {
        if (result == null) {
            return "J.A.R.V.I.S says: User not found, please register first";
        } else {
            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
            if (isPasswordCorrect) {
                return { access: auth.createAccessToken(result) }
            } else {
                return "J.A.R.V.I.S says: Email/Password is incorrect!";
            };
        };
    });
};

// Retrieve user details
module.exports.getProfile = (data) => {
    return User.findById(data.userId).then(result => {
        result.password = "";
        return result;
    });
};