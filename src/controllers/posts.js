const Post = require('../models/post.js')

const getPosts = function(req, res) {
  Post.find({}).then(function(posts) {
    res.send(posts)
  }).catch(function(error){
    res.status(500).send({ error })
  })
}

const getPost = function(req, res) {
  _id = req.params.id
  Post.findById(_id).then(function(post) {
    if ( !post ) {
      return res.send({ error : 'Post not found' })
    }
    return res.send(post)
  }).catch(function(error) {
    return res.status(404).send({ error })
  })
}

const createPost = function(req, res) {
  const post = new Post({
    question: req.body.question,
    answer: req.body.answer,
    createdBy: req.user._id
  })
  post.save().then(function() {
    return res.send(post)
  }).catch(function(error) {
    return res.status(400).send({ error })
  })
}

const updatePost = function(req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['question']
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  Post.findByIdAndUpdate(_id, req.body ).then(function(post) {
    if (!post) {
      return res.status(404).send({})
    }
    return res.send(post)
  }).catch(function(error) {
    res.status(500).send({ error })
  })
}

const deletePost = function(req, res) {
  const _id = req.params.id
  Post.findByIdAndDelete(_id).then(function(post){
    if(!post) {
      return res.status(404).send({})
    }
    return res.send(post)
  }).catch(function(error) {
    res.status(505).send({ error })
  })
}

module.exports = { 
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}