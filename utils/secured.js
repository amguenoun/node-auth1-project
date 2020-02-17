const secured = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.status(400).json({ message: "You need to be logged in." })
    }
}

module.exports = secured