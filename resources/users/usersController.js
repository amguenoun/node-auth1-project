const db = require('../../data/dbConfig')

exports.registerUser = (req, res) => {
    const user = req.body

    db('users')
        .insert(user)
        .then(id => {
            res.status(201).json({ id: id[0] })
        })
        .catch(err => {
            res.status(500).json({ message: "Couldn't access database" })
        });
}

exports.getAllUsers = (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users)
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
                if (user[0].password === credentials.password) {
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