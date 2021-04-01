
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { jwtSecret } = require('../../config')
const jwt = require('jsonwebtoken');
const { getUser, getAllUsers, deleteUser, createUser } = require('../data/managers/userModelManager')



/*  users signup. */
exports.signup = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    if (!users.length) {
      req.body.role = 'ADMIN'
      const result = await createUser(getUserData(req, hash))
      res.status(201).json({
        message: 'Registered successfully.',
        user: result,
      });
    } else {
      const query = { email: req.body.email }
      const result = await getUser(query)
      if (result) {
        res.status(403).json({ message: 'Already exist.' })
      } else {
        const result = createUser(getUserData(req, hash))
        res.status(201).json({
          message: 'Registered successfully.',
          user: result,
        })
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }

}


/*  users login. */
exports.login = async (req, res, next) => {
  const query = { email: req.body.email }
  getUser(query)
    .then(async (result) => {
      const match = await bcrypt.compare(req.body.password, result.password);
      if (match) {
        const token = jwt.sign({ email: result.email, userID: result._id, type: result.role }, jwtSecret,
          {
            expiresIn: "1d"
          });
        result['loginStatus'] = 'Success';
        res.status(200).json({ user: result, token: token, loginStatus: 'Success' });
      } else {
        res.status(401).json({ message: 'Please enter valid credentials.' })
      }
    })
    .catch(err => {
      res.status(404).json(err);
    });
}



const getUserData = (req, hash,) => {
  const user = {
    email: req.body.email,
    name: req.body.name,
    password: hash,
    role: req.body.role || 'USER'
  };
  return user;
}


