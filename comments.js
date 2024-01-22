// Create web server

// Import modules
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// Import custom modules
const db = require('./modules/db')

// Use modules
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// Set port
const port = process.env.PORT || 3000

// Set router
const router = express.Router()

// Middleware
router.use((req, res, next) => {
  console.log('Something is happening.')
  next()
})

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our api!' })
})

// Routes
router.route('/comments')
  .get((req, res) => {
    db.getAllComments((err, comments) => {
      if (err) res.send(err)
      res.json(comments)
    })
  })
  .post((req, res) => {
    db.addComment(req.body, (err, comment) => {
      if (err) res.send(err)
      res.json(comment)
    })
  })

router.route('/comments/:comment_id')
  .get((req, res) => {
    db.getCommentById(req.params.comment_id, (err, comment) => {
      if (err) res.send(err)
      res.json(comment)
    })
  })
  .put((req, res) => {
    db.updateComment(req.params.comment_id, req.body, (err, comment) => {
      if (err) res.send(err)
      res.json(comment)
    })
  })
  .delete((req, res) => {
    db.deleteComment(req.params.comment_id, (err, comment) => {
      if (err) res.send(err)
      res.json(comment)
    })
  })

// Register routes
app.use('/api', router)

// Start server
app.listen(port)
console.log(`Server running on port ${port}`)

