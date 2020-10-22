const express = require('express')
const cors = require('cors')
const { v4: uuid, validate: isUuid } = require('uuid')


const app = express()

app.use(cors())
app.use(express.json())

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.time(logLabel);

  const { query, body, params} = request

  const log = {
    query, 
    body,
    params
  }

  next() // Próximo middleware

  console.timeEnd(logLabel);
  console.log(log);
}

function validadeProjectId (request, response, next) {
  const { id } = request.params

  if (!isUuid(id)) {
    // aqui interrompe
    return response.status(400).json({ message: 'Invalid project ID'})
  }
  
  return next()
}

app.use(logRequests)
app.use('/projects/:id', validadeProjectId)

app.get('/', (request, response) => {
  return response.json({message: 'Hello GoStack'})
})

app.get('/projects', /*logRequests,*/ (request, response) => {
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
