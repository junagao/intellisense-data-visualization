const express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require('cors')
const router = require('./router')

app.use(cors()).use(router)

app.listen(port, () => console.log(`Server running on port ${port}!`))
