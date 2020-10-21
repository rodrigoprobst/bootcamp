const express = require('express')
const { v4: uuid } = require('uuid')

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

const projects = [];

app.get('/', (request, response) => {
  return response.json({message: 'Hello GoStack'})
})

app.get('/projects', (request, response) => {
  const { title } = request.query

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects

  return response.json(results)
})

app.post('/projects', (request, response) => {
  const { title, owner } = request.body

  const project = { id: uuid(), title, owner }

  projects.push(project)
  
  return response.status(201).json(project)
})

app.put('/projects/:id', (request, response) => {
  const { id } = request.params
  const { title, owner } = request.body

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({ message: 'project not found'})
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project

  return response.status(200).json(project)
})

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({ message: 'project not found'})
  }

  projects.splice(projectIndex, 1)
  
  return response.status(204).send()
})

app.listen(3000, () => {
  console.log('🚀 Backend started at http://localhost:3000 ');
})
