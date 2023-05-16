const User = require('../schemas/user_schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uuid } = require('uuidv4');

    //Register User
    const saveUser = async (req, res) => {
        const { username,email,name,password,role } = req.body;
        if (!username || !email || !password || !name) {
            return res.status(422).json({ error: 'Please Fill all the required fields' })
        }
        User.findOne({ email: email }).then(registeredUser => {
            if (registeredUser) {
                return res.status(422).json({ error: 'This User already exist!' })
            }

            //encrypt the password
            bcrypt.hash(password, 12).then(HashedPassword => {
                const user = new User({
                    userid: uuid(),
                    username: username,
                    email: email,
                    name: name,
                    password: HashedPassword,
                    role : 'User'
                });

                user.save().then(user => {
                    res.json({ message: 'User Registered Sucessfully!' })
                }).catch(err => {
                    console.log(err)
                });
            }).catch(err => {
                console.log(err)
            });
        })
    }

    const loginUser = async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(422).json({ error: 'Please Fill the given Fileds!' })
        }
        User.findOne({ username: username }).then(registeredUser => {
            if (!registeredUser) {
                return res.status(422).json({ error: 'Invalid User Name' })
            }
            bcrypt.compare(password, registeredUser.password).then(matchPassword => {
                //Compare Password with encrypted Password
                if (matchPassword) {
                    const token = jwt.sign({ _id: registeredUser._id }, process.env.JWT_SECRET_KEY)
                    const { _id, userid, username, email, name, role } = registeredUser;
                    res.json({ token: token, user: { _id, userid, username, email, name, role } })
                } else {
                    return res.status(400).json({ error: "Invalid E-mail or Password" })
                }
            }).catch(err => {
                console.log(err)
            });
        })
    }


    exports.saveUser =  saveUser;
    exports.loginUser = loginUser;