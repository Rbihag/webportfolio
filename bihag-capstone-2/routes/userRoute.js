const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const auth = require("../auth");


// Route for user registration
router.post("/register", (req, res) => {
    userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Routes for checking if the user's email already exist in the database
router.post("/checkEmail", (req, res) => {
    userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for user authentication (login)
router.post("/login", (req, res) => {
    userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Admin use route for retrieving user details
router.get("/details", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization)
    userController.getProfile({ userId: userData.id }).then(resultFromController => res.send(resultFromController));
});




module.exports = router;