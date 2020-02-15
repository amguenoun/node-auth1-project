const db = require('../../data/dbConfig')

const bcrypt = require('bcryptjs');


exports.registerUser = (req, res) => {
    const user = req.body

    const hash = bcrypt.hashSync(user.password, 12);

    user.password = hash;

    db('users')
        .insert(user)
        .then(id => {
            req.session.user = user
            res.status(201).json({ id: id[0] })
        })
        .catch(err => {
            res.status(500).json({ message: "Couldn't access database" })
        });
}

exports.getAllUsers = (req, res) => {
    db('users')
        .then(users => {
            if (req.session.user) {
                res.status(200).json(users)
            }
            else {
                res.status(401).json({ message: "You need to be logged in" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Couldn't access database" })
        });
}

exports.loginUser = (req, res) => {
    const credentials = req.body
    db('users')
        .where('username', credentials.username)
        .then(user => {
            if (user.length == 0) {
                res.status(400).json({ message: "Invalid username" })
            }
            else {
                if (bcrypt.compareSync(credentials.password, user[0].password)) {
                    req.session.user = user[0]
                    res.status(200).json({ message: "Valid username and password" })
                }
                else {
                    res.status(400).json({ message: "Invalid password" })
                }
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Couldn't access database" })
        });
}

exports.logoutUser = (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.status(200).json({ message: 'Logout Successful' });
    }
}