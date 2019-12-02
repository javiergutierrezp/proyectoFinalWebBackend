const User = require('../models/user')

const getUser = function(req, res) {
  User.findById( req.user._id ).populate('todos').exec(function(error, user) {
    return res.send(user)
  })
  // }).catch(function(error) {
  //   return res.status(500).send(error)
}

const createUser = function(req, res){
  const user = new User(req.body)
  user.save().then(function() {
    return res.send(user)
  }).catch(function(error) {
    return res.status(400).send(error)
  })
}

const login = function(req, res) {
  console.log(req.body)
  User.findByCredentials(req.body.email, req.body.password).then(function(user){
    user.generateToken().then(function(token){
      return res.send({user, token})
    }).catch(function(error){
      return res.status(401).send({ error: error })
    })
  }).catch(function(error) {
    return res.status(401).send({ error: error })
  })
}

const logout = function(req, res) {
  req.user.tokens = req.user.tokens.filter(function(token) {
    return token.token !== req.token
  })
  req.user.save().then(function() {
    return res.send()
  }).catch(function(error) {
    return res.status(500).send({ error: error } )
  })
}

module.exports = {
  getUser: getUser,
  login: login,
  logout: logout,
  createUser : createUser
}