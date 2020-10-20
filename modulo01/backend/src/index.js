const express = require('express')

const app = express()

app.get('/', (request, response) => {
  return response.json({message: 'Hello GoStack'})
})

app.listen(3000, () => {
  console.log('🚀 Backend started at http://localhost:3000 ');
})
