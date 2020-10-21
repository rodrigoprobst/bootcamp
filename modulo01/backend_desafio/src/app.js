const express = require("express")
const cors = require("cors")

const { v4: uuid, validate: isUuid } = require("uuid")

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

function validadeRepositoryId (request, response, next) {
  const { id } = request.params

  if (!isUuid(id)) {
    // aqui interrompe
    return response.status(400).json({ message: 'Invalid repository ID'})
  }
  
  return next()
}

app.use('/repositories/:id', validadeRepositoryId)

app.get("/repositories", (request, response) => {
  return response.json(repositories)
})

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = { id: uuid(), title, url, techs, likes:0 }

  repositories.push(repository)
  
  return response.status(201).json(repository)
})

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ message: 'Repository not found!'})
  }

  const { likes } = repositories[repositoryIndex]

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = repository

  return response.status(200).json(repository)
})

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ message: 'repository not found'})
  }

  repositories.splice(repositoryIndex, 1)
  
  return response.status(204).send()
})

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ message: 'Repository not found!'})
  }

  const { title, url, techs, likes } = repositories[repositoryIndex]

  const repository = {
    id,
    title,
    url,
    techs,
    likes: likes + 1
  }

  repositories[repositoryIndex] = repository

  return response.status(200).json(repository)
})

module.exports = app
