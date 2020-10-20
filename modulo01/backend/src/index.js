const express = require('express')

const app = express()

app.use(express.json())

/**
 * Métodos HTTP:
 * 
 * GET:  Buscar informações do backenb
 * POST: criar uma informação no backend
 * PUT/PATCH: atualizar alguma informação no backend
 * DELETE: deletar alguma informação no backend
 */

 /**
  * Tipos de Parâmetros:
  * 
  * Query Params: Filtros e paginação
  * Route Params: Identificar recursos na hora de (atualizar/deletar) 
  * Request body: Conteúdo na hora de criar ou editar um recurso (JSON)
  */

app.get('/', (request, response) => {
  return response.json({message: 'Hello GoStack'})
})

app.get('/projects', (request, response) => {
  const { title, owner } = request.query

  console.log(title, owner);

  return response.json([
    "Projeto 01",
    "Projeto 02",
  ])
})

app.post('/projects', (request, response) => {
  const { title, owner } = request.body

  console.log(title, owner);
  
  return response.status(201).json([
    "Projeto 01",
    "Projeto 02",
    "Projeto 03",
  ])
})

app.put('/projects/:id', (request, response) => {
  const { id } = request.params

  console.log(id);

  return response.status(200).json([
    "Projeto 04",
    "Projeto 02",
    "Projeto 03",
  ])
})

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params

  console.log(id);

  return response.status(200).json([
    "Projeto 02",
    "Projeto 03",
  ])
})

app.listen(3000, () => {
  console.log('🚀 Backend started at http://localhost:3000 ');
})
