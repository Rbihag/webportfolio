const jwt = require("jsonwebtoken");

const secret = "ProductsAPI";

// Token creation
module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };
    return jwt.sign(data, secret, {});
};

// Token verification
module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if (typeof token !== "undefined") {
        token = token.slice(7, token.length);
        return jwt.verify(token, secret, (err, data) => {
            if (err) {
                return res.send({ Warning: "Access Denied" });
            } else {
                next();
            }
        })
        // Token does not exist
    } else {
        return res.send({ Warning: "Access Denied" });
    };
};

// Token decryption
module.exports.decode = (token) => {
    if (typeof token !== "undefined") {
        token = token.slice(10, token.length);
        return jwt.verify(token, secret, (err, data) => {
            if (err) {
                return null;
            } else {
                return jwt.decode(token, { complete: true }).payload;
            }
        })
        // Token does not exist
    } else {
        return null;
    };
};


