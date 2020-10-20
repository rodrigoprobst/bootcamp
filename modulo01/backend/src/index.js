const express = require('express')

const app = express()

/**
 * Métodos HTTP:
 * 
 * GET:  Buscar informações do backenb
 * POST: criar uma informação no backend
 * PUT/PATCH: atualizar alguma informação no backend
 * DELETE: deletar alguma informação no backend
 */

app.get('/', (request, response) => {
  return response.json({message: 'Hello GoStack'})
})

app.get('/projects', (request, response) => {
  return response.json([
    "Projeto 01",
    "Projeto 02",
  ])
})

app.post('/projects', (request, response) => {
  return response.status(201).json([
    "Projeto 01",
    "Projeto 02",
    "Projeto 03",
  ])
})

app.put('/projects/:id', (request, response) => {
  return response.status(200).json([
    "Projeto 04",
    "Projeto 02",
    "Projeto 03",
  ])
})

app.delete('/projects/:id', (request, response) => {
  return response.status(200).json([
    "Projeto 02",
    "Projeto 03",
  ])
})

app.listen(3000, () => {
  console.log('🚀 Backend started at http://localhost:3000 ');
})
